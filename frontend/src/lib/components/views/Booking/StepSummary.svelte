<script lang="ts">
    import { resolve } from '$app/paths'
    import CheckField from '#lib/components/ui/CheckField/CheckField.svelte'
    import ChoiceCard from '#lib/components/ui/ChoiceCard/ChoiceCard.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { CATEGORIES } from '#lib/content/catalog.js'
    import { quote } from '#lib/stores/actions/bookingActions.js'
    import { draft } from '#lib/stores/bookingDraft.svelte.js'
    import { formatDate, formatDuration, formatHour, formatPrice } from '#lib/utils/format.js'
    import { endOfSlot } from '#lib/utils/slots.js'

    /*
     * Step 6 of the original: "Récapitulatif de votre réservation" line by line, then the payment.
     * Improved: the choice between paying online (simulated) and on site, and the terms to accept.
     */
    let { error = '', onedit }: { error?: string, onedit: (step: number) => void } = $props()

    const current = $derived(quote(draft))
    const quoteOnly = $derived(Boolean(current.service?.quoteOnly))
    const category = $derived(CATEGORIES.find((item) => item.id === draft.category)?.name ?? '')

    // A service on quote is always paid on site
    $effect(() => {
        if (quoteOnly) draft.payment = 'on-site'
    })
</script>

<h3 class="step-title" tabindex="-1">Vérifiez et confirmez</h3>
<div class="recap">
    <section class="recap-block">
        <h4><Icon name="sparkle" /> Prestation</h4>
        <p><strong>{current.service?.name}</strong> · {category}</p>
        <p>{quoteOnly ? 'Sur devis' : formatPrice(current.service?.price ?? 0)} · {formatDuration(current.service?.duration ?? 0)}</p>
        <p>{current.extras.length ? current.extras.map((extra) => `${extra.name} (+ ${formatPrice(extra.price)})`).join(', ') : 'Sans option'}</p>
        <button type="button" class="recap-edit" onclick={() => onedit(1)}>Modifier</button>
    </section>
    <section class="recap-block">
        <h4><Icon name="car" /> Véhicule</h4>
        <p><strong>{draft.vehicleModel}</strong></p>
        <p>{current.vehicle?.name} · {current.vehicle?.surcharge ? `+ ${formatPrice(current.vehicle.surcharge)}` : 'prix de base'}</p>
        <button type="button" class="recap-edit" onclick={() => onedit(1)}>Modifier</button>
    </section>
    <section class="recap-block">
        <h4><Icon name="user" /> Vos informations</h4>
        <p><strong>{draft.customer.firstName} {draft.customer.lastName}</strong></p>
        <p>{draft.customer.phone} · {draft.customer.email}</p>
        <button type="button" class="recap-edit" onclick={() => onedit(3)}>Modifier</button>
    </section>
    <section class="recap-block">
        <h4><Icon name="calendar" /> Rendez-vous</h4>
        <p><strong>{draft.date ? formatDate(draft.date) : ''}</strong></p>
        <p>{draft.slot ? `${formatHour(draft.slot)} à ${formatHour(endOfSlot(draft.slot, current.slots))}` : ''} ({formatDuration(current.duration)})</p>
        <button type="button" class="recap-edit" onclick={() => onedit(4)}>Modifier</button>
    </section>
</div>
<p class="recap-total"><span>Total TTC</span> <strong>{quoteOnly ? 'Sur devis' : formatPrice(current.total)}</strong></p>

<fieldset class="payment">
    <legend class="step-subtitle">Paiement</legend>
    <div class="payment-choices">
        <ChoiceCard name="payment" value="online" checked={draft.payment === 'online'} disabled={quoteOnly} onchange={() => (draft.payment = 'online')}>
            <strong>Payer en ligne maintenant</strong>
            <span class="text-small">Carte bancaire (simulée). Créneau confirmé tout de suite.</span>
        </ChoiceCard>
        <ChoiceCard name="payment" value="on-site" checked={draft.payment === 'on-site'} onchange={() => (draft.payment = 'on-site')}>
            <strong>Payer sur place</strong>
            <span class="text-small">{quoteOnly ? 'Prix fixé après le devis avec votre assurance.' : 'Carte ou espèces le jour J. Créneau confirmé par l’atelier.'}</span>
        </ChoiceCard>
    </div>
</fieldset>

<CheckField name="terms" bind:checked={draft.accepted} {error}>
    J’accepte les <a class="text-link" href={resolve('cgv/')} title="Lire les conditions générales de vente">conditions générales de vente</a>
    : annulation gratuite jusqu’à 24 heures avant le rendez-vous.
</CheckField>

<style>
    /* The four blocks of the booking, each one can be changed */
    .recap {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
        gap: var(--space-normal);
    }

    .recap-block {
        position: relative;
        display: grid;
        align-content: start;
        gap: var(--space-xs);
        padding: var(--space-normal) var(--space-large) var(--space-normal) var(--space-normal);
        border: 1px solid var(--border-color);
        border-left: 3px solid var(--gold);
        background-color: var(--white);
        font-size: var(--font-small);
    }

    h4 {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--grey);
        font-size: var(--font-small);
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    h4 :global(.icon) {
        color: var(--gold-dark);
    }

    .recap-block strong {
        font-size: var(--font-normal);
    }

    .recap-edit {
        position: absolute;
        top: var(--space-small);
        right: var(--space-small);
        min-height: 24px;
        border: none;
        background: none;
        color: var(--gold-dark);
        font-size: var(--font-small);
        font-style: italic;
        font-weight: 700;
        cursor: pointer;
    }

    .recap-total {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-normal);
        margin: var(--space-small) 0 var(--space-normal);
        padding: var(--space-normal) var(--space-large);
        background-color: var(--black);
        color: var(--grey-light);
    }

    .recap-total strong {
        color: var(--gold);
        font-size: var(--font-xxlarge);
        font-style: italic;
    }

    .payment {
        min-width: 0;
        margin-bottom: var(--space-normal);
        border: none;
    }

    .payment-choices {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
        gap: var(--space-small);
    }
</style>
