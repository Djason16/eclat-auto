<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import SectionHead from '#lib/components/ui/SectionHead/SectionHead.svelte'
    import type { IconName } from '#lib/utils/icons.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * "Comment ça marche": numbered steps joined by a gold line, each with its pictogram (home page, professionals).
     *   <Steps id="steps-title" kicker="Comment ça marche" title="..." text="..." items={STEPS} />
     */
    let { id, kicker, title, text = '', items }: {
        id: string, kicker: string, title: string, text?: string, items: { icon: IconName, title: string, text: string }[]
    } = $props()
</script>

<section class="section steps-section" aria-labelledby={id}>
    <div class="container">
        <SectionHead {id} {kicker} {title} {text} center />
        <ol class="steps" role="list">
            {#each items as step, index (step.title)}
                <li class="step reveal" use:reveal={index}>
                    <span class="step-number" aria-hidden="true">0{index + 1}</span>
                    <span class="picto"><Icon name={step.icon} /></span>
                    <h3 class="card-title">{step.title}</h3>
                    <p>{step.text}</p>
                </li>
            {/each}
        </ol>
    </div>
</section>

<style>
    .steps-section {
        background: linear-gradient(180deg, var(--light), var(--white));
    }

    .steps {
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--space-large);
        list-style: none;
    }

    /* The gold line that joins the pictograms */
    .steps::before {
        content: "";
        position: absolute;
        top: calc(var(--font-xxlarge) + var(--space-small) + var(--picto-size) / 2);
        right: 12%;
        left: 12%;
        height: 2px;
        background: var(--gold-line);
        opacity: 0.6;
    }

    .step {
        position: relative;
        display: grid;
        gap: var(--space-small);
        justify-items: center;
        text-align: center;
    }

    .step-number {
        color: var(--gold-dark);
        font-size: var(--font-xxlarge);
        font-style: italic;
        font-weight: 700;
        line-height: 1;
    }

    .step .picto {
        position: relative;
        width: var(--picto-size);
        height: var(--picto-size);
    }

    p {
        max-width: 18rem;
        color: var(--text-color-muted);
    }

    @media (max-width: 900px) {
        .steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .steps::before {
            display: none;
        }
    }

    @media (max-width: 480px) {
        .steps {
            grid-template-columns: 1fr;
        }
    }
</style>
