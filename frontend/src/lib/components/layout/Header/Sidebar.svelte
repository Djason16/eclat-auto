<script lang="ts">
    import { tick } from 'svelte'
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { BUSINESS } from '#lib/content/business.js'
    import { openAuth } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { ui } from '#lib/stores/ui.svelte.js'
    import type { IconName } from '#lib/utils/icons.js'

    /*
     * Phone and tablet menu: a dark panel sliding in from the right over a veil. The pages with their pictograms (the
     * current one in gold), the account part (who is signed in, Mon compte, Administration, Déconnexion), the quick
     * contacts and the "Prendre rendez-vous" button. The links appear one after the other. Escape, the veil and the cross
     * close it; the keyboard stays inside while it is open and goes back to the burger after. The page does not move:
     * only the panel scrolls (as one block) when the screen is low. It closes on every change of page (AppShell).
     */
    let { isCurrent, onsignout }: { isCurrent: (href: string) => boolean, onsignout: () => void } = $props()

    const PAGES: { href: string, label: string, title: string, icon: IconName }[] = [
        { href: resolve('/'), label: 'Accueil', title: 'Retour à l’accueil', icon: 'car' },
        { href: resolve('prestations/'), label: 'Prestations', title: 'Voir les prestations et les tarifs', icon: 'sparkle' },
        { href: resolve('professionnels/'), label: 'Professionnels', title: 'Offre pour les professionnels', icon: 'truck' },
        { href: resolve('horaires-acces/'), label: 'Horaires et accès', title: 'Voir le plan et les horaires', icon: 'pin' },
        { href: resolve('contact/'), label: 'Nous contacter', title: 'Nous contacter', icon: 'mail' },
    ]

    let panel: HTMLElement | undefined = $state()
    let closeButton: HTMLButtonElement | undefined = $state()

    $effect(() => {
        if (ui.menuOpen) void tick().then(() => closeButton?.focus())
    })

    const close = () => {
        if (!ui.menuOpen) return
        ui.menuOpen = false
        document.querySelector<HTMLElement>('.header-burger')?.focus()
    }

    // Escape closes; Tab and Shift+Tab go round inside the panel
    const onKey = (event: KeyboardEvent) => {
        if (!ui.menuOpen || !panel) return
        if (event.key === 'Escape') close()
        if (event.key !== 'Tab') return
        const items = [...panel.querySelectorAll<HTMLElement>('a, button')]
        const first = items[0]
        const last = items.at(-1)
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
        }
    }
</script>

<svelte:window onkeydown={onKey} />

<div class="sidebar-backdrop" class:open={ui.menuOpen} onclick={close} aria-hidden="true"></div>
<nav id="side-menu" class="sidebar surface-dark" class:open={ui.menuOpen} aria-label="Menu" inert={!ui.menuOpen} bind:this={panel}>
    <div class="sidebar-head">
        <p class="kicker">Menu</p>
        <button type="button" class="sidebar-close" bind:this={closeButton} onclick={close} aria-label="Fermer le menu" title="Fermer le menu">
            <Icon name="close" />
        </button>
    </div>

    <ul class="sidebar-pages" role="list">
        {#each PAGES as page, index (page.href)}
            <li style:--i={index}>
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved in PAGES -->
                <a href={page.href} title={page.title} aria-current={isCurrent(page.href) ? 'page' : undefined}>
                    <Icon name={page.icon} /><span>{page.label}</span>
                </a>
            </li>
        {/each}
    </ul>

    <div class="sidebar-account" style:--i={PAGES.length}>
        {#if demo.user}
            <p class="sidebar-user"><Icon name="user" /><span>Connecté(e) : <strong>{demo.user.firstName} {demo.user.lastName}</strong></span></p>
            <ul class="sidebar-pages" role="list">
                <li><a href={resolve('mon-espace/')} title="Ouvrir mon compte" aria-current={isCurrent(resolve('mon-espace/')) ? 'page' : undefined}><Icon name="calendar" /><span>Mon compte</span></a></li>
                {#if demo.user.role === 'admin'}
                    <li><a href={resolve('admin/')} title="Ouvrir le tableau de bord" aria-current={isCurrent(resolve('admin/')) ? 'page' : undefined}><Icon name="settings" /><span>Administration</span></a></li>
                {/if}
                <li><button type="button" class="sidebar-button" onclick={onsignout}><Icon name="logout" /><span>Déconnexion</span></button></li>
            </ul>
        {:else}
            <button type="button" class="sidebar-button" onclick={() => openAuth()}><Icon name="user" /><span>Connexion/Inscription</span></button>
        {/if}
    </div>

    <div class="sidebar-contact" style:--i={PAGES.length + 1}>
        <a href="tel:{BUSINESS.phoneLink}" title="Appeler l’atelier (numéro fictif)"><Icon name="phone" /><span>{BUSINESS.phone}</span></a>
        <a href={resolve('horaires-acces/')} title="Voir le plan et les horaires"><Icon name="pin" /><span>{BUSINESS.street}, {BUSINESS.city}</span></a>
    </div>

    <div class="sidebar-cta" style:--i={PAGES.length + 2}>
        <BaseButton variant="secondary" full href={resolve('reservation/')} title="Prendre rendez-vous en ligne" icon="calendar">Prendre rendez-vous</BaseButton>
    </div>
</nav>

<style>
    .sidebar-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background-color: rgb(0 0 0 / 55%);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--duration-reveal) var(--ease), visibility 0s linear var(--duration-reveal);
    }

    .sidebar-backdrop.open {
        opacity: 1;
        visibility: visible;
        transition: opacity var(--duration-reveal) var(--ease);
    }

    .sidebar {
        position: fixed;
        inset: 0 0 0 auto;
        z-index: 1001;
        display: grid;
        align-content: start;
        gap: var(--space-normal);
        width: min(22rem, 88vw);
        padding: var(--space-normal) var(--space-large) var(--space-large);
        overflow-y: auto;
        overscroll-behavior: contain;
        border-left: 3px solid var(--gold);
        background: var(--gold-glow), var(--black);
        box-shadow: var(--shadow-strong);
        visibility: hidden;
        transform: translateX(100%);
        transition: transform var(--duration-reveal) var(--ease), visibility 0s linear var(--duration-reveal);
    }

    .sidebar.open {
        visibility: visible;
        transform: none;
        transition: transform var(--duration-reveal) var(--ease);
    }

    .sidebar-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .sidebar-close {
        display: grid;
        place-items: center;
        width: var(--control-size);
        height: var(--control-size);
        border: 1px solid rgb(255 255 255 / 20%);
        background: none;
        color: var(--text-light);
        font-size: var(--font-large);
        cursor: pointer;
        transition: border-color var(--transition), color var(--transition);
    }

    /* The links appear one after the other once the panel is in */
    .sidebar-pages li,
    .sidebar-account,
    .sidebar-contact,
    .sidebar-cta {
        opacity: 0;
        transform: translateX(var(--space-large));
        transition: opacity var(--duration-fast) var(--ease), transform var(--duration-fast) var(--ease);
    }

    .open :is(.sidebar-pages li, .sidebar-account, .sidebar-contact, .sidebar-cta) {
        opacity: 1;
        transform: none;
        transition-delay: calc(150ms + var(--i, 0) * 60ms);
    }

    .sidebar-pages {
        display: grid;
        list-style: none;
    }

    .sidebar-pages a,
    .sidebar-button {
        display: flex;
        align-items: center;
        gap: var(--space-normal);
        width: 100%;
        min-height: var(--control-size);
        padding: var(--space-small) var(--space-normal);
        border: none;
        border-left: 3px solid transparent;
        background: none;
        color: var(--text-light);
        font-size: var(--font-large);
        font-style: italic;
        font-weight: 700;
        text-align: left;
        cursor: pointer;
        transition: border-color var(--transition), background-color var(--transition), color var(--transition);
    }

    .sidebar-pages :global(.icon),
    .sidebar-button :global(.icon),
    .sidebar-user :global(.icon),
    .sidebar-contact :global(.icon) {
        color: var(--gold);
    }

    .sidebar-pages a[aria-current="page"] {
        border-left-color: var(--gold);
        background-color: rgb(255 255 255 / 6%);
        color: var(--gold);
    }

    .sidebar-account {
        display: grid;
        gap: var(--space-small);
        padding-top: var(--space-normal);
        border-top: 1px solid rgb(255 255 255 / 14%);
    }

    .sidebar-user {
        display: flex;
        align-items: center;
        gap: var(--space-small);
        padding: 0 var(--space-normal);
        color: var(--grey-light);
        font-size: var(--font-small);
    }

    .sidebar-user strong {
        color: var(--text-light);
    }

    /* Quick contacts: compact, the icon on the first line of the text */
    .sidebar-contact {
        display: grid;
        gap: var(--space-xs);
        padding-top: var(--space-normal);
        border-top: 1px solid rgb(255 255 255 / 14%);
    }

    .sidebar-contact a {
        display: flex;
        align-items: flex-start;
        gap: var(--space-small);
        padding: var(--space-xs) var(--space-normal);
        color: var(--text-light);
        font-size: var(--font-small);
        line-height: 1.5;
    }

    .sidebar-contact a :global(.icon) {
        margin-top: calc((1lh - var(--icon-size)) / 2);
    }

    @media (hover: hover) and (pointer: fine) {
        .sidebar-close:hover {
            border-color: var(--gold);
            color: var(--gold);
        }

        .sidebar-pages a:hover,
        .sidebar-button:hover {
            border-left-color: var(--gold-medium);
            background-color: rgb(255 255 255 / 6%);
        }
    }
</style>
