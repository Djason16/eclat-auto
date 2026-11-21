<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import MonthCalendar from '#lib/components/ui/MonthCalendar/MonthCalendar.svelte'
    import { quote } from '#lib/stores/actions/bookingActions.js'
    import { draft } from '#lib/stores/bookingDraft.svelte.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { DayInfo } from '#lib/types.js'
    import { addDays, formatDate, formatDuration, formatHour } from '#lib/utils/format.js'
    import { BOOKING_WINDOW_DAYS, dayStatus, endOfSlot, freeStarts, type DayStatus } from '#lib/utils/slots.js'

    // Step 4: a day of the calendar, then a free start hour (enough free slots in a row for the whole job)
    const needed = $derived(quote(draft).slots)
    const duration = $derived(quote(draft).duration)
    const starts = $derived(draft.date ? freeStarts(demo.availability, demo.bookings, draft.date, needed) : [])
    // The free start hours, grouped like a real booking page: morning, then afternoon
    const groups = $derived([
        { label: 'Matin', icon: 'sparkle' as const, slots: starts.filter((slot) => slot < '12:00') },
        { label: 'Après-midi', icon: 'clock' as const, slots: starts.filter((slot) => slot >= '12:00') },
    ])

    const LABELS: Record<DayStatus, string> = {
        past: 'non réservable', closed: 'fermé', full: 'complet', limited: 'quelques créneaux', open: 'disponible',
    }

    const dayInfo = (dateKey: string): DayInfo => {
        const status = dayStatus(demo.availability, demo.bookings, dateKey, needed)
        return {
            tone: status,
            disabled: status === 'past' || status === 'closed' || status === 'full',
            label: `${formatDate(dateKey)} : ${LABELS[status]}`,
        }
    }

    const selectDay = (dateKey: string) => {
        draft.date = dateKey
        draft.slot = ''
    }

    const today = new Date()
</script>

<h3 class="step-title" tabindex="-1">Choisissez votre date et votre heure</h3>
<div class="schedule">
    <div class="stack gap-s">
        <h4>Date</h4>
        <p class="text-small">Durée estimée : {formatDuration(duration)} ({needed} créneau{needed > 1 ? 'x' : ''} d’une heure).</p>
        <MonthCalendar selected={draft.date} {dayInfo} onselect={selectDay} minMonth={today} maxMonth={addDays(today, BOOKING_WINDOW_DAYS)} />
        <ul class="legend text-smaller" aria-label="Légende du calendrier">
            <li><span class="dot dot-open"></span> Disponible</li>
            <li><span class="dot dot-limited"></span> Quelques créneaux</li>
            <li><span class="dot dot-full"></span> Complet ou fermé</li>
        </ul>
    </div>

    <div class="stack gap-s" aria-live="polite">
        <h4>Créneau horaire</h4>
        {#if !draft.date}
            <p class="empty-state text-small">Sélectionnez d’abord un jour dans le calendrier.</p>
        {:else if !starts.length}
            <p class="slot-error text-bold">Aucun créneau disponible pour cette date. Veuillez sélectionner une autre date.</p>
        {:else}
            <p class="text-small text-bold">{formatDate(draft.date)}</p>
            {#each groups as group (group.label)}
                {#if group.slots.length}
                    <p class="slot-group"><Icon name={group.icon} /> {group.label}</p>
                    <div class="slots" role="radiogroup" aria-label="{group.label} : heure d’arrivée">
                        {#each group.slots as slot (slot)}
                            <button type="button" class="slot" role="radio" aria-checked={draft.slot === slot} onclick={() => (draft.slot = slot)}>
                                {formatHour(slot)}&#32;<span class="slot-end">– {formatHour(endOfSlot(slot, needed))}</span>
                            </button>
                        {/each}
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
</div>

<style>
    .schedule {
        display: grid;
        gap: var(--space-large);
    }

    @media (min-width: 52rem) {
        .schedule {
            grid-template-columns: 1.2fr 1fr;
        }
    }

    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-small) var(--space-normal);
        list-style: none;
        color: var(--grey);
    }

    .legend li {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        font-size: var(--font-smaller);
    }

    .dot {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 3px;
        border: 1px solid var(--gold-dark);
    }

    .dot-limited { border-color: var(--warning); background-color: var(--warning-soft); }
    .dot-full { border-color: var(--line); background-color: var(--light); }

    .slot-group {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-top: var(--space-small);
        color: var(--grey);
        font-size: var(--font-small);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .slot-group :global(.icon) {
        color: var(--gold-dark);
    }

    /* Pills of the free hours */
    .slots {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-small);
    }

    .slot {
        min-height: 2.75rem;
        padding: var(--space-small) var(--space-normal);
        border: 1px solid var(--grey);
        border-radius: var(--radius-pill);
        background-color: var(--white);
        color: var(--black);
        font-size: var(--font-small);
        font-weight: 700;
        cursor: pointer;
        transition: background-color var(--transition), color var(--transition), border-color var(--transition), transform var(--transition);
    }

    .slot-end {
        color: var(--grey);
        font-weight: 400;
    }

    .slot[aria-checked="true"] {
        border-color: var(--black);
        background-color: var(--black);
        color: var(--white);
    }

    .slot-error {
        color: var(--danger);
    }

    .slot[aria-checked="true"] .slot-end {
        color: var(--gold-soft);
    }

    @media (hover: hover) and (pointer: fine) {
        .slot[aria-checked="false"]:hover {
            border-color: var(--gold-dark);
            background-color: var(--gold-soft);
            transform: translateY(-1px);
        }
    }
</style>
