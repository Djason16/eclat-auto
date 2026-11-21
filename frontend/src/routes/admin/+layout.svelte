<script lang="ts">
    import type { Snippet } from 'svelte'
    import AdminShell from '#lib/components/views/Admin/AdminShell.svelte'

    // Every admin page in the same frame (title, admin menu, sign-in check)
    let { children }: { children: Snippet } = $props()
</script>

<AdminShell>
    {@render children()}
</AdminShell>
