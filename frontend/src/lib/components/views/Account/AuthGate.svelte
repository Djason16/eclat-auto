<script lang="ts">
    import type { Snippet } from 'svelte'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import { openAuth } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Role } from '#lib/types.js'

    /*
     * Private area (customer space, admin): its content only once the data of this browser is loaded and the right
     * person is signed in. Otherwise the sign-in window opens (like the protected pages of the original) and a short
     * message stays on the page. The pages are static: the check is in the browser.
     */
    let { role, children }: { role: Role, children: Snippet } = $props()

    const allowed = $derived(demo.user && (role === 'customer' || demo.user.role === 'admin'))

    // Signed out on a private page: the sign-in window opens by itself, once
    let asked = false
    $effect(() => {
        if (demo.ready && !demo.user && !asked) {
            asked = true
            openAuth()
        }
    })
</script>

{#if !demo.ready}
    <p class="loading-state" role="status">Chargement de votre espace...</p>
{:else if allowed}
    {@render children()}
{:else}
    <div class="empty-state stack gap-m">
        <p>
            {role === 'admin'
                ? 'Cette page est réservée à l’administrateur. Entrez avec le compte admin de démonstration.'
                : 'Connectez-vous pour voir vos rendez-vous et vos informations.'}
        </p>
        <p><BaseButton onclick={() => openAuth()}>Se connecter</BaseButton></p>
    </div>
{/if}
