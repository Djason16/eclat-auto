<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { BUSINESS } from '#lib/content/business.js'
    import { PHOTOS } from '#lib/content/photos.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { formatPrice } from '#lib/utils/format.js'
    import type { IconName } from '#lib/utils/icons.js'

    /*
     * Hero of the home page: the blurred photo under the dark-to-gold veil of the original, a big italic headline with a
     * gold word, two calls to action, the trust badges (fictive reviews, clearly said) and a black card with the
     * starting price. Built for this page only (the other pages keep PageHero).
     */
    const smallPhoto = PHOTOS.heroHome.replace(/\.webp$/, '-640.webp')
    // The best-seller of the catalog (as the admin set it), shown in the black card
    const bestSeller = $derived(demo.catalog.services.find((item) => item.id === 'complete-excellence' && item.active)
        ?? demo.catalog.services.find((item) => item.featured && item.active && !item.quoteOnly))

    const TRUST: { icon: IconName, title: string, text: string }[] = [
        { icon: 'star', title: '4,9 / 5', text: '312 avis (fictifs)' },
        { icon: 'bolt', title: 'En 2 minutes', text: 'réservation en ligne' },
        { icon: 'leaf', title: 'Produits doux', text: 'biodégradables' },
        { icon: 'shield', title: 'Satisfait', text: 'ou on recommence' },
    ]
</script>

<svelte:head>
    <link rel="preload" as="image" href={smallPhoto} media="(max-width: 768px)" type="image/webp" fetchpriority="high" />
    <link rel="preload" as="image" href={PHOTOS.heroHome} media="(min-width: 769px)" type="image/webp" fetchpriority="high" />
</svelte:head>

<section class="home-hero surface-dark" style:--hero-photo="url({PHOTOS.heroHome})" style:--hero-photo-small="url({smallPhoto})">
    <div class="home-hero-grid">
        <div class="home-hero-copy">
            <p class="kicker">Lavage et esthétique automobile · {BUSINESS.city}</p>
            <h1>Un soin qui vous suit. <span>Un éclat</span> qui vous distingue.</h1>
            <p class="home-hero-sub">
                Lavage à la main, intérieur remis à neuf, polissage et céramique : votre voiture comme au premier jour,
                réservée en deux minutes.
            </p>
            <div class="home-hero-actions">
                <BaseButton variant="secondary" href={resolve('reservation/')} title="Réserver un créneau en ligne" icon="calendar">
                    Réserver en 2 min
                </BaseButton>
                <BaseButton variant="primary" href={resolve('prestations/')} title="Voir les prestations et les tarifs" iconAfter="arrowRight">
                    Voir les prestations
                </BaseButton>
            </div>
        </div>

        {#if bestSeller}
            <aside class="home-hero-card" aria-label="Le plus choisi">
                <span class="chip chip-gold"><Icon name="sparkle" /> Le plus choisi</span>
                <p class="home-hero-card-title">{bestSeller.name}</p>
                <p class="home-hero-card-text">{bestSeller.summary}</p>
                <div class="figure">
                    <strong>dès {formatPrice(bestSeller.price)}</strong>
                    <span>prix citadine, toutes taxes comprises</span>
                </div>
            </aside>
        {/if}
    </div>

    <ul class="home-hero-trust" role="list">
        {#each TRUST as item (item.title)}
            <li>
                <span class="home-hero-trust-icon"><Icon name={item.icon} /></span>
                <span><strong>{item.title}</strong> <span class="home-hero-trust-text">{item.text}</span></span>
            </li>
        {/each}
    </ul>
</section>

<style>
    .home-hero {
        position: relative;
        isolation: isolate;
        display: grid;
        gap: var(--space-xlarge);
        padding: calc(var(--divider-height) + var(--space-xxlarge)) var(--page-gutter) var(--space-xlarge);
        overflow: hidden;
    }

    /* Photo and veil of the original */
    .home-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        background: var(--hero-photo) center / cover no-repeat;
    }

    .home-hero::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background: var(--hero-veil);
    }

    .home-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
        align-items: end;
        gap: var(--space-xlarge);
        max-width: var(--max-width);
    }

    .home-hero-copy {
        display: grid;
        gap: var(--space-normal);
        justify-items: start;
    }

    h1 {
        max-width: 18ch;
        color: var(--text-light);
        font-size: var(--font-hero);
        font-style: italic;
        line-height: 1.02;
        text-shadow: 0 4px 30px rgb(0 0 0 / 45%);
        text-transform: uppercase;
    }

    h1 span {
        color: var(--gold);
    }

    .home-hero-sub {
        max-width: 38rem;
        color: var(--text-light);
        font-size: var(--font-large);
    }

    .home-hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-small);
        margin-top: var(--space-small);
    }

    /* The black card, with a gold line on top */
    .home-hero-card {
        display: grid;
        gap: var(--space-small);
        justify-items: start;
        padding: var(--space-large);
        border-top: 3px solid var(--gold);
        background-color: rgb(12 12 12 / 88%);
        box-shadow: var(--shadow-strong);
    }

    .home-hero-card-title {
        color: var(--text-light);
        font-size: var(--font-xlarge);
        font-style: italic;
        font-weight: 700;
        text-transform: uppercase;
    }

    .home-hero-card-text {
        color: var(--grey-light);
    }

    .home-hero-trust {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--space-normal);
        max-width: var(--max-width);
        padding-top: var(--space-large);
        border-top: 1px solid rgb(255 255 255 / 18%);
        list-style: none;
    }

    .home-hero-trust li {
        display: flex;
        align-items: center;
        gap: var(--space-small);
        color: var(--text-light);
        font-size: var(--font-small);
    }

    .home-hero-trust strong {
        display: block;
        font-size: var(--font-normal);
        font-style: italic;
    }

    .home-hero-trust-text {
        color: var(--text-light);
    }

    .home-hero-trust-icon {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid var(--gold);
        color: var(--gold);
        font-size: var(--font-large);
    }

    @media (max-width: 900px) {
        .home-hero-grid {
            grid-template-columns: 1fr;
        }

        .home-hero-trust {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 768px) {
        .home-hero::before {
            background-image: var(--hero-photo-small);
        }
    }

    @media (max-width: 400px) {
        .home-hero-trust {
            grid-template-columns: 1fr;
        }
    }
</style>
