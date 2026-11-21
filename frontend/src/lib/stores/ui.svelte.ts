import type { Toast } from '#lib/types.js'

export interface ConfirmRequest {
    title: string
    text: string
    confirmLabel: string
    danger: boolean
    resolve: (confirmed: boolean) => void
}

export interface PaymentRequest {
    label: string
    amount: number
    resolve: (paid: boolean) => void
}

/*
 * State of the windows of the site: notifications at the top right, confirmation window, simulated payment window,
 * sign-in window and the step of the guided tour (-1 = closed). Never alert() or confirm(): stores/actions/uiActions.ts opens these.
 */
export type AuthMode = 'login' | 'register' | 'reset'

interface UiState {
    toasts: Toast[]
    confirm: ConfirmRequest | null
    payment: PaymentRequest | null
    tourStep: number
    // Open state of the phone menu (closed on every page change)
    menuOpen: boolean
    // Sign-in window of the original (LoginInscription): open state and form shown
    authOpen: boolean
    authMode: AuthMode
}

export const ui: UiState = $state({
    toasts: [],
    confirm: null,
    payment: null,
    tourStep: -1,
    menuOpen: false,
    authOpen: false,
    authMode: 'login',
})
