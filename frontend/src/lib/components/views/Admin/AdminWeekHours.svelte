<script lang="ts">
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import Switch from '#lib/components/ui/Switch/Switch.svelte'
    import { updateWeekDay } from '#lib/stores/actions/adminActions.js'
    import { notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'

    /*
     * Opening hours of each day of the week (Monday first): they make the booking slots. One row per day, like a table on
     * a large screen (day, open / closed switch, opening, closing), stacked on a phone. A closed day shows "Fermé" only.
     */
    const DAYS = [1, 2, 3, 4, 5, 6, 0]
    const NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

    // A local copy per day, saved when it changes and is valid
    let rows = $state(demo.availability.week.map((day) => ({ ...day })))

    // Run after the bound value is updated (the change listeners of the field)
    const save = (day: number) => queueMicrotask(() => saveNow(day))

    const saveNow = (day: number) => {
        const row = rows[day]
        if (!row) return
        if (row.open && row.start >= row.end) {
            notify(`${NAMES[day]} : l’heure de fin doit être après l’heure d’ouverture`, 'error')
            return
        }
        updateWeekDay(day, { ...row })
        notify(`Horaires du ${NAMES[day]?.toLowerCase()} enregistrés`)
    }

    const toggle = (day: number, open: boolean) => {
        const row = rows[day]
        if (!row) return
        row.open = open
        save(day)
    }
</script>

<section class="premium-card week-card" aria-labelledby="week-title">
    <header class="week-head">
        <h2 id="week-title" class="admin-title">Horaires de la semaine</h2>
        <p class="text-small text-muted">Les créneaux d’une heure sont créés entre l’ouverture et la fermeture.</p>
    </header>
    <div class="week-columns" aria-hidden="true">
        <span>Jour</span><span>État</span><span>Ouverture</span><span>Fermeture</span>
    </div>
    <ul class="week" role="list">
        {#each DAYS as day (day)}
            {@const row = rows[day]}
            {#if row}
                <li class="day" class:closed={!row.open}>
                    <p class="day-name">{NAMES[day]}</p>
                    <Switch checked={row.open} label={NAMES[day] ?? ''} on="Ouvert" off="Fermé" onchange={(value: boolean) => toggle(day, value)} />
                    {#if row.open}
                        <FormField label="Ouverture" name="start-{day}" type="time" bind:value={row.start} placeholder="08:30" step="1800" onchange={() => save(day)} />
                        <FormField label="Fermeture" name="end-{day}" type="time" bind:value={row.end} placeholder="19:00" step="1800" onchange={() => save(day)} />
                    {:else}
                        <p class="day-closed">Pas de créneau ce jour-là</p>
                    {/if}
                </li>
            {/if}
        {/each}
    </ul>
</section>

<style>
    .week-card {
        gap: var(--space-normal);
    }

    .week-head {
        display: grid;
        gap: var(--space-xs);
    }

    /* Four aligned columns, like a table; the field labels are shown on a phone only (the column heads say them) */
    .week-columns,
    .day {
        display: grid;
        grid-template-columns: minmax(0, 8rem) minmax(0, 10rem) repeat(2, minmax(0, 1fr));
        align-items: center;
        gap: var(--space-normal) var(--space-large);
    }

    .week-columns {
        padding-bottom: var(--space-small);
        border-bottom: 2px solid var(--black);
        color: var(--grey);
        font-size: var(--font-smaller);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .week {
        display: grid;
        list-style: none;
    }

    .day {
        padding-block: var(--space-normal);
        border-bottom: 1px solid var(--line);
    }

    .day-name {
        font-style: italic;
        font-weight: 700;
        text-transform: uppercase;
    }

    .closed .day-name {
        color: var(--grey);
    }

    .day :global(.field-label) {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
    }

    .day-closed {
        grid-column: span 2;
        color: var(--grey);
        font-size: var(--font-small);
        font-style: italic;
    }

    /* Phone: day and switch on a line, the two times under them with their labels */
    @media (max-width: 40rem) {
        .week-columns {
            display: none;
        }

        .day {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--space-small) var(--space-normal);
        }

        .day :global(.field-label) {
            position: static;
            width: auto;
            height: auto;
            clip: auto;
        }

        .day-closed {
            grid-column: 1 / -1;
        }
    }

    @media (max-width: 22rem) {
        .day {
            grid-template-columns: 1fr;
        }
    }
</style>
