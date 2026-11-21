<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { formatPrice } from '#lib/utils/format.js'

    // Options of the home page: name and price in gold on each line, next to the photo
    const extras = $derived(demo.catalog.extras.filter((item) => item.active))
</script>

<InfoBlock photo={PHOTOS.infoExtras} kicker="À la carte" title="Les options qui font la différence"
    text="À ajouter à n’importe quelle formule au moment de réserver.">
    <ul class="extras" role="list">
        {#each extras as extra (extra.id)}
            <li><span>{extra.name}</span> <strong>{formatPrice(extra.price)}</strong></li>
        {/each}
    </ul>
    {#snippet actions()}
        <BaseButton variant="secondary" href={resolve('reservation/')} title="Réserver avec des options" icon="calendar">Réserver avec options</BaseButton>
    {/snippet}
</InfoBlock>

<style>
    .extras {
        display: grid;
        width: 100%;
        max-width: 30rem;
        list-style: none;
    }

    .extras li {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-normal);
        padding-block: var(--space-small);
        border-bottom: 1px solid rgb(255 255 255 / 12%);
        color: var(--text-light);
    }

    strong {
        color: var(--gold);
        font-style: italic;
        white-space: nowrap;
    }
</style>
