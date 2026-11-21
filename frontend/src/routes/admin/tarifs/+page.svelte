<script lang="ts">
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import AuthGate from '#lib/components/views/Account/AuthGate.svelte'
    import AdminCatalog from '#lib/components/views/Admin/AdminCatalog.svelte'
</script>

<Seo pageKey="adminCatalog" />
<AuthGate role="admin">
    <AdminCatalog />
</AuthGate>
