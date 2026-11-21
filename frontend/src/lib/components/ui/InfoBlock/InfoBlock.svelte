<script lang="ts">
    import type { Snippet } from 'svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import type { IconName } from '#lib/utils/icons.js'
    import { lazyBackground } from '#lib/utils/lazyBackground.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * Information block (black, from the original "info" blocks): the photo in a framed panel next to the text, a gold
     * kicker, a big italic title, a short text, key points with their pictograms and the buttons. "reverse" puts the
     * photo on the right; without a photo, the text is centred in a single column. Stacked on a phone.
     *   <InfoBlock photo={PHOTOS.x} kicker="Professionnels" title="Des solutions sur mesure" text="..."
     *       points={[{ icon: 'truck', text: 'Flottes' }]}>{#snippet actions()}<BaseButton ... />{/snippet}</InfoBlock>
     */
    let { photo = '', kicker, title, text = '', points = [], reverse = false, actions, children }: {
        photo?: string, kicker: string, title: string, text?: string, points?: { icon: IconName, text: string }[],
        reverse?: boolean, actions?: Snippet, children?: Snippet
    } = $props()
</script>

<section class="info-block surface-dark" class:info-block-reverse={reverse} class:info-block-single={!photo}>
    <div class="container info-block-grid">
        {#if photo}
            <div class="info-block-photo reveal" use:reveal use:lazyBackground={photo} aria-hidden="true"></div>
        {/if}
        <div class="info-block-content reveal" use:reveal={1}>
            <p class="kicker">{kicker}</p>
            <h2>{title}</h2>
            {#if text}
                <p class="info-block-text">{text}</p>
            {/if}
            {#if points.length}
                <ul class="info-block-points" role="list">
                    {#each points as point (point.text)}
                        <li><span class="info-block-icon"><Icon name={point.icon} /></span> <span>{point.text}</span></li>
                    {/each}
                </ul>
            {/if}
            {@render children?.()}
            {#if actions}
                <div class="info-block-actions">{@render actions()}</div>
            {/if}
        </div>
    </div>
</section>
