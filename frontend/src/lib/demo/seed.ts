import { SEED_CATALOG } from '#lib/content/catalog.js'
import type { Account, Availability, Booking, BookingStatus, Message } from '#lib/types.js'
import { addDays, toDateKey } from '#lib/utils/format.js'
import { slotsNeeded } from '#lib/utils/slots.js'

// Demo accounts, also shown as buttons on the login page
export const DEMO_ACCOUNTS = {
    customer: { email: 'client@eclat-auto.example', password: 'Demo-Client-2026' },
    admin: { email: 'admin@eclat-auto.example', password: 'Demo-Admin-2026' },
} as const

export const seedAccounts = (): Account[] => [
    {
        id: 'acc-customer', role: 'customer', firstName: 'Léa', lastName: 'Dupont', email: DEMO_ACCOUNTS.customer.email, phone: '06 12 34 56 78',
        address: { street: '4 rue des Glycines', city: 'Nantes', postalCode: '44000', country: 'France' }, files: { registration: '', inspection: '', photos: [] },
        passwordHash: 'dfb41f60c8057fc96ddbedfdfa9c6fc26e3e961ccc2a41ae71b16d302870b141',
    },
    {
        id: 'acc-admin', role: 'admin', firstName: 'Camille', lastName: 'Martin', email: DEMO_ACCOUNTS.admin.email, phone: '01 23 45 67 89',
        address: { street: '18 rue des Lavandières', city: 'Nantes', postalCode: '44000', country: 'France' }, files: { registration: '', inspection: '', photos: [] },
        passwordHash: 'aa78c2e5f78c0cce90d4af1a2b5934153fcb1d9813a094fb63442c64f876bef0',
    },
]

// Opening hours used for the booking slots (the admin can change them)
export const seedAvailability = (): Availability => ({
    week: [
        { open: false, start: '09:00', end: '17:00' },
        { open: true, start: '08:30', end: '19:00' },
        { open: true, start: '08:30', end: '19:00' },
        { open: true, start: '08:30', end: '19:00' },
        { open: true, start: '08:30', end: '19:00' },
        { open: true, start: '08:30', end: '19:00' },
        { open: true, start: '09:00', end: '17:00' },
    ],
    closedDates: [],
    blockedSlots: {},
})

// Fictional customers of the seed bookings
const PEOPLE = [
    { firstName: 'Léa', lastName: 'Dupont', email: DEMO_ACCOUNTS.customer.email, phone: '06 12 34 56 78' },
    { firstName: 'Hugo', lastName: 'Bernard', email: 'hugo.bernard@exemple.fr', phone: '06 98 76 54 32' },
    { firstName: 'Inès', lastName: 'Moreau', email: 'ines.moreau@exemple.fr', phone: '07 11 22 33 44' },
    { firstName: 'Nathan', lastName: 'Petit', email: 'nathan.petit@exemple.fr', phone: '06 55 44 33 22' },
    { firstName: 'Chloé', lastName: 'Roux', email: 'chloe.roux@exemple.fr', phone: '07 66 77 88 99' },
]

// [day offset from today, start, service, extras, vehicle, person, status, paid online]
type SeedRow = [number, string, string, string[], string, number, BookingStatus, boolean]
const ROWS: SeedRow[] = [
    [-20, '09:30', 'complete-excellence', ['seats'], 'suv', 0, 'done', true],
    [-12, '14:30', 'interior-comfort', [], 'city', 1, 'done', false],
    [-6, '10:30', 'polish-gloss', ['headlights'], 'sedan', 2, 'done', true],
    [-3, '08:30', 'complete-essential', [], 'city', 3, 'cancelled', false],
    [1, '09:30', 'interior-signature', ['pets'], 'suv', 4, 'confirmed', true],
    [2, '13:30', 'complete-excellence', [], 'sedan', 1, 'pending', false],
    [3, '08:30', 'polish-ceramic-1', [], 'sedan', 2, 'confirmed', true],
    [5, '10:30', 'complete-prestige', ['rain'], 'suv', 0, 'confirmed', true],
    [6, '15:30', 'windshield-repair', [], 'city', 3, 'pending', false],
    [9, '09:30', 'interior-express', ['mats'], 'city', 4, 'pending', false],
]

export const seedMessages = (): Message[] => [
    {
        id: 'msg-1', kind: 'fleet', name: 'Julien Garnier', email: 'flotte@transports-exemple.fr', phone: '02 40 00 00 00', company: 'Transports Exemple (fictif)',
        subject: 'Entretien d’une flotte', body: 'Bonjour, nous avons 12 utilitaires à faire laver chaque mois. Pouvez-vous nous faire une proposition ?',
        createdAt: addDays(new Date(), -2).toISOString(), read: false,
    },
    {
        id: 'msg-2', kind: 'contact', name: 'Sarah Lemoine', email: 'sarah.lemoine@exemple.fr', phone: '', company: '',
        subject: 'Question sur une prestation', body: 'Bonjour, la céramique convient-elle à une voiture mate ? Merci !',
        createdAt: addDays(new Date(), -1).toISOString(), read: true,
    },
]

// Seed bookings, placed around today so the demo always looks alive
export const seedBookings = (today = new Date()): Booking[] => {
    const year = today.getFullYear()
    return ROWS.map(([offset, slot, serviceId, extraIds, vehicleId, person, status, paid], index) => {
        const service = SEED_CATALOG.services.find((item) => item.id === serviceId)
        const extras = SEED_CATALOG.extras.filter((item) => extraIds.includes(item.id))
        const vehicle = SEED_CATALOG.vehicles.find((item) => item.id === vehicleId)
        let date = addDays(today, offset)
        // The seed never lands on a weekend (Sunday closed, other hours on Saturday): moved to the Monday
        if (date.getDay() === 6) date = addDays(date, 2)
        if (date.getDay() === 0) date = addDays(date, 1)
        const duration = (service?.duration ?? 60) + extras.reduce((sum, extra) => sum + extra.duration, 0)
        const total = (service?.price ?? 0) + extras.reduce((sum, extra) => sum + extra.price, 0) + (vehicle?.surcharge ?? 0)
        return {
            id: `seed-${index + 1}`,
            reference: `EA-${year}-${String(index + 101).padStart(4, '0')}`,
            serviceId, serviceName: service?.name ?? '', extraIds, extraNames: extras.map((extra) => extra.name),
            vehicleId, vehicleName: vehicle?.name ?? '', vehicleModel: ['Peugeot 3008', 'Renault Clio', 'Volkswagen Golf', 'Toyota Yaris', 'Citroën C5'][person] ?? '',
            date: toDateKey(date), slot, duration, slots: slotsNeeded(duration),
            customer: { ...PEOPLE[person] }, notes: '',
            total, payment: paid ? 'online' : 'on-site', paid: paid || status === 'done', status,
            createdAt: addDays(date, -7).toISOString(),
        }
    })
}
