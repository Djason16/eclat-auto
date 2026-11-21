import { hashPassword, newId } from '#lib/demo/storage.js'
import { persist, simulateLatency, toSessionUser } from '#lib/stores/actions/demoActions.js'
import { forgetDraftCustomer, resetDraft } from '#lib/stores/bookingDraft.svelte.js'
import { demo } from '#lib/stores/demo.svelte.js'
import type { Account, AccountFiles, Address, Customer } from '#lib/types.js'
import { hasErrors, validateAddress, validateCustomer, validateLogin, validatePassword, type Errors } from '#lib/utils/validation.js'

// Answer of every simulated action, in the { success, ... } shape of the DC Scaffold APIs
export interface Result {
    success: boolean
    message?: string
    errors?: Errors
}

const sameEmail = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase()

export const login = async (email: string, password: string): Promise<Result> => {
    const errors = validateLogin({ email, password })
    if (hasErrors(errors)) return { success: false, errors }
    await simulateLatency()
    const hash = await hashPassword(password)
    const account = demo.accounts.find((item) => sameEmail(item.email, email) && item.passwordHash === hash)
    if (!account) return { success: false, message: 'E-mail ou mot de passe incorrect' }
    demo.user = toSessionUser(account)
    persist.session()
    forgetDraftCustomer()
    return { success: true, message: `Bonjour ${account.firstName}, vous êtes connecté(e)` }
}

// Sign-up of the original: identity, address, password twice
export const register = async (data: Customer, address: Address, password: string, confirm: string): Promise<Result> => {
    const errors: Errors = {
        ...validateCustomer(data), ...validateAddress(address), password: validatePassword(password),
        confirm: confirm === password ? undefined : 'Les deux mots de passe sont différents',
    }
    if (hasErrors(errors)) return { success: false, errors }
    if (demo.accounts.some((item) => sameEmail(item.email, data.email))) {
        return { success: false, errors: { email: 'Un compte existe déjà avec cette adresse' } }
    }
    await simulateLatency()
    const account: Account = {
        ...data, email: data.email.trim(), address, files: { registration: '', inspection: '', photos: [] },
        id: `acc-${newId()}`, role: 'customer', passwordHash: await hashPassword(password),
    }
    demo.accounts = [...demo.accounts, account]
    persist.accounts()
    demo.user = toSessionUser(account)
    persist.session()
    forgetDraftCustomer()
    return { success: true, message: 'Votre compte est créé (dans ce navigateur seulement)' }
}

// Sign-out: the booking in progress is dropped (it held the details of the person who leaves)
export const logout = (): void => {
    demo.user = null
    persist.session()
    resetDraft()
}

// "Mettre à jour vos informations" of the original: identity, address and, if filled in, a new password
export const updateProfile = async (data: Customer, address: Address, password = '', confirm = ''): Promise<Result> => {
    const errors: Errors = {
        ...validateCustomer(data), ...validateAddress(address),
        password: password ? validatePassword(password) : undefined,
        confirm: password && confirm !== password ? 'Les deux mots de passe sont différents' : undefined,
    }
    if (hasErrors(errors)) return { success: false, errors }
    const user = demo.user
    if (!user) return { success: false, message: 'Connectez-vous d’abord' }
    if (demo.accounts.some((item) => item.id !== user.id && sameEmail(item.email, data.email))) {
        return { success: false, errors: { email: 'Cette adresse est déjà utilisée par un autre compte' } }
    }
    await simulateLatency()
    const passwordHash = password ? await hashPassword(password) : undefined
    demo.accounts = demo.accounts.map((item) => (item.id === user.id ? { ...item, ...data, address, ...(passwordHash ? { passwordHash } : {}) } : item))
    persist.accounts()
    demo.user = toSessionUser(demo.accounts.find((item) => item.id === user.id))
    return { success: true, message: 'Vos informations sont enregistrées' }
}

// "Modifier mes fichiers personnels": documents kept as small images in this browser
export const updateFiles = (files: AccountFiles): void => {
    const user = demo.user
    if (!user) return
    demo.accounts = demo.accounts.map((item) => (item.id === user.id ? { ...item, files } : item))
    persist.accounts()
    demo.user = toSessionUser(demo.accounts.find((item) => item.id === user.id))
}

// "Supprimer mon compte": the account goes, its bookings stay for the workshop (like a real history)
export const deleteOwnAccount = (): void => {
    const user = demo.user
    if (!user) return
    demo.accounts = demo.accounts.filter((item) => item.id !== user.id)
    persist.accounts()
    logout()
}
