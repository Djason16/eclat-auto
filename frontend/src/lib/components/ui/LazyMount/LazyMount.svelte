<script lang="ts" generics="Props extends Record<string, unknown>">
    import { onMount, type Component } from 'svelte'

    /*
     * Loads a heavy component (forms, booking) once the page is shown, so the first screen appears faster (Lighthouse).
     * Until then, a loading line of the given height keeps the place (no layout shift).
     *   <LazyMount load={() => import('./MessageForm.svelte')} props={{ kind: 'fleet' }} label="Chargement du formulaire" />
     */
    let { load, props, label, height = '30rem' }: {
        load: () => Promise<{ default: Component<Props> }>, props: Props, label: string, height?: string
    } = $props()

    let Loaded: Component<Props> | null = $state(null)

    /*
     * Loaded once the page has finished loading and the browser is idle: its code never competes with the first screen
     * (hero photo, fonts), so the largest paint comes first (Lighthouse)
     */
    onMount(() => {
        let cancelled = false
        const start = () => {
            if (cancelled) return
            void load().then((module) => { if (!cancelled) Loaded = module.default })
        }
        const whenIdle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 200))
        if (document.readyState === 'complete') whenIdle()
        else window.addEventListener('load', whenIdle, { once: true })
        return () => {
            cancelled = true
            window.removeEventListener('load', whenIdle)
        }
    })
</script>

{#if Loaded}
    <Loaded {...props} />
{:else}
    <p class="loading-state lazy-mount" style:min-height={height}>{label}...</p>
{/if}

<style>
    .lazy-mount {
        align-items: flex-start;
    }
</style>
