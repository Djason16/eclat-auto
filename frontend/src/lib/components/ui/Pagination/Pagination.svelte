<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'

    // Pagination of the original: "Précédent", "page / pages", "Suivant" (lists of the account and of the admin)
    let { page = $bindable(1), total, perPage }: { page: number, total: number, perPage: number } = $props()

    const pages = $derived(Math.max(1, Math.ceil(total / perPage)))
</script>

{#if pages > 1}
    <nav class="pagination" aria-label="Pages">
        <BaseButton variant="primary" size="small" disabled={page <= 1} onclick={() => (page = Math.max(1, page - 1))}>Précédent</BaseButton>
        <span class="text-small" aria-live="polite">{page} / {pages}</span>
        <BaseButton size="small" disabled={page >= pages} onclick={() => (page = Math.min(pages, page + 1))}>Suivant</BaseButton>
    </nav>
{/if}

<style>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-small);
        margin-top: var(--space-large);
    }
</style>
