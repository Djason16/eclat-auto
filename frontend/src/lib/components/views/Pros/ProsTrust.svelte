<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import SectionHead from '#lib/components/ui/SectionHead/SectionHead.svelte'
    import { FIGURES, PARTNERS, PRO_TESTIMONIAL } from '#lib/content/pros.js'
    import { reveal } from '#lib/utils/reveal.js'

    // "Ils nous font confiance": key figures, the names of invented partners (no logo) and one testimonial, all fictive
</script>

<section class="section surface-dark texture-dark" aria-labelledby="trust-title">
    <div class="container trust">
        <SectionHead id="trust-title" kicker="Ils nous font confiance" title="Des pros qui roulent propre"
            text="Chiffres, noms et témoignage inventés pour la démonstration." center />
        <ul class="figures" role="list">
            {#each FIGURES as figure, index (figure.label)}
                <li class="figure reveal" use:reveal={index}><strong>{figure.value}</strong> <span>{figure.label}</span></li>
            {/each}
        </ul>
        <ul class="partners" role="list" aria-label="Entreprises clientes (noms inventés)">
            {#each PARTNERS as partner (partner)}
                <li>{partner}</li>
            {/each}
        </ul>
        <figure class="testimonial reveal" use:reveal>
            <span class="testimonial-quote" aria-hidden="true"><Icon name="quote" /></span>
            <blockquote>{PRO_TESTIMONIAL.text}</blockquote>
            <figcaption>{PRO_TESTIMONIAL.author}</figcaption>
        </figure>
    </div>
</section>

<style>
    .trust {
        display: grid;
        gap: var(--space-xlarge);
    }

    .figures {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
        gap: var(--space-large);
        list-style: none;
        text-align: center;
    }

    .figures .figure {
        justify-items: center;
        padding-top: var(--space-normal);
        border-top: 2px solid var(--gold);
    }

    .partners {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-normal) var(--space-xlarge);
        padding-block: var(--space-large);
        border-block: 1px solid rgb(255 255 255 / 12%);
        list-style: none;
    }

    .partners li {
        color: var(--grey-light);
        font-size: var(--font-large);
        font-style: italic;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .testimonial {
        display: grid;
        gap: var(--space-normal);
        justify-items: center;
        max-width: 46rem;
        margin-inline: auto;
        text-align: center;
    }

    .testimonial-quote {
        color: var(--gold);
        font-size: var(--font-tall);
    }

    blockquote {
        color: var(--text-light);
        font-size: var(--font-xlarge);
        font-style: italic;
        line-height: 1.5;
    }

    figcaption {
        color: var(--grey-light);
        font-size: var(--font-small);
    }
</style>
