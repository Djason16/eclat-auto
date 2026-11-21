<script lang="ts">
    import type { Snippet } from 'svelte'
    import { resolve } from '$app/paths'
    import { page } from '$app/state'
    import GoldBand from '#lib/components/ui/GoldBand/GoldBand.svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import { demo } from '#lib/stores/demo.svelte.js'
    import AdminStats from './AdminStats.svelte'

    /*
     * Frame of the admin, like the original "tableau-admin": the hero, the gold band, the centered tabs in bold capitals
     * (gold under the active one), the content of the tab, then the dark "Administration du site" block. Each tab has its
     * own address; moving between them keeps the scroll position (data-sveltekit-reset="false").
     */
    let { children }: { children: Snippet } = $props()

    const unread = $derived(demo.messages.filter((item) => !item.read).length)
    const pending = $derived(demo.bookings.filter((item) => item.status === 'pending').length)

    const TABS = $derived([
        { href: resolve('admin/utilisateurs/'), label: 'Utilisateurs', title: 'Gérer les utilisateurs', count: 0 },
        { href: resolve('admin/disponibilites/'), label: 'Calendrier', title: 'Gérer les disponibilités', count: 0 },
        { href: resolve('admin/'), label: 'Réservations', title: 'Gérer les réservations', count: pending },
        { href: resolve('admin/tarifs/'), label: 'Tarifs', title: 'Modifier les prix et les durées', count: 0 },
        { href: resolve('admin/messages/'), label: 'Messages', title: 'Lire les messages reçus', count: unread },
    ])
</script>

<PageHero kicker="Administration" title="Le tableau de bord de l’atelier" accent="l’atelier"
    text="Réservations, disponibilités, tarifs, utilisateurs et messages." scrollLabel="Accéder aux outils" />
<GoldBand title="Admin plateforme" />
<section class="section">
    <div class="container">
        {#if demo.user?.role === 'admin'}
            <AdminStats />
        {/if}
        <nav class="admin-tabs" aria-label="Outils de l’administration">
            <ul role="list">
                {#each TABS as tab (tab.href)}
                    <li>
                        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved in TABS -->
                        <a href={tab.href} title={tab.title} data-sveltekit-reset="false" aria-current={page.url.pathname === tab.href ? 'page' : undefined}>
                            {tab.label}&#32;{#if tab.count}<span class="count-badge">{tab.count}<span class="visually-hidden">&#32;en attente</span></span>{/if}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        <div class="admin-content">
            {@render children()}
        </div>
    </div>
</section>
<InfoBlock kicker="Démonstration" title="Administration du site"
    text="Utilisateurs, disponibilités, réservations, tarifs et messages : tout se gère ici, et tout reste dans votre navigateur." />

<style>
    .admin-tabs ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-small) var(--space-large);
        margin-bottom: var(--space-large);
    }

    .admin-tabs a {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs);
        border-bottom: 3px solid transparent;
        color: var(--black);
        font-size: var(--font-normal);
        font-style: normal;
        font-weight: 700;
        text-transform: uppercase;
        transition: border-color var(--transition), color var(--transition);
    }

    .admin-tabs a[aria-current="page"] {
        border-color: var(--gold);
        color: var(--gold-dark);
    }

    @media (hover: hover) and (pointer: fine) {
        .admin-tabs a:hover {
            color: var(--gold-dark);
        }
    }

    .admin-content {
        animation: tab-in var(--duration-fast) var(--ease);
    }

    .admin-content :global(.admin-title) {
        margin-bottom: var(--space-medium);
        font-size: var(--font-large);
        text-transform: none;
    }

    .admin-content :global(.admin-intro) {
        margin-bottom: var(--space-normal);
    }

    @keyframes tab-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>
