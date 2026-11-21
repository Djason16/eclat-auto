<script lang="ts">
    import type { Snippet } from 'svelte'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * Final call to action of a page: a black block with a soft gold glow and a gold line on top, a big italic title and buttons.
     *   <CtaBand title="Prêt à retrouver l'éclat ?" text="...">{buttons}</CtaBand>
     */
    let { title, text = '', children }: { title: string, text?: string, children: Snippet } = $props()
</script>

<section class="cta-band surface-dark texture-dark">
    <div class="cta-band-inner reveal" use:reveal>
        <h2 class="display-title">{title}</h2>
        {#if text}
            <p>{text}</p>
        {/if}
        <div class="cta-band-actions">
            {@render children()}
        </div>
    </div>
</section>

<style>
    .cta-band {
        position: relative;
        padding: var(--space-xxlarge) var(--page-gutter);
        overflow: hidden;
    }

    /* A straight gold line on top of the block */
    .cta-band::before {
        content: "";
        position: absolute;
        inset: 0 0 auto;
        height: 3px;
        background: var(--gold-line);
    }

    .cta-band-inner {
        position: relative;
        display: grid;
        gap: var(--space-normal);
        justify-items: center;
        max-width: 48rem;
        margin-inline: auto;
        text-align: center;
    }

    p {
        color: var(--grey-light);
        font-size: var(--font-large);
    }

    .cta-band-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-small);
        margin-top: var(--space-small);
    }
</style>
