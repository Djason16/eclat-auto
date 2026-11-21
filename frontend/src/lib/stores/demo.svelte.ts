import { SEED_CATALOG } from '#lib/content/catalog.js'
import { seedAvailability } from '#lib/demo/seed.js'
import type { Account, Booking, Message, SessionUser } from '#lib/types.js'

/*
 * Data of the demo, shared by every page: catalog, bookings, accounts, availability, messages and the signed-in user.
 * Filled from the localStorage once the page is in the browser (stores/actions/demoActions.ts: loadDemo); before that
 * (prerendered HTML) the public pages show the seed catalog. Actions: stores/actions/.
 */
export const demo = $state({
    // true once the data of this browser is loaded (account and admin pages wait for it)
    ready: false,
    catalog: structuredClone(SEED_CATALOG),
    bookings: [] as Booking[],
    accounts: [] as Account[],
    availability: seedAvailability(),
    messages: [] as Message[],
    user: null as SessionUser | null,
})
