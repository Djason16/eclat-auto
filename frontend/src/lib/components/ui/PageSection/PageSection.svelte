<script lang="ts">
    import type { Snippet } from 'svelte'
    import SectionHead from '#lib/components/ui/SectionHead/SectionHead.svelte'

    /*
     * A section of a page with its head (gold kicker, big italic title, short text) and its content in the container.
     * tone: "light" (light grey, the default), "white", or "dark" (black with the soft gold glow).
     *   <PageSection id="plans-title" kicker="Formules pros" title="..." text="..." center tone="white">...</PageSection>
     */
    let { id, kicker, title, text = '', center = false, tone = 'light', children }: {
        id: string, kicker: string, title: string, text?: string, center?: boolean, tone?: 'light' | 'white' | 'dark', children: Snippet
    } = $props()
</script>

<section class="section" class:section-white={tone === 'white'} class:surface-dark={tone === 'dark'} class:texture-dark={tone === 'dark'}
    aria-labelledby={id}>
    <div class="container">
        <SectionHead {id} {kicker} {title} {text} {center} />
        {@render children()}
    </div>
</section>
