import { newId } from '#lib/demo/storage.js'
import { persist, simulateLatency } from '#lib/stores/actions/demoActions.js'
import type { Result } from '#lib/stores/actions/sessionActions.js'
import { demo } from '#lib/stores/demo.svelte.js'
import type { DayHours, Extra, Message, MessageKind, Role, Service, VehicleSize } from '#lib/types.js'
import { hasErrors, validateMessage } from '#lib/utils/validation.js'

// Catalog edits of the admin: price (cents), length (minutes) and visibility, saved in this browser
export const updateService = (id: string, changes: Partial<Pick<Service, 'price' | 'duration' | 'active'>>): void => {
    demo.catalog.services = demo.catalog.services.map((item) => (item.id === id ? { ...item, ...changes } : item))
    persist.catalog()
}

export const updateExtra = (id: string, changes: Partial<Pick<Extra, 'price' | 'duration' | 'active'>>): void => {
    demo.catalog.extras = demo.catalog.extras.map((item) => (item.id === id ? { ...item, ...changes } : item))
    persist.catalog()
}

export const updateVehicle = (id: string, changes: Partial<Pick<VehicleSize, 'surcharge'>>): void => {
    demo.catalog.vehicles = demo.catalog.vehicles.map((item) => (item.id === id ? { ...item, ...changes } : item))
    persist.catalog()
}

// Opening hours of one day of the week (0 = Sunday)
export const updateWeekDay = (day: number, hours: DayHours): void => {
    demo.availability.week = demo.availability.week.map((item, index) => (index === day ? hours : item))
    persist.availability()
}

// Closes or opens a whole date (holidays, training day...)
export const toggleClosedDate = (dateKey: string): void => {
    const closed = demo.availability.closedDates
    demo.availability.closedDates = closed.includes(dateKey) ? closed.filter((key) => key !== dateKey) : [...closed, dateKey]
    persist.availability()
}

// Blocks or frees one slot of a date
export const toggleBlockedSlot = (dateKey: string, slot: string): void => {
    const current = demo.availability.blockedSlots[dateKey] ?? []
    const next = current.includes(slot) ? current.filter((item) => item !== slot) : [...current, slot]
    demo.availability.blockedSlots = { ...demo.availability.blockedSlots, [dateKey]: next }
    persist.availability()
}

export interface MessageRequest {
    kind: MessageKind
    name: string
    email: string
    phone: string
    company: string
    subject: string
    body: string
    consent: boolean
}

// Contact and fleet forms: the message lands in the admin of this browser (no e-mail is sent)
export const sendMessage = async (request: MessageRequest): Promise<Result> => {
    const errors = validateMessage(request)
    if (hasErrors(errors)) return { success: false, errors }
    await simulateLatency()
    const message: Message = {
        id: `msg-${newId()}`, kind: request.kind, name: request.name.trim(), email: request.email.trim(), phone: request.phone.trim(),
        company: request.company.trim(), subject: request.subject, body: request.body.trim(), createdAt: new Date().toISOString(), read: false,
    }
    demo.messages = [message, ...demo.messages]
    persist.messages()
    return { success: true, message: 'Message envoyé (simulé) : il est visible dans l’administration de la démo' }
}

export const markMessageRead = (id: string, read = true): void => {
    demo.messages = demo.messages.map((item) => (item.id === id ? { ...item, read } : item))
    persist.messages()
}

export const deleteMessage = (id: string): void => {
    demo.messages = demo.messages.filter((item) => item.id !== id)
    persist.messages()
}

// Users of the admin (like the original): role change and removal; the two demo accounts are protected
export const PROTECTED_ACCOUNTS = ['acc-customer', 'acc-admin']

export const setAccountRole = (id: string, role: Role): void => {
    if (PROTECTED_ACCOUNTS.includes(id)) return
    demo.accounts = demo.accounts.map((item) => (item.id === id ? { ...item, role } : item))
    persist.accounts()
}

export const deleteAccount = (id: string): void => {
    if (PROTECTED_ACCOUNTS.includes(id)) return
    demo.accounts = demo.accounts.filter((item) => item.id !== id)
    persist.accounts()
}
