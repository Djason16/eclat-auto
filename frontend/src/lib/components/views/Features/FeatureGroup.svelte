<script lang="ts">
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import PageSection from '#lib/components/ui/PageSection/PageSection.svelte'
    import type { FeatureGroup, FeatureLink } from '#lib/content/features.js'
    import { openAuth } from '#lib/stores/actions/uiActions.js'
    import { userPreferences } from '#lib/stores/userPreferences.svelte.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * One area of the page "Ce que comprend ce site": its head, then a row of aligned cards (pictogram, title, sentence,
     * way to the screen). The way is a link, or a button that opens the sign-in window or the cookie settings.
     */
    let { group, tone = 'light' }: { group: FeatureGroup, tone?: 'light' | 'white' } = $props()

    // Every card of the row has the same parts: 4 with a way to the screen, 3 without (quality)
    const rows = $derived(group.items.some((item) => item.link) ? 4 : 3)
    // Four cards stay on one row; three or six go three by three (never a row of four then a lonely pair)
    const cardMin = $derived(group.items.length === 4 ? '15rem' : '20rem')

    const run = (link: FeatureLink) => {
        if (link.action === 'auth') openAuth()
        else if (link.action === 'cookies') userPreferences.openSettings()
    }
</script>

<PageSection id="features-{group.id}" kicker={group.kicker} title={group.title} text={group.text} center {tone}>
    <ul class="feature-grid aligned-cards" role="list" style:--card-rows={rows} style:--card-min={cardMin}>
        {#each group.items as item, index (item.title)}
            <li class="premium-card aligned-card feature-card reveal" use:reveal={index}>
                <span class="picto"><Icon name={item.icon} /></span>
                <h3 class="card-title">{item.title}</h3>
                <p>{item.text}</p>
                {#if item.link?.href}
                    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved in content/features.ts -->
                    <a class="icon-link" href={item.link.href} title={item.link.title}><span>{item.link.label}</span><Icon name="arrowRight" /></a>
                {:else if item.link}
                    {@const link = item.link}
                    <button type="button" class="icon-link feature-action" title={link.title} onclick={() => run(link)}>
                        <span>{link.label}</span><Icon name="arrowRight" />
                    </button>
                {/if}
            </li>
        {/each}
    </ul>
</PageSection>

<style>
    .feature-grid {
        list-style: none;
    }

    /* On a white section, the cards take the light grey (like the benefits of the professionals page) */
    :global(.section-white) .feature-card {
        background-color: var(--light);
    }

    /* The way to the screen keeps its own width, at the bottom of the card */
    .feature-card > :last-child:not(p) {
        justify-self: start;
    }

    p {
        color: var(--text-color-muted);
    }

    /* The buttons of a card look like its links */
    .feature-action {
        padding: 0;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
    }
</style>
