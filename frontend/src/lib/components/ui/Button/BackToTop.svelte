<script lang="ts">
    import FloatingButton from '#lib/components/ui/Button/FloatingButton.svelte'

    // Scroll distance (in pixels) from which the button appears
    const SHOW_AFTER = 400

    let scrollY = $state(0)
</script>

<svelte:window bind:scrollY />

<!-- Shown once the visitor has scrolled, takes them back to the top -->
{#if scrollY > SHOW_AFTER}
    <FloatingButton aria-label="Retour en haut" title="Retour en haut"
        onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</FloatingButton>
{/if}
