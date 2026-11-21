<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Modal from '#lib/components/ui/Modal/Modal.svelte'
    import { toggleBlockedSlot, toggleClosedDate } from '#lib/stores/actions/adminActions.js'
    import { notify } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import { formatDate, formatHour } from '#lib/utils/format.js'
    import { daySlots, endOfSlot } from '#lib/utils/slots.js'

    /*
     * "Disponibilités pour le ..." window of the original: one row per slot, green when free, red when not; a click
     * opens or closes it. Improved: the slots taken by a booking show its customer and cannot be closed, and the whole
     * day can be closed in one click.
     */
    let { date, onclose }: { date: string, onclose: () => void } = $props()

    const closedDay = $derived(demo.availability.closedDates.includes(date))
    const slots = $derived(date ? daySlots({ ...demo.availability, closedDates: [] }, date) : [])
    const blocked = $derived(demo.availability.blockedSlots[date] ?? [])

    // The booking that covers a slot of the day, if any
    const bookingAt = (slot: string) => demo.bookings.find((item) => {
        if (item.date !== date || item.status === 'cancelled') return false
        const first = slots.indexOf(item.slot)
        return first >= 0 && slots.slice(first, first + item.slots).includes(slot)
    })

    const toggleDay = () => {
        toggleClosedDate(date)
        notify(closedDay ? 'Journée fermée aux réservations' : 'Journée rouverte aux réservations')
    }
</script>

<Modal open={Boolean(date)} title="Disponibilités pour le {date ? formatDate(date) : ''}" {onclose}>
    {#if date}
        <ul class="slots" role="list">
            {#each slots as slot (slot)}
                {@const booking = bookingAt(slot)}
                {@const free = !booking && !blocked.includes(slot) && !closedDay}
                <li>
                    <button type="button" class="slot" class:free disabled={Boolean(booking) || closedDay} onclick={() => toggleBlockedSlot(date, slot)}
                        aria-pressed={!free}>
                        {formatHour(slot)} - {formatHour(endOfSlot(slot, 1))} : {booking ? `réservé (${booking.customer.firstName} ${booking.customer.lastName[0]}.)` : free ? 'Disponible' : 'Indisponible'}
                    </button>
                </li>
            {/each}
        </ul>
        <div class="modal-actions">
            <BaseButton variant={closedDay ? 'tertiary' : 'danger'} size="small" onclick={toggleDay}>
                {closedDay ? 'Rouvrir la journée' : 'Fermer toute la journée'}
            </BaseButton>
        </div>
    {/if}
</Modal>

<style>
    .slots {
        display: grid;
        gap: var(--space-xs);
    }

    .slot {
        width: 100%;
        padding: var(--space-small);
        border: none;
        background-color: var(--danger);
        color: var(--white);
        font-size: var(--font-normal);
        font-style: normal;
        text-align: left;
        text-transform: uppercase;
        cursor: pointer;
        transition: filter var(--transition);
    }

    .slot.free {
        background-color: var(--success);
    }

    .slot:disabled {
        background-color: var(--grey);
        cursor: not-allowed;
    }

    @media (hover: hover) and (pointer: fine) {
        .slot:not(:disabled):hover {
            filter: brightness(1.12);
        }
    }
</style>
