<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Pagination from '#lib/components/ui/Pagination/Pagination.svelte'
    import StatusBadge from '#lib/components/ui/StatusBadge/StatusBadge.svelte'
    import { canCustomerCancel, setBookingStatus, userBookings } from '#lib/stores/actions/bookingActions.js'
    import { askConfirm, notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Booking } from '#lib/types.js'
    import { formatDate, formatHour, formatPrice } from '#lib/utils/format.js'
    import { endOfSlot } from '#lib/utils/slots.js'

    // "Mes réservations" of the original: one white box per booking, 5 per page, "Annuler la réservation" in red
    const PER_PAGE = 5
    let page = $state(1)

    const bookings = $derived(demo.user ? userBookings(demo.user.email) : [])
    const shown = $derived(bookings.slice((page - 1) * PER_PAGE, page * PER_PAGE))

    const cancel = async (booking: Booking) => {
        const confirmed = await askConfirm({
            title: 'Annuler cette réservation ?',
            text: `${booking.serviceName} le ${formatDate(booking.date)}.${booking.paid ? ' Le paiement en ligne serait remboursé (simulé).' : ''}`,
            confirmLabel: 'Annuler la réservation',
            danger: true,
        })
        if (!confirmed) return
        setBookingStatus(booking.id, 'cancelled')
        notify('Réservation annulée')
    }
</script>

<section aria-labelledby="reservations-title" class="reservations">
    <h2 id="reservations-title" class="text-xlarge" tabindex="-1">Mes réservations</h2>
    {#if bookings.length}
        <ul class="records" role="list">
            {#each shown as booking (booking.id)}
                <li class="record">
                    <p><strong>Réservation #{booking.reference}</strong></p>
                    <p><strong>Date :</strong> {formatDate(booking.date)}</p>
                    <p><strong>Horaire :</strong> {formatHour(booking.slot)} à {formatHour(endOfSlot(booking.slot, booking.slots))}</p>
                    <p><strong>Statut :</strong> <StatusBadge status={booking.status} /></p>
                    <p><strong>Montant :</strong> {formatPrice(booking.total)} {booking.paid ? '(payé)' : '(à régler sur place)'}</p>
                    <p><strong>Formule choisie :</strong> {booking.serviceName}</p>
                    {#if booking.extraNames.length}
                        <p><strong>Services supplémentaires :</strong> {booking.extraNames.join(', ')}</p>
                    {/if}
                    <p><strong>Type de véhicule :</strong> {booking.vehicleName} ({booking.vehicleModel})</p>
                    {#if canCustomerCancel(booking)}
                        <div class="record-actions">
                            <button type="button" class="record-link record-link-danger" onclick={() => cancel(booking)}>Annuler la réservation</button>
                        </div>
                    {:else if booking.status === 'pending' || booking.status === 'confirmed'}
                        <p class="text-small">Moins de 24 heures avant : appelez l’atelier pour toute modification.</p>
                    {/if}
                </li>
            {/each}
        </ul>
        <Pagination bind:page total={bookings.length} perPage={PER_PAGE} />
    {:else}
        <p>Aucune réservation trouvée.</p>
        <p><BaseButton href={resolve('reservation/')} title="Prendre rendez-vous en ligne" size="small">Prendre rendez-vous</BaseButton></p>
    {/if}
</section>

<style>
    .reservations {
        display: grid;
        gap: var(--space-normal);
    }

    .reservations h2 {
        text-transform: none;
    }

    .reservations h2:focus {
        outline: none;
    }
</style>
