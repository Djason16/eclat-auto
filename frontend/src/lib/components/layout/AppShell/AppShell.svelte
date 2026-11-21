<script lang="ts">
    // dc-scaffold: adapted (own design: loader always on, demo data loaded, windows of the demo, skip link)
    import { onMount, type Component, type Snippet } from 'svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import Footer from '#lib/components/layout/Footer/Footer.svelte'
    import Header from '#lib/components/layout/Header/Header.svelte'
    import BackToTop from '#lib/components/ui/Button/BackToTop.svelte'
    import Loader from '#lib/components/ui/Loader/Loader.svelte'
    import PreferencesBanner from '#lib/components/ui/PreferencesBanner/PreferencesBanner.svelte'
    import { loadDemo } from '#lib/stores/actions/demoActions.js'
    import { clearToastsOnNavigation } from '#lib/stores/actions/uiActions.js'
    import { ui } from '#lib/stores/ui.svelte.js'
    import { userPreferences } from '#lib/stores/userPreferences.svelte.js'

    // The one loader of the site, on the first opening and on every page change (rule of the sites)
    const LOADER_ENABLED = true
    // Shortest time of the loader on a page change, so it does not just blink (milliseconds)
    const LOADER_PAGE_TIME = 400
    // Longest wait of the loader on the first opening, even if the fonts are not there yet (milliseconds)
    const LOADER_FIRST_MAX_TIME = 2000
    // Length of its fade out (assets/css/components/loader.css)
    const LOADER_FADE_TIME = 450

    let { children }: { children: Snippet } = $props()
    let showLoader = $state(LOADER_ENABLED)
    let leaving = $state(false)
    let ready = false
    let shownAt = 0
    let fadeTimer: ReturnType<typeof setTimeout> | undefined
    let main: HTMLElement | undefined = $state()
    // Windows (sign-in, payment, confirmation, tour, notifications): their code loads after the first paint
    let Overlays: Component | null = $state(null)

    const hideLoader = () => {
        leaving = true
        clearTimeout(fadeTimer)
        fadeTimer = setTimeout(() => {
            showLoader = false
            leaving = false
        }, LOADER_FADE_TIME)
    }

    beforeNavigate(({ from, to, willUnload }) => {
        ui.menuOpen = false
        if (to && from?.url.pathname !== to.url.pathname) clearToastsOnNavigation()
        // Inside the admin, no loader between its pages (one at its entry only)
        const withinAdmin = Boolean(from?.url.pathname.startsWith('/admin/') && to?.url.pathname.startsWith('/admin/'))
        if (LOADER_ENABLED && ready && !willUnload && to && !withinAdmin && from?.url.pathname !== to.url.pathname) {
            clearTimeout(fadeTimer)
            leaving = false
            showLoader = true
            shownAt = Date.now()
        }
    })
    afterNavigate(() => {
        if (!ready || !showLoader) return
        setTimeout(hideLoader, Math.max(0, LOADER_PAGE_TIME - (Date.now() - shownAt)))
    })

    onMount(async () => {
        userPreferences.loadPreferences()
        // Accounts, bookings and prices of this browser (localStorage)
        loadDemo()
        void import('./Overlays.svelte').then((module) => { Overlays = module.default })
        await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, LOADER_FIRST_MAX_TIME))])
        hideLoader()
        ready = true
    })
</script>

{#if showLoader}
    <Loader {leaving} />
{/if}
<!-- Keyboard: jumps to the content (a button, no "#" address) -->
<button type="button" class="skip-link" onclick={() => main?.focus()}>Aller au contenu</button>
<div class="app-shell">
    <Header />
    <main id="content" tabindex="-1" bind:this={main}>
        {@render children()}
    </main>
    <Footer />

    <div class="floating-controls">
        <BackToTop />
    </div>

    <PreferencesBanner />
</div>
{#if Overlays}
    <Overlays />
{/if}
