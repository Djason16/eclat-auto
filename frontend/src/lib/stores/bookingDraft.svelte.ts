import type { Booking, CategoryId, Customer, PaymentMode } from '#lib/types.js'

/*
 * The booking being filled in (page /reservation/): kept while the visitor moves between pages (to sign in, for
 * example) as long as it is not finished, forgotten when the page is reloaded, once the booking is saved and the
 * visitor leaves the confirmation, and on sign-out or reset of the demo. Steps of the original: 0 kind of service, 1 service, 2 options,
 * 3 details and vehicle, 4 date and slot, 5 summary and payment. done: the booking just saved (confirmation screen).
 */
interface Draft {
    step: number
    // Kind of service chosen at step 1 ('' until chosen)
    category: CategoryId | ''
    serviceId: string
    extraIds: string[]
    vehicleId: string
    vehicleModel: string
    date: string
    slot: string
    customer: Customer
    notes: string
    payment: PaymentMode
    accepted: boolean
    done: Booking | null
}

export const emptyCustomer = (): Customer => ({ firstName: '', lastName: '', email: '', phone: '' })

export const draft: Draft = $state({
    step: 0,
    category: '',
    serviceId: '',
    extraIds: [],
    vehicleId: 'city',
    vehicleModel: '',
    date: '',
    slot: '',
    customer: emptyCustomer(),
    notes: '',
    payment: 'online',
    accepted: false,
    done: null,
})

// Starts a new booking from step 1 (the details of a signed-in customer are filled in again by the contact step)
export const resetDraft = (): void => {
    Object.assign(draft, {
        step: 0, category: '', serviceId: '', extraIds: [], vehicleId: 'city', vehicleModel: '', date: '', slot: '',
        customer: emptyCustomer(), notes: '', payment: 'online', accepted: false, done: null,
    })
}

// Another person signs in: the booking in progress keeps its choices but not the details typed by the previous one
export const forgetDraftCustomer = (): void => {
    draft.customer = emptyCustomer()
}
