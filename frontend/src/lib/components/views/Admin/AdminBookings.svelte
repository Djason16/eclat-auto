<script lang="ts">
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import Pagination from '#lib/components/ui/Pagination/Pagination.svelte'
    import StatusBadge from '#lib/components/ui/StatusBadge/StatusBadge.svelte'
    import { setBookingStatus } from '#lib/stores/actions/bookingActions.js'
    import { askConfirm, notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Booking, BookingStatus } from '#lib/types.js'
    import { formatDate, formatHour, formatPrice } from '#lib/utils/format.js'
    import { endOfSlot } from '#lib/utils/slots.js'
    import { STATUS_LABELS } from '#lib/utils/status.js'

    /*
     * "Liste des réservations" of the original: a search field, then one white box per booking with every detail and
     * "Renvoyer la confirmation". Improved: a status filter, the status actions (confirm, done, cancel), newest first.
     */
    const PER_PAGE = 5
    let search = $state('')
    let status = $state('all')
    let page = $state(1)

    const list = $derived.by(() => {
        const words = search.trim().toLowerCase()
        return demo.bookings
            .filter((item) => status === 'all' || item.status === status)
            .filter((item) => !words || [item.reference, item.customer.firstName, item.customer.lastName, item.customer.email, item.serviceName, item.date, formatDate(item.date)]
                .join(' ').toLowerCase().includes(words))
            .sort((a, b) => `${b.date}${b.slot}`.localeCompare(`${a.date}${a.slot}`))
    })
    const shown = $derived(list.slice((page - 1) * PER_PAGE, page * PER_PAGE))
    // Status filters as chips, with the number of bookings of each status
    const FILTERS = $derived([
        { value: 'all', label: 'Toutes', count: demo.bookings.length },
        ...Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label, count: demo.bookings.filter((item) => item.status === value).length })),
    ])

    // A new search or filter goes back to the first page
    $effect(() => {
        void search
        void status
        page = 1
    })

    const change = async (booking: Booking, next: BookingStatus) => {
        if (next === 'cancelled' && !(await askConfirm({
            title: `Annuler la réservation #${booking.reference} ?`,
            text: `Le créneau de ${booking.customer.firstName} ${booking.customer.lastName} sera libéré.`,
            confirmLabel: 'Annuler la réservation',
            danger: true,
        }))) return
        setBookingStatus(booking.id, next)
        notify(`Réservation #${booking.reference} : ${STATUS_LABELS[next].toLowerCase()}`)
    }

    const resend = (booking: Booking) => notify(`Démonstration : la confirmation serait renvoyée à ${booking.customer.email}.`, 'info')
</script>

<h2 class="admin-title">Liste des réservations</h2>
<p class="admin-intro">Consultez et gérez chaque réservation : le service choisi, le client, le créneau et le paiement.</p>
<div class="filter-chips" role="group" aria-label="Filtrer par statut">
    {#each FILTERS as filter (filter.value)}
        <button type="button" class="filter-chip" aria-pressed={status === filter.value} onclick={() => (status = filter.value)}>
            {filter.label}&#32;<span class="count-badge">{filter.count}</span>
        </button>
    {/each}
</div>
<div class="mb-m">
    <FormField label="Rechercher une réservation" name="booking-search" type="search" bind:value={search}
        placeholder="Entrez un nom, un e-mail, un service ou une date..." />
</div>
<p class="text-small mb-s" aria-live="polite">{list.length} réservation{list.length > 1 ? 's' : ''}</p>

{#if shown.length}
    <ul class="records" role="list">
        {#each shown as booking (booking.id)}
            <li class="record">
                <p><strong>{booking.customer.firstName} {booking.customer.lastName}</strong> · Réservation #{booking.reference}&#32;<StatusBadge status={booking.status} /></p>
                <p><strong>Numéro de téléphone :</strong> <a class="text-link" href="tel:{booking.customer.phone}" title="Appeler le client">{booking.customer.phone}</a></p>
                <p><strong>Adresse e-mail :</strong> <a class="text-link" href="mailto:{booking.customer.email}" title="Écrire au client">{booking.customer.email}</a></p>
                <p><strong>Formule choisie :</strong> {booking.serviceName}</p>
                {#if booking.extraNames.length}
                    <p><strong>Services supplémentaires :</strong> {booking.extraNames.join(', ')}</p>
                {/if}
                <p><strong>Type de véhicule :</strong> {booking.vehicleName} ({booking.vehicleModel})</p>
                <p><strong>Date :</strong> {formatDate(booking.date)}</p>
                <p><strong>Heure :</strong> {formatHour(booking.slot)} à {formatHour(endOfSlot(booking.slot, booking.slots))}</p>
                <p><strong>Montant :</strong> {formatPrice(booking.total)} {booking.paid ? '(payé)' : '(à régler sur place)'}</p>
                {#if booking.notes}
                    <p><strong>Précisions :</strong> {booking.notes}</p>
                {/if}
                <div class="record-actions">
                    {#if booking.status === 'pending'}
                        <button type="button" class="record-link" onclick={() => change(booking, 'confirmed')}>Confirmer</button>
                    {/if}
                    {#if booking.status === 'confirmed'}
                        <button type="button" class="record-link" onclick={() => change(booking, 'done')}>Marquer terminée</button>
                    {/if}
                    {#if booking.status === 'pending' || booking.status === 'confirmed'}
                        <button type="button" class="record-link record-link-danger" onclick={() => change(booking, 'cancelled')}>Annuler</button>
                    {/if}
                    <button type="button" class="record-link" onclick={() => resend(booking)}>Renvoyer la confirmation</button>
                </div>
            </li>
        {/each}
    </ul>
    <Pagination bind:page total={list.length} perPage={PER_PAGE} />
{:else}
    <p class="empty-state">Aucune réservation ne correspond à cette recherche.</p>
{/if}
