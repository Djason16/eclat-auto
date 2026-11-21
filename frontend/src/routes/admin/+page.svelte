<script lang="ts">
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import AuthGate from '#lib/components/views/Account/AuthGate.svelte'
    import AdminBookings from '#lib/components/views/Admin/AdminBookings.svelte'
</script>

<Seo pageKey="admin" />
<AuthGate role="admin">
    <AdminBookings />
</AuthGate>
