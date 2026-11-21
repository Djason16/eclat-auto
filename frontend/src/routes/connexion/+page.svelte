<script lang="ts">
    import { onMount } from 'svelte'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import { openAuth } from '#lib/stores/actions/uiActions.js'

    // Fallback address only (not in the menu): like on the original, signing in happens in a window, opened here
    onMount(() => openAuth())
</script>

<Seo pageKey="login" />
<PageHero kicker="Connexion" title="Connectez-vous à votre compte" accent="votre compte" text="Retrouvez vos rendez-vous et réservez plus vite.">
    <BaseButton onclick={() => openAuth()}>Connexion/Inscription</BaseButton>
</PageHero>
