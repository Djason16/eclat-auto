<script lang="ts">
    import KpiCards from '#lib/components/ui/KpiCards/KpiCards.svelte'
    import { userBookings } from '#lib/stores/actions/bookingActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { formatDate, formatHour, formatPrice, toDateKey } from '#lib/utils/format.js'

    // Dashboard of the customer: next appointment, appointments to come, visits done, amount spent (from this browser)
    const today = toDateKey(new Date())
    const bookings = $derived(demo.user ? userBookings(demo.user.email) : [])
    const coming = $derived(bookings.filter((item) => (item.status === 'pending' || item.status === 'confirmed') && item.date >= today)
        .sort((a, b) => `${a.date}${a.slot}`.localeCompare(`${b.date}${b.slot}`)))
    const next = $derived(coming[0])
    const done = $derived(bookings.filter((item) => item.status === 'done'))
    const spent = $derived(bookings.filter((item) => item.status === 'done' || item.paid).reduce((sum, item) => sum + item.total, 0))

    const items = $derived([
        { icon: 'calendar' as const, value: next ? formatDate(next.date, false) : 'Aucun', label: 'Prochain rendez-vous', hint: next ? `${formatHour(next.slot)} · ${next.serviceName}` : 'Réservez en deux minutes' },
        { icon: 'clock' as const, value: String(coming.length), label: 'À venir' },
        { icon: 'sparkle' as const, value: String(done.length), label: 'Soins réalisés' },
        { icon: 'euro' as const, value: formatPrice(spent), label: 'Total réglé' },
    ])
</script>

<KpiCards label="Votre tableau de bord" {items} />
