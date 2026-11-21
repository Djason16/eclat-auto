<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import BeforeAfter from '#lib/components/ui/BeforeAfter/BeforeAfter.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import { reveal } from '#lib/utils/reveal.js'

    // The before / after of a headlight renovation, next to the promise and three figures
    const POINTS = ['Phares rendus clairs et sûrs la nuit', 'Vernis de protection anti-UV', 'Fait en 30 minutes pendant votre lavage']
</script>

<section class="section showcase surface-dark texture-dark" aria-labelledby="showcase-title">
    <div class="container showcase-grid">
        <div class="showcase-copy reveal" use:reveal>
            <p class="kicker">Avant / après</p>
            <h2 id="showcase-title" class="display-title">Glissez pour voir la différence</h2>
            <p class="showcase-text">
                Un phare jauni fait vieillir toute la voiture. Rénové, il retrouve sa clarté d’origine : faites glisser la
                ligne dorée pour comparer.
            </p>
            <ul class="showcase-points" role="list">
                {#each POINTS as point (point)}
                    <li><Icon name="check" /> {point}</li>
                {/each}
            </ul>
            <BaseButton variant="secondary" href={resolve('reservation/')} title="Réserver une rénovation des phares" icon="calendar">
                Ajouter à ma réservation
            </BaseButton>
        </div>
        <div class="reveal" use:reveal={1}>
            <BeforeAfter photo={PHOTOS.beforeAfter} alt="Phare avant d’une voiture noire, après rénovation" before="Phare terni et jauni"
                after="Phare rénové et protégé" />
        </div>
    </div>
</section>

<style>
    .showcase-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
        align-items: center;
        gap: var(--space-xlarge);
    }

    .showcase-copy {
        display: grid;
        gap: var(--space-normal);
        justify-items: start;
    }

    .showcase-text {
        color: var(--grey-light);
        font-size: var(--font-large);
    }

    .showcase-points {
        display: grid;
        gap: var(--space-small);
        list-style: none;
    }

    .showcase-points li {
        display: flex;
        align-items: center;
        gap: var(--space-small);
        color: var(--text-light);
    }

    .showcase-points :global(.icon) {
        color: var(--gold);
    }

    @media (max-width: 900px) {
        .showcase-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
