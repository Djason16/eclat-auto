<script lang="ts">
    import ServiceCard from '#lib/components/ui/ServiceCard/ServiceCard.svelte'
    import { CATEGORY_PHOTOS } from '#lib/content/photos.js'
    import type { Service } from '#lib/types.js'

    /*
     * Rates of one category, laid out like the original: the cards side by side from edge to edge, two per row,
     * the third one alone on its full row; one column under 768 px.
     */
    let { services }: { services: Service[] } = $props()
</script>

<div class="cards">
    {#each services as service, index (service.id)}
        <!-- Its own photo for each card (no picture twice on the site); none beyond the planned ones -->
        <ServiceCard {service} photo={CATEGORY_PHOTOS[service.category][index] ?? ''} />
    {/each}
</div>

<style>
    /* Rows of two aligned cards (premium.css: subgrid), edge to edge */
    .cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        background-color: var(--black);
    }

    /* Third card alone on its row, like the original */
    .cards > :global(:nth-child(3n)) {
        grid-column: 1 / -1;
    }

    .cards > :global(:only-child) {
        grid-column: 1 / -1;
    }

    @media (max-width: 768px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }
</style>
