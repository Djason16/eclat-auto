<script lang="ts">
    import type { Snippet } from 'svelte'

    // One numbered part of a legal page (id legal-<index>, used by the table of contents): number, title and text
    let { index, title, children }: { index: number, title: string, children: Snippet } = $props()
</script>

<section class="legal-section" id="legal-{index}" aria-labelledby="legal-{index}-title">
    <p class="legal-number" aria-hidden="true">{String(index).padStart(2, '0')}</p>
    <h2 id="legal-{index}-title" tabindex="-1">{title}</h2>
    <div class="legal-body">{@render children()}</div>
</section>

<style>
    .legal-section {
        display: grid;
        gap: var(--space-xs);
        padding: var(--space-large) 0;
        border-top: 1px solid var(--line);
        scroll-margin-top: calc(var(--header-height) + var(--space-large));
    }

    .legal-section:first-child {
        padding-top: 0;
        border-top: none;
    }

    .legal-number {
        color: var(--gold-dark);
        font-size: var(--font-small);
        font-weight: 700;
        letter-spacing: 0.12em;
    }

    h2 {
        color: var(--black);
        font-size: var(--font-xlarge);
        font-style: italic;
        line-height: 1.25;
        text-transform: uppercase;
    }

    h2:focus {
        outline: none;
    }

    .legal-body {
        display: grid;
        gap: var(--space-small);
        margin-top: var(--space-xs);
    }

    .legal-body :global(p),
    .legal-body :global(li) {
        color: var(--black);
        font-size: var(--font-normal);
        line-height: 1.65;
    }

    .legal-body :global(ul) {
        display: grid;
        gap: var(--space-xs);
        padding-left: var(--space-normal);
        border-left: 2px solid var(--gold);
        list-style: none;
    }

    .legal-body :global(code) {
        padding: 0 var(--space-xs);
        background-color: var(--white);
        border: 1px solid var(--line);
        font-size: var(--font-small);
        overflow-wrap: anywhere;
    }
</style>
