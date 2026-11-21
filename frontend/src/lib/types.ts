// Shared types of the site: catalog, bookings, accounts, availability and messages

export type CategoryId = 'interior' | 'complete' | 'polish' | 'windshield'

export interface Category {
    id: CategoryId
    name: string
    tagline: string
}

export interface Service {
    id: string
    category: CategoryId
    name: string
    summary: string
    details: string[]
    // Prices are in cents, so the totals never round wrong
    price: number
    // Minutes of work: a booking takes as many hour slots as needed
    duration: number
    featured: boolean
    active: boolean
    // Price given after a quote (insurance, large vehicle): paid on site, never online
    quoteOnly: boolean
}

export interface Extra {
    id: string
    name: string
    description: string
    price: number
    duration: number
    active: boolean
}

export interface VehicleSize {
    id: string
    name: string
    examples: string
    surcharge: number
}

export interface Catalog {
    services: Service[]
    extras: Extra[]
    vehicles: VehicleSize[]
}

export type BookingStatus = 'pending' | 'confirmed' | 'done' | 'cancelled'
export type PaymentMode = 'online' | 'on-site'

export interface Customer {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export interface Booking {
    id: string
    reference: string
    serviceId: string
    serviceName: string
    extraIds: string[]
    extraNames: string[]
    vehicleId: string
    vehicleName: string
    vehicleModel: string
    // Local date (YYYY-MM-DD) and start hour (HH:MM)
    date: string
    slot: string
    // Minutes of work (service plus options): the duration shown everywhere
    duration: number
    // Number of hour slots taken on the calendar (duration rounded up to whole hours)
    slots: number
    customer: Customer
    notes: string
    total: number
    payment: PaymentMode
    paid: boolean
    status: BookingStatus
    createdAt: string
}

export type Role = 'customer' | 'admin'

export interface Address {
    street: string
    city: string
    postalCode: string
    country: string
}

// Documents of the account, like the original (registration certificate, inspection, photos): small image data URLs
export interface AccountFiles {
    registration: string
    inspection: string
    photos: string[]
}

export interface Account extends Customer {
    id: string
    role: Role
    address: Address
    files: AccountFiles
    // SHA-256 of the password (demo only: everything stays in this browser)
    passwordHash: string
}

export type SessionUser = Omit<Account, 'passwordHash'>

export interface DayHours {
    open: boolean
    start: string
    end: string
}

export interface Availability {
    // 0 = Sunday ... 6 = Saturday (Date.getDay)
    week: DayHours[]
    closedDates: string[]
    // Slots closed by the admin, by date: ['09:00', '10:00']
    blockedSlots: Record<string, string[]>
}

export type MessageKind = 'contact' | 'fleet'

export interface Message {
    id: string
    kind: MessageKind
    name: string
    email: string
    phone: string
    company: string
    subject: string
    body: string
    createdAt: string
    read: boolean
}

export type ToastKind = 'info' | 'success' | 'error'

export interface Toast {
    id: number
    kind: ToastKind
    text: string
    // Kept through the next change of page (a message about a redirect: "Vous êtes déconnecté(e)")
    survive?: boolean
}

// State of one day in a month calendar (components/ui/MonthCalendar)
export interface DayInfo {
    tone: string
    disabled: boolean
    label: string
    note?: string
}
