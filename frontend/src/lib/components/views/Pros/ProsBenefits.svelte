<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import PageSection from '#lib/components/ui/PageSection/PageSection.svelte'
    import { BENEFITS } from '#lib/content/pros.js'
    import { reveal } from '#lib/utils/reveal.js'

    // Why companies choose the workshop: the benefits as cards with their pictogram
</script>

<PageSection id="benefits-title" kicker="Flottes, concessions, loueurs" title="Un service pensé pour les pros"
    text="Vos véhicules restent présentables sans que vos équipes perdent de temps." center tone="white">
    <ul class="benefits aligned-cards" role="list" style:--card-rows="3" style:--card-min="14rem">
        {#each BENEFITS as benefit, index (benefit.title)}
            <li class="premium-card aligned-card benefit reveal" use:reveal={index}>
                <span class="picto"><Icon name={benefit.icon} /></span>
                <h3 class="card-title">{benefit.title}</h3>
                <p>{benefit.text}</p>
            </li>
        {/each}
    </ul>
</PageSection>

<style>
    .benefits {
        gap: var(--space-normal);
        list-style: none;
    }

    .benefit {
        gap: var(--space-small);
        background-color: var(--light);
    }

    p {
        color: var(--text-color-muted);
    }
</style>
