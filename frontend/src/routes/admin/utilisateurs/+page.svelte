<script lang="ts">
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import AuthGate from '#lib/components/views/Account/AuthGate.svelte'
    import AdminUsers from '#lib/components/views/Admin/AdminUsers.svelte'
</script>

<Seo pageKey="adminUsers" />
<AuthGate role="admin">
    <AdminUsers />
</AuthGate>
