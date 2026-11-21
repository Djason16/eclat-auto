<script lang="ts">
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * Head of a premium section (assets/css/components/premium.css): gold kicker, big italic title, short text.
     *   <SectionHead kicker="Comment ça marche" title="Quatre étapes" text="..." center />
     */
    let { kicker, title, text = '', center = false, id }: { kicker: string, title: string, text?: string, center?: boolean, id?: string } = $props()
</script>

<header class="section-head reveal" class:center use:reveal>
    <p class="kicker">{kicker}</p>
    <h2 {id}>{title}</h2>
    {#if text}
        <p>{text}</p>
    {/if}
</header>
