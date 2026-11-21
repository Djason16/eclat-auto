<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import type { IconName } from '#lib/utils/icons.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * Row of key figures (account and admin dashboards): black tiles, the pictogram in gold, the figure in big
     * italic and its label; "hint" is a small line under it.
     *   <KpiCards label="Vos chiffres" items={[{ icon: 'calendar', value: '2', label: 'Rendez-vous à venir' }]} />
     */
    type Kpi = { icon: IconName, value: string, label: string, hint?: string }
    let { items, label }: { items: Kpi[], label: string } = $props()
</script>

<ul class="kpis aligned-cards" role="list" aria-label={label} style:--card-rows="4" style:--card-min="13rem">
    {#each items as item, index (item.label)}
        <li class="kpi aligned-card surface-dark reveal" use:reveal={index}>
            <span class="kpi-icon"><Icon name={item.icon} /></span>
            <span class="kpi-value">{item.value}</span>
            <span class="kpi-label">{item.label}</span>
            <span class="kpi-hint">{item.hint ?? ''}</span>
        </li>
    {/each}
</ul>

<style>
    .kpis {
        gap: var(--space-normal);
        margin-bottom: var(--space-xlarge);
        list-style: none;
    }

    .kpi {
        position: relative;
        row-gap: var(--space-xs);
        padding: var(--space-large);
        border-top: 3px solid var(--gold);
        background: var(--gold-glow), var(--black);
    }

    .kpi-icon {
        color: var(--gold);
        font-size: var(--font-xlarge);
    }

    .kpi-value {
        color: var(--text-light);
        font-size: var(--font-xxlarge);
        font-style: italic;
        font-weight: 700;
        line-height: 1.1;
        overflow-wrap: anywhere;
    }

    .kpi-label {
        color: var(--gold);
        font-size: var(--font-small);
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .kpi-hint {
        color: var(--grey-light);
        font-size: var(--font-small);
    }
</style>
