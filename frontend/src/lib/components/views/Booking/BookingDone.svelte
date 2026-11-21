<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import StatusBadge from '#lib/components/ui/StatusBadge/StatusBadge.svelte'
    import { BUSINESS, fullAddress } from '#lib/content/business.js'
    import { openAuth } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Booking } from '#lib/types.js'
    import { formatDate, formatDuration, formatHour, formatPrice } from '#lib/utils/format.js'
    import { bookingIcsHref } from '#lib/utils/ics.js'
    import { endOfSlot } from '#lib/utils/slots.js'

    /*
     * Confirmation once the booking is saved: the big check, the recap in a black ticket, the calendar file (.ics), the
     * next steps, and the preview of the confirmation e-mail a real site would send (nothing is sent here).
     */
    let { booking, onrestart }: { booking: Booking, onrestart: () => void } = $props()

    const hours = $derived(`${formatHour(booking.slot)} à ${formatHour(endOfSlot(booking.slot, booking.slots))}`)
</script>

<div class="done" tabindex="-1">
    <header class="done-head">
        <span class="done-icon"><Icon name="check" /></span>
        <p class="kicker">Réservation confirmée</p>
        <h2>Merci {booking.customer.firstName}, c’est réservé !</h2>
        <p class="row gap-s">Référence <strong class="done-reference">{booking.reference}</strong> <StatusBadge status={booking.status} /></p>
    </header>

    <div class="done-grid">
        <section class="done-ticket surface-dark" aria-label="Votre rendez-vous">
            <p class="done-date"><Icon name="calendar" /> {formatDate(booking.date)}</p>
            <p class="done-hours">{hours}</p>
            <dl>
                <div><dt>Prestation</dt><dd>{booking.serviceName}</dd></div>
                <div><dt>Options</dt><dd>{booking.extraNames.length ? booking.extraNames.join(', ') : 'Aucune'}</dd></div>
                <div><dt>Véhicule</dt><dd>{booking.vehicleModel} · {booking.vehicleName}</dd></div>
                <div><dt>Durée</dt><dd>{formatDuration(booking.duration)}</dd></div>
                <div><dt>Adresse</dt><dd>{fullAddress}</dd></div>
            </dl>
            <p class="done-total"><span>{booking.paid ? 'Payé en ligne (simulé)' : 'À régler sur place'}</span> <strong>{formatPrice(booking.total)}</strong></p>
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- calendar file built in the browser, not a page -->
            <a class="btn btn-secondary btn-full" href={bookingIcsHref(booking)} download="eclat-auto-{booking.reference}.ics"
                title="Télécharger le rendez-vous pour votre agenda (fichier .ics)">
                <Icon name="download" /> Ajouter à mon agenda
            </a>
        </section>

        <section class="done-mail" aria-label="Aperçu de l’e-mail de confirmation">
            <p class="done-mail-note"><Icon name="mail" /> Aperçu de l’e-mail de confirmation (démonstration : rien n’est envoyé)</p>
            <div class="done-mail-box">
                <p class="done-mail-meta"><strong>De :</strong> {BUSINESS.name} &lt;{BUSINESS.email}&gt;</p>
                <p class="done-mail-meta"><strong>À :</strong> {booking.customer.email}</p>
                <p class="done-mail-meta"><strong>Objet :</strong> Votre rendez-vous du {formatDate(booking.date, false)} est confirmé</p>
                <div class="done-mail-body">
                    <p>Bonjour {booking.customer.firstName},</p>
                    <p>
                        Nous vous attendons le <strong>{formatDate(booking.date)}</strong> de {hours} pour la prestation
                        <strong>{booking.serviceName}</strong> sur votre {booking.vehicleModel}.
                    </p>
                    <p>Pensez à vider l’habitacle de vos objets personnels. Annulation gratuite jusqu’à 24 heures avant.</p>
                    <p>À très vite,<br />L’équipe {BUSINESS.name}</p>
                </div>
            </div>
        </section>
    </div>

    <div class="form-actions">
        {#if demo.user}
            <BaseButton href={resolve('mon-espace/')} title="Voir mes réservations" icon="user">Voir mes réservations</BaseButton>
        {:else}
            <BaseButton icon="user" onclick={() => openAuth('register')}>Créer mon compte</BaseButton>
        {/if}
        <BaseButton variant="primary" icon="calendar" onclick={onrestart}>Prendre un autre rendez-vous</BaseButton>
    </div>
</div>

<style>
    .done {
        display: grid;
        gap: var(--space-large);
    }

    .done:focus {
        outline: none;
    }

    .done-head {
        display: grid;
        gap: var(--space-small);
        justify-items: start;
    }

    .done-icon {
        display: grid;
        place-items: center;
        width: 4rem;
        height: 4rem;
        background-color: var(--black);
        color: var(--gold);
        font-size: var(--font-xxlarge);
        animation: done-pop var(--duration-reveal) var(--ease);
    }

    h2 {
        font-size: var(--font-display);
        font-style: italic;
        text-transform: uppercase;
    }

    .done-reference {
        color: var(--gold-dark);
    }

    .done-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
        align-items: start;
        gap: var(--space-large);
    }

    /* The black ticket of the appointment */
    .done-ticket {
        display: grid;
        gap: var(--space-normal);
        padding: var(--space-large);
        border-top: 3px solid var(--gold);
        background: var(--gold-glow), var(--black);
    }

    .done-date {
        display: flex;
        align-items: center;
        gap: var(--space-small);
        color: var(--gold);
        font-weight: 700;
        text-transform: capitalize;
    }

    .done-hours {
        color: var(--text-light);
        font-size: var(--font-xxlarge);
        font-style: italic;
        font-weight: 700;
    }

    dl {
        display: grid;
        gap: var(--space-small);
    }

    dl div {
        display: grid;
        grid-template-columns: 6rem 1fr;
        gap: var(--space-small);
        font-size: var(--font-small);
    }

    dt {
        color: var(--grey-light);
    }

    dd {
        color: var(--text-light);
        font-weight: 700;
    }

    .done-total {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-small);
        padding-top: var(--space-normal);
        border-top: 1px solid rgb(255 255 255 / 15%);
        color: var(--grey-light);
        font-size: var(--font-small);
    }

    .done-total strong {
        color: var(--gold);
        font-size: var(--font-xlarge);
        font-style: italic;
    }

    /* The e-mail preview, like a mail client */
    .done-mail {
        display: grid;
        gap: var(--space-small);
    }

    .done-mail-note {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--grey);
        font-size: var(--font-small);
    }

    .done-mail-box {
        border: 1px solid var(--border-color);
        background-color: var(--white);
        box-shadow: var(--shadow);
    }

    .done-mail-meta {
        padding: var(--space-small) var(--space-normal);
        border-bottom: 1px solid var(--border-color);
        font-size: var(--font-small);
        overflow-wrap: anywhere;
    }

    .done-mail-body {
        display: grid;
        gap: var(--space-normal);
        padding: var(--space-large) var(--space-normal);
        border-top: 3px solid var(--gold);
    }

    @keyframes done-pop {
        from { opacity: 0; transform: scale(0.6); }
        to { opacity: 1; transform: none; }
    }

    @media (max-width: 900px) {
        .done-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 360px) {
        dl div {
            grid-template-columns: 1fr;
            gap: 0;
        }
    }
</style>
