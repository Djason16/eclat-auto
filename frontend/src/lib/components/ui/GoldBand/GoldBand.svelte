<script lang="ts">
    // Gold title band of the original (CustomHeadingH2), opening each part of a page (assets/css/components/section-layout.css)
    let { title, id }: { title: string, id?: string } = $props()
</script>

<h2 class="gold-band" {id}>{title}</h2>
