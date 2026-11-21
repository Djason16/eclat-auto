<script lang="ts">
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import AuthGate from '#lib/components/views/Account/AuthGate.svelte'
    import AdminMessages from '#lib/components/views/Admin/AdminMessages.svelte'
</script>

<Seo pageKey="adminMessages" />
<AuthGate role="admin">
    <AdminMessages />
</AuthGate>
