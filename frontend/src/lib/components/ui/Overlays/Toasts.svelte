<script lang="ts">
    import { cubicOut } from 'svelte/easing'
    import { fly } from 'svelte/transition'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { dismissToast } from '#lib/stores/actions/uiActions.js'
    import { ui } from '#lib/stores/ui.svelte.js'
    import type { ToastKind } from '#lib/types.js'

    /*
     * Notifications (stores/actions/uiActions.ts: notify), 3 at most: black card with straight edges and a gold bar (red
     * for an error), an icon and an italic title. Under the header, so they never cover the menu nor the booking buttons.
     * Polite announcements for the screen readers; an error is announced at once.
     */
    const LOOK: Record<ToastKind, { title: string, icon: 'check' | 'alert' | 'info' }> = {
        success: { title: 'C’est fait', icon: 'check' },
        error: { title: 'À revoir', icon: 'alert' },
        info: { title: 'Bon à savoir', icon: 'info' },
    }

    // Just under the header (and the demo banner when it is still on screen), whatever the page and the scroll
    let top = $state(0)
    $effect(() => {
        if (ui.toasts.length) top = Math.max(0, document.querySelector('.header')?.getBoundingClientRect().bottom ?? 0)
    })
</script>

<div class="toasts-region" aria-live="polite" role="status">
    <ul class="toasts" style:--toasts-top="{top}px">
        {#each ui.toasts as toast (toast.id)}
            <li class="toast toast-{toast.kind}" role={toast.kind === 'error' ? 'alert' : undefined}
                transition:fly={{ x: 60, duration: 650, easing: cubicOut }}>
                <span class="toast-icon"><Icon name={LOOK[toast.kind].icon} /></span>
                <div class="toast-body">
                    <p class="toast-title">{LOOK[toast.kind].title}</p>
                    <p>{toast.text}</p>
                </div>
                <button type="button" class="toast-close" aria-label="Fermer la notification" title="Fermer" onclick={() => dismissToast(toast.id)}>
                    <Icon name="close" />
                </button>
            </li>
        {/each}
    </ul>
</div>
