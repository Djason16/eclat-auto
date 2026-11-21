<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import PageSection from '#lib/components/ui/PageSection/PageSection.svelte'
    import { SIMULATED } from '#lib/content/features.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * What the demo simulates and what a real site would do instead: one aligned card per topic, the demo side on top,
     * the real side under it with the gold line.
     */
</script>

<PageSection id="features-simulated" kicker="Démo et vrai site" title="Ce qui est simulé, ce qui deviendrait réel"
    text="Tout fonctionne ici sans serveur. Sur votre site, chaque partie passe en vrai, avec les mêmes écrans." center tone="white">
    <ul class="simulated aligned-cards" role="list" style:--card-rows="4" style:--card-min="20rem">
        {#each SIMULATED as row, index (row.topic)}
            <li class="premium-card aligned-card simulated-card reveal" use:reveal={index}>
                <span class="picto"><Icon name={row.icon} /></span>
                <h3 class="card-title">{row.topic}</h3>
                <p><strong class="simulated-label">Dans la démo</strong>&#32;{row.demo}</p>
                <p class="simulated-real"><strong class="simulated-label">Sur un vrai site</strong>&#32;{row.real}</p>
            </li>
        {/each}
    </ul>
</PageSection>

<style>
    .simulated {
        list-style: none;
    }

    .simulated-card {
        background-color: var(--light);
    }

    p {
        color: var(--text-color-muted);
    }

    /* The label on its own line, above its sentence */
    .simulated-label {
        display: block;
        margin-bottom: var(--space-xxs);
        color: var(--text-color);
        font-size: var(--font-small);
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .simulated-real {
        padding-top: var(--space-small);
        border-top: 2px solid var(--gold);
    }

    .simulated-real .simulated-label {
        color: var(--accent-color);
    }
</style>
