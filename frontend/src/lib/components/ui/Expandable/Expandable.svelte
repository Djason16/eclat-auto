<script lang="ts">
    import type { Snippet } from 'svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'

    /*
     * Block that opens and closes (questions, table of contents on a phone), like the one of Élan Solidaire: the header
     * is a real button (aria-expanded), the height follows the content in both directions (grid rows 0fr <-> 1fr,
     * assets/css/components/expandable.css), the text fades with it and the arrow turns at the same pace. Closed, the
     * content is inert (out of the keyboard order and of screen readers). "locked" keeps it open (large screens).
     *   <Expandable>{#snippet header()}Question{/snippet}<p>Answer</p></Expandable>
     */
    let { open = $bindable(false), locked = false, class: className = '', header, children }: {
        open?: boolean, locked?: boolean, class?: string, header: Snippet, children: Snippet
    } = $props()

    const uid = $props.id()
    const shown = $derived(open || locked)
</script>

<div class="expandable {className}" class:is-open={shown} class:is-locked={locked}>
    <button type="button" class="expandable-header" aria-expanded={shown} aria-controls="{uid}-content"
        disabled={locked} onclick={() => (open = !open)}>
        <span class="expandable-title">{@render header()}</span>
        {#if !locked}
            <span class="expandable-sign" aria-hidden="true"><Icon name="chevronDown" /></span>
        {/if}
    </button>
    <div id="{uid}-content" class="expandable-content" inert={!shown}>
        <div class="expandable-inner">{@render children()}</div>
    </div>
</div>
