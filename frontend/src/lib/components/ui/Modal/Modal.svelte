<script lang="ts">
    import type { Snippet } from 'svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { trapScroll } from '#lib/utils/scrollTrap.js'

    /*
     * Window of the site, with the look of the original (Modal.vue): a translucent white panel over a dark veil, the
     * cross at the top right that turns on hover. Built on the native <dialog> opened with showModal(): the page behind
     * is inert, the focus stays inside, Escape closes it, the focus goes back to the button that opened it, and the page
     * does not scroll behind it (base/global.css).
     *   <Modal open={Boolean(item)} title="Modifier" onclose={() => (item = null)}>...</Modal>
     */
    // tone "danger": red bar for the confirmations that delete or cancel something (gold bar otherwise)
    let { open, title, onclose, children, tone = 'gold' }: {
        open: boolean, title: string, onclose: () => void, children: Snippet, tone?: 'gold' | 'danger'
    } = $props()

    let dialog: HTMLDialogElement | undefined = $state()
    const uid = $props.id()

    $effect(() => {
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    })

    // The wheel and the finger never move the page behind (utils/scrollTrap.ts)
    $effect(() => {
        if (dialog) return trapScroll(dialog)
    })

    // A click on the veil (outside the panel) closes it too
    const onBackdrop = (event: MouseEvent) => {
        if (event.target === dialog) onclose()
    }
</script>

<!-- A click on the veil closes it; Escape is handled by <dialog> itself -->
<dialog bind:this={dialog} class="modal-shell" aria-labelledby="{uid}-title" aria-modal="true"
    oncancel={(event) => { event.preventDefault(); onclose() }} onclick={onBackdrop}>
    {#if open}
        <div class="modal" class:modal-danger={tone === 'danger'}>
            <div class="modal-head">
                <h2 id="{uid}-title">{title}</h2>
                <button type="button" class="modal-close" aria-label="Fermer la fenêtre" title="Fermer" onclick={onclose}>
                    <Icon name="close" />
                </button>
            </div>
            {@render children()}
        </div>
    {/if}
</dialog>

<style>
    /*
     * The <dialog> covers the whole screen and is the only scroll area while it is open: a long window scrolls as one
     * block (the panel .modal has no height limit and no scrollbar of its own), and overscroll-behavior keeps the wheel
     * and the finger from moving the page behind, which stays exactly where it was.
     */
    dialog {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        width: 100%;
        max-width: none;
        height: 100%;
        max-height: none;
        margin: 0;
        padding: var(--space-normal);
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: var(--gold) transparent;
        border: none;
        background: transparent;
        color: var(--black);
    }

    /* A long window scrolls as one block, with a margin above and under it */
    dialog > :global(.modal) {
        margin-block: var(--space-large);
    }

    dialog:not([open]) {
        display: none;
    }

    /* The page behind keeps its place and its scrollbar; only the window scrolls inside */
    dialog::backdrop {
        background-color: rgb(0 0 0 / 50%);
        overscroll-behavior: contain;
    }

    dialog[open] .modal {
        animation: modal-in var(--duration-fast) var(--ease);
    }

    dialog[open]::backdrop {
        animation: veil-in var(--duration-fast) var(--ease);
    }

    @keyframes modal-in {
        from { opacity: 0; transform: scale(0.98); }
        to { opacity: 1; transform: none; }
    }

    @keyframes veil-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>
