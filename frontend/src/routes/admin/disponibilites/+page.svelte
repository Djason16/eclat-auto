<script lang="ts">
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import AuthGate from '#lib/components/views/Account/AuthGate.svelte'
    import AdminCalendar from '#lib/components/views/Admin/AdminCalendar.svelte'
    import AdminWeekHours from '#lib/components/views/Admin/AdminWeekHours.svelte'
</script>

<Seo pageKey="adminSlots" />
<AuthGate role="admin">
    <div class="stack gap-l">
        <AdminCalendar />
        <AdminWeekHours />
    </div>
</AuthGate>
