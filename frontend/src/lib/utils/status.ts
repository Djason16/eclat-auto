import type { BookingStatus } from '#lib/types.js'

// Labels of the booking statuses, in the order of their life
export const STATUS_LABELS: Record<BookingStatus, string> = {
    pending: 'À confirmer',
    confirmed: 'Confirmé',
    done: 'Terminé',
    cancelled: 'Annulé',
}
