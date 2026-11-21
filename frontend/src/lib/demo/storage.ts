/*
 * Storage of the demo: everything the visitor does (accounts, bookings, prices changed in the admin, messages) stays in
 * the localStorage of this browser, under keys starting with "eclat-auto:". Nothing is ever sent to a server.
 * The version number starts the demo again from its seed when the shape of the data changes.
 */
const PREFIX = 'eclat-auto:'
const VERSION = '3'

export const STORAGE_KEYS = {
    catalog: 'catalog',
    bookings: 'bookings',
    accounts: 'accounts',
    availability: 'availability',
    messages: 'messages',
    session: 'session',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

export const inBrowser = (): boolean => typeof window !== 'undefined' && typeof localStorage !== 'undefined'

const checkVersion = (): void => {
    if (localStorage.getItem(`${PREFIX}version`) === VERSION) return
    clearDemoStorage()
    localStorage.setItem(`${PREFIX}version`, VERSION)
}

// Saved value of a key, or the seed (written right away, so every page sees the same data)
export const loadValue = <T>(key: StorageKey, seed: () => T): T => {
    if (!inBrowser()) return seed()
    try {
        checkVersion()
        const saved = localStorage.getItem(PREFIX + key)
        if (saved) return JSON.parse(saved) as T
    } catch {
        // Broken or blocked storage: the seed is used
    }
    const value = seed()
    saveValue(key, value)
    return value
}

export const saveValue = (key: StorageKey, value: unknown): void => {
    if (!inBrowser()) return
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
        // Full or blocked storage (private window): the demo keeps working for this page only
    }
}

export const removeValue = (key: StorageKey): void => {
    if (inBrowser()) localStorage.removeItem(PREFIX + key)
}

// "Remettre à zéro": every key of the demo is removed, the seed comes back
export const clearDemoStorage = (): void => {
    if (!inBrowser()) return
    Object.keys(localStorage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => localStorage.removeItem(key))
}

// Short random id (demo only)
export const newId = (): string => Math.random().toString(36).slice(2, 10)

// SHA-256 of a password, in the browser (the seed accounts carry the same hash, computed the same way)
export const hashPassword = async (password: string): Promise<string> => {
    const data = new TextEncoder().encode(`${PREFIX}${password}`)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}
