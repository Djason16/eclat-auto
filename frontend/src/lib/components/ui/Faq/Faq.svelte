<script lang="ts">
    import Expandable from '#lib/components/ui/Expandable/Expandable.svelte'
    import SectionHead from '#lib/components/ui/SectionHead/SectionHead.svelte'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * Questions asked often: each one a folding block (Expandable, smooth like Élan's), a gold bar on the left once open.
     *   <Faq id="faq-title" kicker="Questions fréquentes" title="..." text="..." items={FAQ} />
     */
    let { id, kicker, title, text = '', items, white = false }: {
        id: string, kicker: string, title: string, text?: string, items: { question: string, answer: string }[], white?: boolean
    } = $props()
</script>

<section class="section" class:section-white={white} aria-labelledby={id}>
    <div class="container faq-grid">
        <SectionHead {id} {kicker} {title} {text} />
        <div class="faq">
            {#each items as item, index (item.question)}
                <div class="faq-item reveal" use:reveal={index}>
                    <Expandable>
                        {#snippet header()}{item.question}{/snippet}
                        <p>{item.answer}</p>
                    </Expandable>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .faq-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
        align-items: start;
        gap: var(--space-xlarge);
    }

    .faq {
        display: grid;
        gap: var(--space-small);
    }

    .faq-item {
        border: 1px solid var(--border-color);
        border-left: 3px solid var(--border-color);
        background-color: var(--white);
        transition: border-color var(--transition);
    }

    .faq-item:has(:global(.is-open)) {
        border-left-color: var(--gold);
    }

    .faq-item p {
        padding: 0 var(--space-large) var(--space-large);
        color: var(--text-color-muted);
        line-height: 1.7;
    }

    @media (hover: hover) and (pointer: fine) {
        .faq-item:hover {
            border-left-color: var(--gold-dark);
        }
    }

    @media (max-width: 900px) {
        .faq-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
