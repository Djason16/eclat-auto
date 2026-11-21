<script lang="ts">
    import '#lib/assets/css/main.css'
    import type { Snippet } from 'svelte'
    import AppShell from '#lib/components/layout/AppShell/AppShell.svelte'

    // Root of the site: every page inside the AppShell (src/lib/components/layout/AppShell)
    let { children }: { children: Snippet } = $props()
</script>

<svelte:head>
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#0c0c0c" />
    <!-- Font of the titles seen on the first screen: preloaded, the titles do not change size when it arrives -->
    <link rel="preload" href="/fonts/Montserrat-700-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<AppShell>
    {@render children()}
</AppShell>
