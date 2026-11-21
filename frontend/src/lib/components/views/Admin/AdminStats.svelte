<script lang="ts">
    import KpiCards from '#lib/components/ui/KpiCards/KpiCards.svelte'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { addDays, formatPrice, toDateKey } from '#lib/utils/format.js'

    // Key figures of the admin: bookings to confirm, the 7 next days, turnover of the month, customers, unread messages
    const today = new Date()
    const from = toDateKey(today)
    const week = toDateKey(addDays(today, 7))
    const month = from.slice(0, 7)

    const items = $derived.by(() => {
        const active = demo.bookings.filter((item) => item.status !== 'cancelled')
        const turnover = active.filter((item) => item.date.startsWith(month)).reduce((sum, item) => sum + item.total, 0)
        return [
            { icon: 'alert' as const, value: String(demo.bookings.filter((item) => item.status === 'pending').length), label: 'À confirmer' },
            { icon: 'calendar' as const, value: String(active.filter((item) => item.date >= from && item.date <= week).length), label: '7 prochains jours' },
            { icon: 'euro' as const, value: formatPrice(turnover), label: 'Chiffre du mois', hint: 'hors annulations' },
            { icon: 'user' as const, value: String(demo.accounts.filter((item) => item.role === 'customer').length), label: 'Clients' },
            { icon: 'message' as const, value: String(demo.messages.filter((item) => !item.read).length), label: 'Messages non lus' },
        ]
    })
</script>

<KpiCards label="Chiffres clés" {items} />
