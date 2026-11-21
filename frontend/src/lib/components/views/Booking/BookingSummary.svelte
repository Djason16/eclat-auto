<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { CATEGORIES } from '#lib/content/catalog.js'
    import { quote } from '#lib/stores/actions/bookingActions.js'
    import { draft } from '#lib/stores/bookingDraft.svelte.js'
    import { formatDate, formatDuration, formatHour, formatPrice } from '#lib/utils/format.js'
    import { endOfSlot } from '#lib/utils/slots.js'

    /*
     * The booking so far and its total, updated at every choice. Large screen: a black panel that stays in view next to
     * the steps. Phone: a bar fixed at the bottom with the total, "Détails" unfolds the same lines (bottom sheet).
     */
    const current = $derived(quote(draft))
    const category = $derived(CATEGORIES.find((item) => item.id === draft.category)?.name ?? '')
    const totalLabel = $derived(!current.service ? '—' : current.service.quoteOnly ? 'Sur devis' : formatPrice(current.total))

    let open = $state(false)
</script>

<aside class="summary-panel surface-dark" class:open aria-label="Votre réservation">
    <button type="button" class="summary-toggle" aria-expanded={open} aria-controls="summary-lines" onclick={() => (open = !open)}>
        <span class="summary-toggle-label">Total</span>
        <span class="summary-toggle-total">{totalLabel}</span>
        <span class="summary-toggle-more">{open ? 'Masquer' : 'Détails'} <Icon name="chevronDown" /></span>
    </button>

    <div class="summary-body" id="summary-lines">
        <p class="kicker">Votre réservation</p>
        <dl class="summary-lines">
            <div>
                <dt><Icon name="sparkle" /> Prestation</dt>
                <dd>{current.service ? current.service.name : category || 'À choisir'}</dd>
            </div>
            <div>
                <dt><Icon name="car" /> Véhicule</dt>
                <dd>{current.vehicle?.name ?? ''}{draft.vehicleModel ? ` · ${draft.vehicleModel}` : ''}</dd>
            </div>
            <div>
                <dt><Icon name="plus" /> Options</dt>
                <dd>{current.extras.length ? current.extras.map((extra) => extra.name).join(', ') : 'Aucune'}</dd>
            </div>
            <div>
                <dt><Icon name="calendar" /> Rendez-vous</dt>
                <dd>
                    {#if draft.date && draft.slot}
                        {formatDate(draft.date)}, {formatHour(draft.slot)} à {formatHour(endOfSlot(draft.slot, current.slots))}
                    {:else}
                        À choisir
                    {/if}
                </dd>
            </div>
            {#if current.duration}
                <div>
                    <dt><Icon name="clock" /> Durée</dt>
                    <dd>{formatDuration(current.duration)}</dd>
                </div>
            {/if}
        </dl>
        <p class="summary-total" aria-live="polite">
            <span>Total TTC</span>
            <strong>{totalLabel}</strong>
        </p>
        <p class="summary-note"><Icon name="shield" /> Annulation gratuite jusqu’à 24 h avant.</p>
    </div>
</aside>

<style>
    .summary-panel {
        position: sticky;
        top: calc(var(--header-height) + var(--space-large));
        align-self: start;
        border-top: 3px solid var(--gold);
        background: var(--gold-glow), var(--black);
        box-shadow: var(--shadow-strong);
    }

    .summary-toggle {
        display: none;
    }

    .summary-body {
        display: grid;
        gap: var(--space-normal);
        padding: var(--space-large);
    }

    .summary-lines {
        display: grid;
        gap: var(--space-medium);
    }

    .summary-lines div {
        display: grid;
        gap: var(--space-xxs);
        padding-bottom: var(--space-small);
        border-bottom: 1px solid rgb(255 255 255 / 10%);
    }

    dt {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--grey-light);
        font-size: var(--font-small);
    }

    dt :global(.icon) {
        color: var(--gold);
    }

    dd {
        color: var(--text-light);
        font-weight: 700;
    }

    .summary-total {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-small);
        color: var(--grey-light);
    }

    .summary-total strong {
        color: var(--gold);
        font-size: var(--font-xxlarge);
        font-style: italic;
    }

    .summary-note {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--grey-light);
        font-size: var(--font-small);
    }

    /* Phone and tablet: a bar fixed at the bottom, the lines unfold above it */
    @media (max-width: 1023px) {
        .summary-panel {
            position: fixed;
            inset: auto 0 0;
            z-index: 80;
            max-height: 75dvh;
            overflow-y: auto;
            overscroll-behavior: contain;
        }

        .summary-toggle {
            display: flex;
            align-items: center;
            gap: var(--space-small);
            width: 100%;
            min-height: 3.75rem;
            padding: var(--space-small) var(--page-gutter);
            border: none;
            background: none;
            color: var(--text-light);
            cursor: pointer;
        }

        .summary-toggle-label {
            color: var(--grey-light);
            font-size: var(--font-small);
        }

        .summary-toggle-total {
            color: var(--gold);
            font-size: var(--font-xlarge);
            font-style: italic;
            font-weight: 700;
        }

        .summary-toggle-more {
            display: inline-flex;
            align-items: center;
            gap: var(--space-xs);
            margin-left: auto;
            font-size: var(--font-small);
            font-style: italic;
            font-weight: 700;
        }

        .open .summary-toggle-more :global(.icon) {
            transform: rotate(180deg);
        }

        .summary-body {
            display: none;
            padding-top: 0;
        }

        .open .summary-body {
            display: grid;
        }
    }

    @media (max-height: 420px) and (max-width: 1023px) {
        .summary-toggle {
            min-height: 3rem;
        }
    }
</style>
