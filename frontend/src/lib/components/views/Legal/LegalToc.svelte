<script lang="ts">
    import { onMount } from 'svelte'
    import Expandable from '#lib/components/ui/Expandable/Expandable.svelte'

    /*
     * Table of contents of a legal page: sticky and always open on a large screen, a smooth folding block (Expandable) on
     * a phone. Each entry is a button that scrolls to its section (no "#" address); the section being read is in gold.
     */
    let { items }: { items: string[] } = $props()

    let current = $state(1)
    let open = $state(false)
    let wide = $state(false)

    const go = (index: number) => {
        const target = document.getElementById(`legal-${index}`)
        if (!target) return
        const header = document.querySelector('.header')?.getBoundingClientRect().height ?? 0
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - header - 16, behavior: 'smooth' })
        target.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
        open = false
    }

    onMount(() => {
        // Large screen: always open
        const media = window.matchMedia('(min-width: 901px)')
        const update = () => { wide = media.matches }
        update()
        media.addEventListener('change', update)
        // The section at the top of the screen is the current one (scroll-spy)
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) current = Number(entry.target.id.replace('legal-', ''))
            }
        }, { rootMargin: '-20% 0px -70% 0px' })
        for (const section of document.querySelectorAll('.legal-section')) observer.observe(section)
        return () => {
            observer.disconnect()
            media.removeEventListener('change', update)
        }
    })
</script>

<nav class="legal-toc" aria-label="Sommaire">
    <Expandable bind:open locked={wide} class="legal-toc-box">
        {#snippet header()}Sommaire <span class="legal-toc-count">({items.length} parties)</span>{/snippet}
        <ol role="list">
            {#each items as item, index (item)}
                <li>
                    <button type="button" class:current={current === index + 1} aria-current={current === index + 1 ? 'true' : undefined}
                        onclick={() => go(index + 1)}>
                        <span class="legal-toc-number">{String(index + 1).padStart(2, '0')}</span>&#32;<span>{item}</span>
                    </button>
                </li>
            {/each}
        </ol>
    </Expandable>
</nav>

<style>
    .legal-toc {
        position: sticky;
        top: calc(var(--header-height) + var(--space-large));
    }

    .legal-toc :global(.legal-toc-box) {
        border: 1px solid var(--border-color);
        border-top: 3px solid var(--gold);
        background-color: var(--white);
    }

    .legal-toc :global(.expandable-header) {
        padding: var(--space-normal);
        color: var(--black);
        font-style: italic;
        text-transform: uppercase;
    }

    .legal-toc-count {
        color: var(--grey);
        font-size: var(--font-small);
        font-style: normal;
        font-weight: 400;
        text-transform: none;
    }

    ol {
        display: grid;
        padding: 0 var(--space-small) var(--space-small);
        list-style: none;
    }

    button {
        display: flex;
        align-items: baseline;
        gap: var(--space-small);
        width: 100%;
        min-height: 2.5rem;
        padding: var(--space-small);
        border: none;
        border-left: 3px solid transparent;
        background: none;
        color: var(--black);
        font-size: var(--font-small);
        text-align: left;
        cursor: pointer;
        transition: border-color var(--transition), background-color var(--transition), color var(--transition);
    }

    .legal-toc-number {
        color: var(--gold-dark);
        font-weight: 700;
    }

    /* The part being read (scroll-spy): gold bar, dark gold text */
    .current {
        border-left-color: var(--gold);
        background-color: var(--light);
        color: var(--gold-dark);
        font-weight: 700;
    }

    @media (hover: hover) and (pointer: fine) {
        button:hover {
            border-left-color: var(--gold-medium);
            background-color: var(--light);
            color: var(--gold-dark);
        }
    }

    @media (max-width: 900px) {
        .legal-toc {
            position: static;
        }
    }
</style>
