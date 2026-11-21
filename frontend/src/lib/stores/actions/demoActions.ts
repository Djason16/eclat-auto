import { SEED_CATALOG } from '#lib/content/catalog.js'
import { seedAccounts, seedAvailability, seedBookings, seedMessages } from '#lib/demo/seed.js'
import { clearDemoStorage, loadValue, removeValue, saveValue, STORAGE_KEYS } from '#lib/demo/storage.js'
import { resetDraft } from '#lib/stores/bookingDraft.svelte.js'
import { demo } from '#lib/stores/demo.svelte.js'
import type { Account, Availability, Booking, Catalog, Message, SessionUser } from '#lib/types.js'

// Small pause before a simulated answer, so a button shows its spinner like with a real server
export const simulateLatency = (ms = 450): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

// Reads every piece of the demo from this browser (seed on the first visit)
export const loadDemo = (): void => {
    demo.catalog = loadValue<Catalog>(STORAGE_KEYS.catalog, () => structuredClone(SEED_CATALOG))
    demo.bookings = loadValue<Booking[]>(STORAGE_KEYS.bookings, () => seedBookings())
    demo.accounts = loadValue<Account[]>(STORAGE_KEYS.accounts, seedAccounts)
    demo.availability = loadValue<Availability>(STORAGE_KEYS.availability, seedAvailability)
    demo.messages = loadValue<Message[]>(STORAGE_KEYS.messages, seedMessages)
    const userId = loadValue<string | null>(STORAGE_KEYS.session, () => null)
    demo.user = toSessionUser(demo.accounts.find((account) => account.id === userId))
    demo.ready = true
}

export const toSessionUser = (account: Account | undefined): SessionUser | null => {
    if (!account) return null
    const { id, role, firstName, lastName, email, phone, address, files } = account
    return { id, role, firstName, lastName, email, phone, address, files }
}

// Writes one piece back (JSON of the $state proxy)
export const persist = {
    catalog: () => saveValue(STORAGE_KEYS.catalog, demo.catalog),
    bookings: () => saveValue(STORAGE_KEYS.bookings, demo.bookings),
    accounts: () => saveValue(STORAGE_KEYS.accounts, demo.accounts),
    availability: () => saveValue(STORAGE_KEYS.availability, demo.availability),
    messages: () => saveValue(STORAGE_KEYS.messages, demo.messages),
    session: () => (demo.user ? saveValue(STORAGE_KEYS.session, demo.user.id) : removeValue(STORAGE_KEYS.session)),
}

// "Remettre à zéro": the seed data comes back and the visitor is signed out
export const resetDemo = (): void => {
    clearDemoStorage()
    loadDemo()
    resetDraft()
}
