<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import type { Service } from '#lib/types.js'
    import { formatDuration, formatPrice } from '#lib/utils/format.js'
    import { lazyBackground } from '#lib/utils/lazyBackground.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * Card of one service, from the original: a black panel (75 %) over a blurred photo, the title in capitals, the
     * gold price, the details sliding in from the right, the black button. Improved: the length of the job, and the button
     * opens the booking with this service already chosen.
     */
    let { service, photo = '' }: { service: Service, photo?: string } = $props()

    const bookingHref = $derived(`${resolve('reservation/')}?prestation=${service.id}`)
</script>

<article class="service-card aligned-card surface-dark" use:lazyBackground={photo}>
    <div class="service-info">
        <h3 class="service-title">{service.name}</h3>
        <div class="service-details">
            <p class="service-price text-xlarge text-bold">
                {service.quoteOnly ? 'Sur devis' : formatPrice(service.price)}
                &#32;{#if service.featured}<span class="service-flag text-small">Le plus choisi</span>{/if}
            </p>
            <ul role="list">
                {#each service.details as detail, index (detail)}
                    <li class="reveal" use:reveal={index}>{detail}</li>
                {/each}
            </ul>
            <p class="service-time text-small">Temps d’intervention : {formatDuration(service.duration)}</p>
        </div>
        <p><BaseButton variant="tertiary" size="small" href={bookingHref} title="Réserver : {service.name}">Réserver</BaseButton></p>
    </div>
</article>

<style>
    .service-card {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--lazy-photo, none) center / cover no-repeat, var(--black-3);
    }

    /* Its parts (title, price, list, time, button) share the rows of the pair of cards: they line up side by side */
    .service-card.aligned-card {
        display: grid;
        grid-row: span 5;
        grid-template-rows: subgrid;
        row-gap: 0;
    }

    .service-info {
        display: grid;
        grid-row: 1 / -1;
        grid-template-rows: subgrid;
        align-self: stretch;
        row-gap: var(--space-normal);
        padding: var(--space-card);
        background-color: rgb(0 0 0 / 75%);
        transition: background-color var(--duration-fast) var(--ease);
    }

    /* With a mouse: the veil lightens a little and the photo shows through, like a light passing on the paint */
    @media (hover: hover) and (pointer: fine) {
        .service-card:hover .service-info {
            background-color: rgb(0 0 0 / 66%);
        }
    }

    .service-title {
        color: var(--text-light);
        font-size: var(--font-large);
        text-transform: uppercase;
    }

    .service-details {
        display: contents;
    }

    .service-info > :last-child {
        align-self: end;
    }

    .service-price {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-small) var(--space-normal);
        color: var(--gold);
    }

    .service-flag {
        padding: var(--space-xs) var(--space-small);
        background-color: var(--gold);
        color: var(--black);
    }

    ul {
        display: grid;
        align-content: start;
        gap: var(--space-small);
    }

    /* Each detail on its line, a small gold mark in front (the original lines, easier to scan) */
    ul li {
        position: relative;
        padding-left: var(--space-normal);
        color: var(--text-light);
        line-height: 1.4;
    }

    ul li::before {
        content: "";
        position: absolute;
        top: var(--space-small);
        left: 0;
        width: 6px;
        height: 6px;
        background-color: var(--gold);
    }

    .service-time {
        color: var(--grey-light);
    }

    @media (max-width: 360px) {
        .service-info {
            padding-inline: var(--space-normal);
        }
    }
</style>
