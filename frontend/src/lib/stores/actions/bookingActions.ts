import { newId } from '#lib/demo/storage.js'
import { persist, simulateLatency } from '#lib/stores/actions/demoActions.js'
import type { Result } from '#lib/stores/actions/sessionActions.js'
import { demo } from '#lib/stores/demo.svelte.js'
import type { Booking, BookingStatus, Customer, PaymentMode } from '#lib/types.js'
import { freeStarts, slotsNeeded } from '#lib/utils/slots.js'
import { hasErrors, validateCustomer, validateVehicleModel } from '#lib/utils/validation.js'

export interface BookingRequest {
    serviceId: string
    extraIds: string[]
    vehicleId: string
    vehicleModel: string
    date: string
    slot: string
    customer: Customer
    notes: string
    payment: PaymentMode
}

// Price and length of a request, from the current catalog (the admin may have changed it)
export const quote = (request: Pick<BookingRequest, 'serviceId' | 'extraIds' | 'vehicleId'>) => {
    const service = demo.catalog.services.find((item) => item.id === request.serviceId)
    const extras = demo.catalog.extras.filter((item) => request.extraIds.includes(item.id))
    const vehicle = demo.catalog.vehicles.find((item) => item.id === request.vehicleId)
    const duration = (service?.duration ?? 0) + extras.reduce((sum, extra) => sum + extra.duration, 0)
    const total = (service?.price ?? 0) + extras.reduce((sum, extra) => sum + extra.price, 0) + (vehicle?.surcharge ?? 0)
    return { service, extras, vehicle, duration, slots: slotsNeeded(duration), total }
}

const nextReference = (): string => {
    const year = new Date().getFullYear()
    const numbers = demo.bookings.map((booking) => Number(booking.reference.split('-')[2] ?? 0))
    return `EA-${year}-${String(Math.max(100, ...numbers) + 1).padStart(4, '0')}`
}

// Saves a booking after the same checks as a real API: service, slot still free, customer details
export const createBooking = async (request: BookingRequest, paid: boolean): Promise<Result & { booking?: Booking }> => {
    const { service, extras, vehicle, duration, slots, total } = quote(request)
    if (!service?.active || !vehicle) return { success: false, message: 'Cette prestation n’est plus disponible' }
    const errors = { ...validateCustomer(request.customer), vehicleModel: validateVehicleModel(request.vehicleModel) }
    if (hasErrors(errors)) return { success: false, errors, message: 'Vérifiez vos informations' }
    if (!freeStarts(demo.availability, demo.bookings, request.date, slots).includes(request.slot)) {
        return { success: false, message: 'Ce créneau vient d’être pris : choisissez-en un autre' }
    }
    await simulateLatency()
    const booking: Booking = {
        id: `bk-${newId()}`,
        reference: nextReference(),
        serviceId: service.id, serviceName: service.name,
        extraIds: extras.map((extra) => extra.id), extraNames: extras.map((extra) => extra.name),
        vehicleId: vehicle.id, vehicleName: vehicle.name, vehicleModel: request.vehicleModel.trim(),
        date: request.date, slot: request.slot, duration, slots,
        customer: { ...request.customer, email: request.customer.email.trim() },
        notes: request.notes.trim(),
        total, payment: request.payment, paid,
        // Paid online: confirmed at once; paid on site: the workshop confirms it from the admin
        status: paid ? 'confirmed' : 'pending',
        createdAt: new Date().toISOString(),
    }
    demo.bookings = [...demo.bookings, booking]
    persist.bookings()
    return { success: true, booking }
}

export const setBookingStatus = (id: string, status: BookingStatus): void => {
    demo.bookings = demo.bookings.map((booking) =>
        booking.id === id ? { ...booking, status, paid: booking.paid || status === 'done' } : booking)
    persist.bookings()
}

// A customer can cancel up to 24 hours before the slot
export const canCustomerCancel = (booking: Booking, now = new Date()): boolean => {
    if (booking.status !== 'pending' && booking.status !== 'confirmed') return false
    const [hours = 0, minutes = 0] = booking.slot.split(':').map(Number)
    const start = new Date(`${booking.date}T00:00:00`)
    start.setHours(hours, minutes)
    return start.getTime() - now.getTime() > 24 * 3600 * 1000
}

export const userBookings = (email: string): Booking[] =>
    demo.bookings
        .filter((booking) => booking.customer.email.toLowerCase() === email.toLowerCase())
        .sort((a, b) => `${b.date}${b.slot}`.localeCompare(`${a.date}${a.slot}`))
