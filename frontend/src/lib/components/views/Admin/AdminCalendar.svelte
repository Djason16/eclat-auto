<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { toDateKey } from '#lib/utils/format.js'
    import { daySlots, monthGrid, takenSlots } from '#lib/utils/slots.js'
    import SlotsModal from './SlotsModal.svelte'

    /*
     * "Calendrier de disponibilité" of the original: "Précédent" / month / "Suivant", the grid of the month (white =
     * available, orange = limited, red = full or closed, gold = today, grey = closed day of the week or past), the
     * legend, and a click on a day opens its slots in a window.
     */
    const today = new Date()
    let year = $state(today.getFullYear())
    let month = $state(today.getMonth())
    let selected = $state('')

    const todayKey = toDateKey(today)
    const days = $derived(monthGrid(year, month))
    const title = $derived(new Date(year, month, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }))

    const move = (step: number) => {
        const next = new Date(year, month + step, 1)
        year = next.getFullYear()
        month = next.getMonth()
    }

    const statusOf = (dateKey: string): string => {
        if (dateKey < todayKey) return 'past'
        const all = daySlots({ ...demo.availability, closedDates: [] }, dateKey)
        if (!all.length) return 'off'
        if (demo.availability.closedDates.includes(dateKey)) return 'unavailable'
        const taken = takenSlots(demo.availability, demo.bookings, dateKey)
        if (taken.size >= all.length) return 'unavailable'
        return taken.size ? 'limited' : 'available'
    }

    const LABELS: Record<string, string> = {
        available: 'disponible', limited: 'disponibilité limitée', unavailable: 'indisponible', off: 'jour fermé', past: 'passé',
    }

    const LEGEND = [
        { tone: 'today', label: 'Aujourd’hui' },
        { tone: 'available', label: 'Disponible' },
        { tone: 'limited', label: 'Disponibilité limitée' },
        { tone: 'unavailable', label: 'Indisponible' },
        { tone: 'off', label: 'Fermé ou passé' },
    ]
</script>

<h2 class="admin-title">Calendrier de disponibilité</h2>
<p class="admin-intro">
    Choisissez une date dans le calendrier : vous pourrez ouvrir ou fermer ses créneaux horaires, ou marquer la journée
    comme indisponible.
</p>

<div class="calendar">
    <div class="calendar-header">
        <BaseButton variant="primary" size="small" onclick={() => move(-1)}>Précédent</BaseButton>
        <span class="calendar-month" aria-live="polite">{title}</span>
        <BaseButton size="small" onclick={() => move(1)}>Suivant</BaseButton>
    </div>
    <div class="calendar-body" role="group" aria-label="Jours de {title}">
        {#each ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as day (day)}
            <span class="calendar-day-header" aria-hidden="true">{day}</span>
        {/each}
        {#each days as day, index (day ?? `empty-${index}`)}
            {#if day}
                {@const status = statusOf(day)}
                <button type="button" class="calendar-day day-{status}" class:today={day === todayKey}
                    disabled={status === 'past' || status === 'off'} onclick={() => (selected = day)}
                    aria-label="{new Date(`${day}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} : {LABELS[status]}">
                    {Number(day.slice(-2))}
                </button>
            {:else}
                <span aria-hidden="true"></span>
            {/if}
        {/each}
    </div>
    <ul class="calendar-legend" role="list">
        {#each LEGEND as item (item.tone)}
            <li><span class="legend-color day-{item.tone}" class:today={item.tone === 'today'}></span> {item.label}</li>
        {/each}
    </ul>
</div>

<SlotsModal date={selected} onclose={() => (selected = '')} />

<style>
    .calendar {
        text-align: center;
    }

    .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-small);
        margin-block: var(--space-large);
    }

    .calendar-month {
        font-size: var(--font-small);
        text-transform: capitalize;
    }

    .calendar-body {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: var(--space-xs);
        padding: var(--space-small);
        border: 1px solid rgb(0 0 0 / 25%);
    }

    .calendar-day-header {
        padding: var(--space-xs) 0;
        background-color: var(--grey);
        color: var(--text-light);
        font-weight: 700;
    }

    .calendar-day {
        display: grid;
        place-items: center;
        height: 50px;
        border: 1px solid rgb(0 0 0 / 25%);
        font-size: var(--font-normal);
        font-style: normal;
        cursor: pointer;
    }

    /* Colors of the original, a little deeper so their numbers keep the contrast rules */
    .day-available { background-color: var(--white); color: var(--black); }
    .day-limited { background-color: var(--warning); color: var(--white); }
    .day-unavailable { background-color: var(--danger); color: var(--white); }
    .day-off,
    .day-past { background-color: var(--grey); color: var(--text-light); cursor: default; }
    .today { background-color: var(--gold); color: var(--black); font-weight: 700; }

    .calendar-legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--space-small) var(--space-normal);
        margin-top: var(--space-large);
    }

    .calendar-legend li {
        display: flex;
        align-items: center;
        gap: var(--space-small);
    }

    .legend-color {
        width: 20px;
        height: 20px;
        border: 1px solid rgb(0 0 0 / 25%);
    }

    @media (max-width: 768px) {
        .calendar-legend {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    @media (max-width: 480px) {
        .calendar-body {
            padding: var(--space-xs);
        }

        .calendar-day {
            height: 34px;
            font-size: var(--font-small);
        }

        .calendar-day-header {
            font-size: var(--font-smaller);
        }
    }
</style>
