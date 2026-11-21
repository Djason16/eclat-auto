<script lang="ts">
    import type { Snippet } from 'svelte'
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'

    /*
     * Hero of the inner pages, built like the home hero (assets/css/components/page-hero.css): the blurred photo under the
     * dark-to-gold veil (or the dark and gold background without photo), the breadcrumb, the gold kicker, a big italic
     * title with one word in gold, a subtitle and the buttons. A little lower than the home hero.
     *   <PageHero kicker="Prestations" title="Des soins sur mesure" accent="sur mesure" photo={PHOTOS.heroOfThePage}
     *       text="..." scrollLabel="Comparer les formules" />
     * accent: the part of the title written in gold. children: other buttons, after the scroll button.
     */
    let { title, accent = '', kicker, crumb = '', photo = '', text = '', info = '', scrollLabel = '', children }: {
        title: string, accent?: string, kicker: string, crumb?: string, photo?: string, text?: string, info?: string,
        scrollLabel?: string, children?: Snippet
    } = $props()

    let hero: HTMLElement | undefined = $state()

    // A lighter copy of the photo (640 px) for phones
    const smallPhoto = $derived(photo.replace(/\.webp$/, '-640.webp'))
    // The title cut around the gold part
    const parts = $derived(accent && title.includes(accent) ? title.split(accent) : [title])

    // Brings the first block under the hero into view, under the sticky header (no "#" address)
    const scrollToContent = () => {
        const next = hero?.nextElementSibling
        if (!(next instanceof HTMLElement)) return
        const header = document.querySelector('.header')?.getBoundingClientRect().height ?? 0
        window.scrollTo({ top: next.getBoundingClientRect().top + window.scrollY - header, behavior: 'smooth' })
    }
</script>

<!-- The photo of the hero is the biggest thing of the first screen: fetched first (Lighthouse) -->
<svelte:head>
    {#if photo}
        <link rel="preload" as="image" href={smallPhoto} media="(max-width: 768px)" type="image/webp" fetchpriority="high" />
        <link rel="preload" as="image" href={photo} media="(min-width: 769px)" type="image/webp" fetchpriority="high" />
    {/if}
</svelte:head>

<section class="page-hero-block surface-dark" class:page-hero-plain={!photo} bind:this={hero}
    style:--hero-photo={photo ? `url(${photo})` : undefined} style:--hero-photo-small={photo ? `url(${smallPhoto})` : undefined}>
    <div class="page-hero">
        <nav class="page-hero-crumbs" aria-label="Fil d’Ariane">
            <a href={resolve('/')} title="Retour à l’accueil">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb || kicker}</span>
        </nav>
        <p class="kicker">{kicker}</p>
        <h1>
            {#if parts.length > 1}
                {parts[0]}<span class="page-hero-accent">{accent}</span>{parts.slice(1).join(accent)}
            {:else}
                {title}
            {/if}
        </h1>
        {#if text}
            <p class="page-hero-text">{text}</p>
        {/if}
        {#if scrollLabel || children}
            <div class="page-hero-actions">
                {#if scrollLabel}
                    <BaseButton variant="secondary" iconAfter="chevronDown" onclick={scrollToContent}>{scrollLabel}</BaseButton>
                {/if}
                {@render children?.()}
            </div>
        {/if}
        {#if info}
            <p class="page-hero-info"><strong>Information :</strong> {info}</p>
        {/if}
    </div>
</section>
