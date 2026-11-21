<script lang="ts">
    import Modal from '#lib/components/ui/Modal/Modal.svelte'

    // Window that shows a document bigger (ZoomModal of the original): account documents, admin users
    let { image, onclose }: { image: { src: string, label: string } | null, onclose: () => void } = $props()
</script>

<Modal open={Boolean(image)} title={image?.label ?? ''} {onclose}>
    {#if image}
        <img class="zoomed" src={image.src} alt={image.label} title={image.label} />
    {/if}
</Modal>

<style>
    .zoomed {
        max-width: 100%;
        max-height: 70vh;
        margin-inline: auto;
        object-fit: contain;
    }
</style>
