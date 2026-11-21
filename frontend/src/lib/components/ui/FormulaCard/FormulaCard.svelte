<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import type { Service } from '#lib/types.js'
    import { formatDuration, formatPrice } from '#lib/utils/format.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * One formula in the comparison of the services page: name, price in big italic, duration chip, what is included
     * (gold checks) and the button that opens the booking on it. The recommended one is lifted, with a gold badge.
     */
    let { service, step = 0 }: { service: Service, step?: number } = $props()
</script>

<article class="premium-card aligned-card formula reveal" class:featured={service.featured} use:reveal={step}>
    {#if service.featured}
        <span class="chip chip-gold formula-badge"><Icon name="star" /> Recommandé</span>
    {:else}
        <span class="card-slot"></span>
    {/if}
    <h3 class="card-title-large">{service.name}</h3>
    <p class="formula-summary">{service.summary}</p>
    <p class="formula-price">
        {#if service.quoteOnly}
            Sur devis
        {:else}
            <small>dès</small> {formatPrice(service.price)}
        {/if}
    </p>
    <p class="chip-row">
        <span class="chip"><Icon name="clock" /> {formatDuration(service.duration)}</span>
        {#if !service.quoteOnly}<span class="chip"><Icon name="car" /> prix citadine</span>{/if}
    </p>
    <ul class="formula-list" role="list">
        {#each service.details as detail (detail)}
            <li><Icon name="check" /> {detail}</li>
        {/each}
    </ul>
    <BaseButton variant={service.featured ? 'secondary' : 'tertiary'} full href="{resolve('reservation/')}?prestation={service.id}"
        title="Réserver : {service.name}" iconAfter="arrowRight">Réserver cette formule</BaseButton>
</article>

<style>
    .formula {
        height: 100%;
    }

    .formula.featured {
        border-color: var(--gold);
        box-shadow: var(--shadow);
    }

    .formula-badge {
        justify-self: start;
    }

    .formula-summary {
        color: var(--text-color-muted);
    }

    .formula-price {
        color: var(--black);
        font-size: var(--font-tall);
        font-style: italic;
        font-weight: 700;
        line-height: 1;
    }

    .formula-price small {
        color: var(--text-color-muted);
        font-size: var(--font-small);
        font-style: normal;
        font-weight: 400;
    }

    .formula-list {
        display: grid;
        align-content: start;
        gap: var(--space-small);
        padding-top: var(--space-normal);
        border-top: 1px solid var(--border-color);
        list-style: none;
    }

    .formula-list li {
        display: flex;
        align-items: flex-start;
        gap: var(--space-small);
    }

    .formula-list :global(.icon) {
        margin-top: var(--space-xxs);
        color: var(--gold-dark);
    }
</style>
