<script lang="ts">
    import { untrack } from 'svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import type { DayInfo } from '#lib/types.js'
    import { fromDateKey, toDateKey } from '#lib/utils/format.js'
    import { monthGrid } from '#lib/utils/slots.js'

    /*
     * Month calendar (booking and admin): a grid of day buttons, Monday first, with the month arrows.
     * dayInfo(dateKey) gives the state of each day: tone (open, limited, full, closed, past, selected...),
     * disabled and the label read by screen readers. A click on a day calls onselect.
     */
    let { selected = '', dayInfo, onselect, minMonth, maxMonth }: {
        selected?: string, dayInfo: (dateKey: string) => DayInfo, onselect: (dateKey: string) => void, minMonth?: Date, maxMonth?: Date
    } = $props()

    // The month shown first: the one of the selected day (later changes of "selected" do not move it)
    const start = untrack(() => (selected ? fromDateKey(selected) : new Date()))
    let year = $state(start.getFullYear())
    let month = $state(start.getMonth())

    const days = $derived(monthGrid(year, month))
    const title = $derived(new Date(year, month, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }))
    const today = toDateKey(new Date())
    const index = (y: number, m: number) => y * 12 + m
    const canPrev = $derived(!minMonth || index(year, month) > index(minMonth.getFullYear(), minMonth.getMonth()))
    const canNext = $derived(!maxMonth || index(year, month) < index(maxMonth.getFullYear(), maxMonth.getMonth()))

    const move = (step: number) => {
        const next = new Date(year, month + step, 1)
        year = next.getFullYear()
        month = next.getMonth()
    }
</script>

<div class="calendar">
    <div class="calendar-head">
        <button type="button" class="calendar-arrow" onclick={() => move(-1)} disabled={!canPrev} aria-label="Mois précédent" title="Mois précédent">
            <Icon name="arrowLeft" />
        </button>
        <p class="calendar-title text-large text-bold" aria-live="polite">{title}</p>
        <button type="button" class="calendar-arrow" onclick={() => move(1)} disabled={!canNext} aria-label="Mois suivant" title="Mois suivant">
            <Icon name="arrowRight" />
        </button>
    </div>
    <div class="calendar-grid" role="group" aria-label="Jours de {title}">
        {#each ['L', 'M', 'M', 'J', 'V', 'S', 'D'] as letter, position (position)}
            <span class="calendar-weekday text-smaller" aria-hidden="true">{letter}</span>
        {/each}
        {#each days as day, position (day ?? `empty-${position}`)}
            {#if day}
                {@const info = dayInfo(day)}
                <button type="button" class="calendar-day day-{info.tone}" class:selected={day === selected} class:today={day === today}
                    disabled={info.disabled} aria-pressed={day === selected} aria-label={info.label} onclick={() => onselect(day)}>
                    <span>{Number(day.slice(-2))}</span>
                    &#32;{#if info.note}<small class="calendar-note">{info.note}</small>{/if}
                </button>
            {:else}
                <span aria-hidden="true"></span>
            {/if}
        {/each}
    </div>
</div>

<style>
    .calendar {
        display: grid;
        gap: var(--space-normal);
        min-width: 0;
    }

    .calendar-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-small);
    }

    .calendar-title {
        color: var(--black);
        text-transform: capitalize;
    }

    .calendar-arrow {
        display: grid;
        place-items: center;
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        background-color: var(--white);
        cursor: pointer;
    }

    .calendar-arrow:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: var(--space-xs);
    }

    .calendar-weekday {
        color: var(--grey);
        font-weight: 700;
        text-align: center;
    }

    .calendar-day {
        display: grid;
        place-items: center;
        align-content: center;
        min-height: 2.6rem;
        padding: var(--space-xs) 0;
        border: 1px solid transparent;
        border-radius: var(--radius-small);
        background-color: var(--white);
        color: var(--black);
        font-size: var(--font-small);
        font-weight: 700;
        cursor: pointer;
        transition: background-color var(--transition), border-color var(--transition);
    }

    .calendar-note {
        color: inherit;
        font-size: var(--font-smaller);
        font-weight: 600;
        line-height: 1.1;
    }

    .day-open { border-color: var(--gold-dark); }
    .day-limited { border-color: var(--warning); background-color: var(--warning-soft); }
    .day-full, .day-closed { background-color: var(--light); color: var(--grey); text-decoration: line-through; }
    .day-past { background-color: transparent; color: var(--grey); }
    .day-busy { background-color: var(--gold-soft); }

    .calendar-day:disabled {
        cursor: not-allowed;
    }

    .today {
        box-shadow: inset 0 -3px 0 var(--gold);
    }

    .selected {
        border-color: var(--black);
        background-color: var(--black);
        color: var(--white);
        text-decoration: none;
    }

    @media (hover: hover) and (pointer: fine) {
        .calendar-day:not(:disabled, .selected):hover {
            border-color: var(--black);
        }
    }
</style>
