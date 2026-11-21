<script lang="ts">
    import type { Component } from 'svelte'
    import GoldBand from '#lib/components/ui/GoldBand/GoldBand.svelte'

    /*
     * The blocks of a page, in order, in the layout of the original (assets/css/components/section-layout.css).
     * An item is a component, or { component, band, tone }:
     *   band  a gold title band shown above the block
     *   tone  "light" (light grey, the default), "white", "dark" (black, full width, the component draws its own blocks)
     */
    type Tone = 'light' | 'white' | 'dark'
    type Item = Component | { component: Component, band?: string, tone?: Tone }
    let { sections }: { sections: Item[] } = $props()

    const items = $derived(sections.map((item) => (typeof item === 'function' ? { component: item, band: undefined, tone: undefined } : item)))
</script>

{#each items as item, index (index)}
    {#if item.band}
        <GoldBand title={item.band} />
    {/if}
    {#if item.tone === 'dark'}
        <item.component />
    {:else}
        <section class="section" class:section-white={item.tone === 'white'}>
            <div class="container">
                <item.component />
            </div>
        </section>
    {/if}
{/each}
