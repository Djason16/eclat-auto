<script lang="ts">
    import type { Snippet } from 'svelte'
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import CtaBand from '#lib/components/ui/CtaBand/CtaBand.svelte'
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import LegalToc from './LegalToc.svelte'

    /*
     * Legal pages: the hero of the pages (title, short text, date of the last update), then the table of contents next to
     * the numbered sections (LegalSection, ids legal-1, legal-2...). The text keeps a comfortable line length (70ch).
     *   <LegalPage title="Mentions légales" text="..." toc={['Propriétaire', 'Hébergeur']}>{sections}</LegalPage>
     */
    let { title, text, toc, updated = '21 novembre 2026', children }: {
        title: string, text: string, toc: string[], updated?: string, children: Snippet
    } = $props()
</script>

<PageHero kicker="Informations légales" crumb={title} {title} {text} info="Dernière mise à jour : {updated}." />

<div class="section legal-section-block">
    <div class="container legal-layout">
        <LegalToc items={toc} />
        <div class="legal-content">
            {@render children()}
            <div class="legal-end">
                <BaseButton variant="primary" size="small" icon="chevronDown" class="legal-top"
                    onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Retour en haut</BaseButton>
            </div>
        </div>
    </div>
</div>
<!-- Dark end of the page before the footer -->
<CtaBand title="Une question sur ces informations ?" text="L’atelier vous répond sous 48 heures.">
    <BaseButton variant="secondary" href={resolve('contact/')} title="Nous contacter" icon="mail">Nous contacter</BaseButton>
</CtaBand>

<style>
    /* A little tighter than the other sections: the text is read, not scanned */
    .legal-section-block {
        padding-block: var(--space-large);
    }

    /* Table of contents on the left (sticky), the text on the right */
    .legal-layout {
        display: grid;
        grid-template-columns: 16rem minmax(0, 1fr);
        align-items: start;
        gap: var(--space-xlarge);
    }

    .legal-content {
        display: grid;
        max-width: 70ch;
    }

    .legal-end {
        padding-top: var(--space-normal);
    }

    .legal-end :global(.legal-top .icon) {
        transform: rotate(180deg);
    }

    @media (max-width: 900px) {
        .legal-layout {
            grid-template-columns: 1fr;
            gap: var(--space-large);
        }
    }
</style>
