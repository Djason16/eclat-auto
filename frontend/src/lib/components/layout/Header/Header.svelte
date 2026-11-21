<script lang="ts">
    import { afterNavigate, goto } from '$app/navigation'
    import { resolve } from '$app/paths'
    import { page } from '$app/state'
    import DemoBanner from '#lib/components/ui/Overlays/DemoBanner.svelte'
    import ShapeDivider from '#lib/components/ui/ShapeDivider/ShapeDivider.svelte'
    import { BUSINESS } from '#lib/content/business.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { logout } from '#lib/stores/actions/sessionActions.js'
    import { notify, openAuth } from '#lib/stores/actions/uiActions.js'
    import { ui } from '#lib/stores/ui.svelte.js'
    import Sidebar from './Sidebar.svelte'

    /*
     * Links of the menu, in the order of the original. Signed out: "Connexion/Inscription" opens the sign-in window.
     * Signed in: "Mon compte" and "Déconnexion" (and, for the admin, "Administration").
     */
    const links = $derived([
        { href: resolve('/'), label: 'Accueil', title: 'Retour à l’accueil' },
        { href: resolve('prestations/'), label: 'Prestations', title: 'Voir les prestations et les tarifs' },
        { href: resolve('reservation/'), label: 'Rendez-vous', title: 'Prendre rendez-vous en ligne', cta: true },
        { href: resolve('contact/'), label: 'Nous contacter', title: 'Nous contacter' },
        ...(demo.user ? [{ href: resolve('mon-espace/'), label: 'Mon compte', title: 'Ouvrir mon compte' }] : []),
        ...(demo.user?.role === 'admin' ? [{ href: resolve('admin/'), label: 'Administration', title: 'Ouvrir le tableau de bord' }] : []),
    ])

    const signOut = async () => {
        logout()
        notify('Vous êtes déconnecté(e)', 'success', { survive: true })
        await goto(resolve('/'))
    }

    const isCurrent = (href: string) => page.url.pathname === href || (href !== resolve('/') && page.url.pathname.startsWith(href))

    // Translucent bar once the page scrolls, like the original
    let scrollY = $state(0)

    /*
     * Reading progress bar (header.css): browsers without scroll-driven animations get its width from here, once per
     * frame at most (0 to 1 = part of the page scrolled; 0 when the page is too short to scroll)
     */
    let header: HTMLElement | undefined = $state()
    let frame = 0
    const progress = () => {
        frame = 0
        const room = document.documentElement.scrollHeight - window.innerHeight
        header?.style.setProperty('--scroll-progress', String(room > 0 ? Math.min(1, window.scrollY / room) : 0))
    }
    const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(progress)
    }
    const fallback = typeof CSS !== 'undefined' && !CSS.supports('animation-timeline: scroll()')
    afterNavigate(() => {
        if (fallback) progress()
    })
</script>

<svelte:window bind:scrollY onscroll={fallback ? onScroll : undefined} onresize={fallback ? onScroll : undefined} />

<header class="header" class:scrolled={scrollY > 40} bind:this={header}>
    <DemoBanner />
    <div class="header-bar">
        <!-- The text logo of the original: the name in bold italic capitals, the tagline under it -->
        <a href={resolve('/')} class="header-logo" title="Éclat Auto, retour à l’accueil">
            <span class="header-name">{BUSINESS.name}</span>
            <span class="header-tagline">{BUSINESS.tagline}</span>
        </a>

        <nav class="header-nav" aria-label="Menu principal">
            <ul class="header-links">
                {#each links as link (link.href)}
                    <li>
                        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved in links -->
                        <a href={link.href} title={link.title} class:header-cta={'cta' in link} aria-current={isCurrent(link.href) ? 'page' : undefined}>{link.label}</a>
                    </li>
                {/each}
                <li>
                    {#if demo.user}
                        <button type="button" class="header-link-button" onclick={signOut}>Déconnexion</button>
                    {:else}
                        <button type="button" class="header-link-button" onclick={() => openAuth()}>Connexion/Inscription</button>
                    {/if}
                </li>
            </ul>
        </nav>

        <button type="button" class="header-burger" class:open={ui.menuOpen} aria-expanded={ui.menuOpen} aria-controls="side-menu"
            aria-label={ui.menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} title="Menu" onclick={() => (ui.menuOpen = !ui.menuOpen)}>
            <span></span><span></span><span></span>
        </button>
    </div>
</header>
<ShapeDivider direction="down" />
<Sidebar {isCurrent} onsignout={signOut} />
