import { ui, type AuthMode } from '#lib/stores/ui.svelte.js'
import type { ToastKind } from '#lib/types.js'

// How long a notification stays (milliseconds)
const TOAST_TIME = 5000
let nextToastId = 1

export const dismissToast = (id: number): void => {
    ui.toasts = ui.toasts.filter((toast) => toast.id !== id)
}

// Notification at the top right, gone after 5 seconds (or with its close button), or when the page changes unless
// { survive: true } (a message about the redirect that follows it)
export const notify = (text: string, kind: ToastKind = 'success', options: { survive?: boolean } = {}): void => {
    const id = nextToastId++
    ui.toasts = [...ui.toasts.slice(-2), { id, kind, text, survive: options.survive }]
    // Errors stay longer: time to read them and to go back to the field
    setTimeout(() => dismissToast(id), kind === 'error' ? TOAST_TIME * 1.6 : TOAST_TIME)
}

// A new page: the notifications of the previous one go away, except the one meant for this page (once)
export const clearToastsOnNavigation = (): void => {
    ui.toasts = ui.toasts.filter((toast) => toast.survive).map((toast) => ({ ...toast, survive: false }))
}

// Confirmation window of the site: resolves true when the visitor confirms
export const askConfirm = (options: { title: string, text: string, confirmLabel?: string, danger?: boolean }): Promise<boolean> =>
    new Promise((resolve) => {
        ui.confirm = { confirmLabel: 'Confirmer', danger: false, ...options, resolve }
    })

export const closeConfirm = (confirmed: boolean): void => {
    ui.confirm?.resolve(confirmed)
    ui.confirm = null
}

// Simulated payment window: resolves true once the test card is accepted
export const requestPayment = (label: string, amount: number): Promise<boolean> =>
    new Promise((resolve) => {
        ui.payment = { label, amount, resolve }
    })

export const closePayment = (paid: boolean): void => {
    ui.payment?.resolve(paid)
    ui.payment = null
}

export const startTour = (): void => {
    ui.menuOpen = false
    ui.tourStep = 0
}

export const endTour = (): void => {
    ui.tourStep = -1
}

// Sign-in window (header, booking, protected pages): it gives the focus back to the button that opened it
export const openAuth = (mode: AuthMode = 'login'): void => {
    ui.menuOpen = false
    ui.authMode = mode
    ui.authOpen = true
}

export const closeAuth = (): void => {
    ui.authOpen = false
}

/*
 * Errors of a form, the way of the sites: one notification with the message of the first faulty field (and how many
 * others), the faulty fields only get their red border, and the keyboard goes to the first of them.
 */
export const reportErrors = (errors: Record<string, string | undefined>, scope?: HTMLElement | null, fallback = 'Vérifiez le formulaire'): void => {
    const messages = Object.values(errors).filter((message): message is string => Boolean(message))
    const extra = messages.length > 1 ? ` (et ${messages.length - 1} autre${messages.length > 2 ? 's' : ''} champ${messages.length > 2 ? 's' : ''} à revoir)` : ''
    notify(`${messages[0] ?? fallback}${extra}`, 'error')
    // After the next paint, when the fields have their aria-invalid
    requestAnimationFrame(() => (scope ?? document).querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
}
