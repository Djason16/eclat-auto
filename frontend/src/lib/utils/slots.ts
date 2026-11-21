import type { Availability, Booking } from '#lib/types.js'
import { fromDateKey, toDateKey } from './format'

// One slot = one hour of work; a booking takes as many slots in a row as its duration needs
export const SLOT_MINUTES = 60
// Bookings are open from tomorrow up to this many days ahead
export const BOOKING_WINDOW_DAYS = 60

export type DayStatus = 'past' | 'closed' | 'full' | 'limited' | 'open'

const toMinutes = (time: string): number => {
    const [hours = 0, minutes = 0] = time.split(':').map(Number)
    return hours * 60 + minutes
}

const toTime = (minutes: number): string =>
    `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

export const slotsNeeded = (minutes: number): number => Math.max(1, Math.ceil(minutes / SLOT_MINUTES))

// Every start hour of a day from the opening hours of the week (empty when closed)
export const daySlots = (availability: Availability, dateKey: string): string[] => {
    const hours = availability.week[fromDateKey(dateKey).getDay()]
    if (!hours?.open || availability.closedDates.includes(dateKey)) return []
    const slots: string[] = []
    for (let start = toMinutes(hours.start); start + SLOT_MINUTES <= toMinutes(hours.end); start += SLOT_MINUTES) {
        slots.push(toTime(start))
    }
    return slots
}

// Slots already taken by the bookings of the day (cancelled ones free their slots)
export const takenSlots = (availability: Availability, bookings: Booking[], dateKey: string, ignoreId = ''): Set<string> => {
    const all = daySlots(availability, dateKey)
    const taken = new Set(availability.blockedSlots[dateKey] ?? [])
    for (const booking of bookings) {
        if (booking.date !== dateKey || booking.status === 'cancelled' || booking.id === ignoreId) continue
        const first = all.indexOf(booking.slot)
        if (first < 0) continue
        all.slice(first, first + booking.slots).forEach((slot) => taken.add(slot))
    }
    return taken
}

const isBookable = (dateKey: string, today: Date): boolean => {
    const date = fromDateKey(dateKey)
    const first = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    const last = new Date(today.getFullYear(), today.getMonth(), today.getDate() + BOOKING_WINDOW_DAYS)
    return date >= first && date <= last
}

// Start hours where a job of "needed" slots fits: every slot free, in a row, before closing
export const freeStarts = (availability: Availability, bookings: Booking[], dateKey: string, needed: number, today = new Date()): string[] => {
    if (!isBookable(dateKey, today)) return []
    const all = daySlots(availability, dateKey)
    const taken = takenSlots(availability, bookings, dateKey)
    return all.filter((_, index) => {
        const run = all.slice(index, index + needed)
        return run.length === needed && run.every((slot) => !taken.has(slot))
    })
}

export const dayStatus = (availability: Availability, bookings: Booking[], dateKey: string, needed: number, today = new Date()): DayStatus => {
    if (!isBookable(dateKey, today)) return 'past'
    const all = daySlots(availability, dateKey)
    if (!all.length) return 'closed'
    const starts = freeStarts(availability, bookings, dateKey, needed, today)
    if (!starts.length) return 'full'
    return takenSlots(availability, bookings, dateKey).size ? 'limited' : 'open'
}

// The days of a month grid, Monday first, with empty cells before the 1st
export const monthGrid = (year: number, month: number): (string | null)[] => {
    const first = new Date(year, month, 1)
    const offset = (first.getDay() + 6) % 7
    const days = new Date(year, month + 1, 0).getDate()
    return [
        ...Array.from({ length: offset }, () => null),
        ...Array.from({ length: days }, (_, index) => toDateKey(new Date(year, month, index + 1))),
    ]
}

// End hour of a booking: "09:00" + 2 slots -> "11:00"
export const endOfSlot = (start: string, slots: number): string => toTime(toMinutes(start) + slots * SLOT_MINUTES)
