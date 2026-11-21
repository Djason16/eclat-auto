<script lang="ts">
    import GoldBand from '#lib/components/ui/GoldBand/GoldBand.svelte'
    import { CATEGORIES } from '#lib/content/catalog.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import CategoryCards from './CategoryCards.svelte'

    // Rates of the home page, like the original: a gold band per category, then its cards (from the current catalog)
    const groups = $derived(CATEGORIES
        .map((category) => ({ category, services: demo.catalog.services.filter((item) => item.category === category.id && item.active) }))
        .filter((group) => group.services.length))
</script>

<div id="services">
    {#each groups as group (group.category.id)}
        <GoldBand title={group.category.name} />
        <CategoryCards services={group.services} />
    {/each}
</div>
