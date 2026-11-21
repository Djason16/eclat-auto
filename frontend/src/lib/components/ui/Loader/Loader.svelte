<script lang="ts">
    import LogoMark from '#lib/components/ui/Logo/LogoMark.svelte'

    // leaving: fades out (its no-JavaScript safety is cut meanwhile, assets/css/components/loader.css)
    let { leaving = false }: { leaving?: boolean } = $props()
</script>

<!-- The one loading screen of the site (AppShell), on the first opening and on every page change -->
<div class="loader" class:loader-leaving={leaving} role="status" aria-live="polite">
    <LogoMark class="loader-mark" />
    <p class="loader-label">Chargement</p>
    <span class="loader-line" aria-hidden="true"></span>
</div>
