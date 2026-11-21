// Rules of every form of the site, used by the forms and by the demo data layer (the same check on both sides)

export type Errors<T extends string = string> = Partial<Record<T, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// French phone: 10 digits starting with 0, spaces, dots or dashes allowed, or +33
const PHONE = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/

export const isEmail = (value: string): boolean => EMAIL.test(value.trim())
export const isPhone = (value: string): boolean => PHONE.test(value.trim())

const required = (value: string, message: string): string | undefined => (value.trim() ? undefined : message)

export const hasErrors = (errors: Errors): boolean => Object.values(errors).some(Boolean)

export const validateCustomer = (data: { firstName: string, lastName: string, email: string, phone: string }): Errors =>
    ({
        firstName: required(data.firstName, 'Indiquez votre prénom'),
        lastName: required(data.lastName, 'Indiquez votre nom'),
        email: isEmail(data.email) ? undefined : 'Adresse e-mail invalide (exemple : nom@domaine.fr)',
        phone: isPhone(data.phone) ? undefined : 'Numéro invalide (exemple : 06 12 34 56 78)',
    })

export const validateAddress = (address: { street: string, city: string, postalCode: string, country: string }): Errors =>
    ({
        street: required(address.street, 'Indiquez votre rue'),
        city: required(address.city, 'Indiquez votre ville'),
        postalCode: /^\d{5}$/.test(address.postalCode.trim()) ? undefined : 'Code postal à 5 chiffres',
        country: required(address.country, 'Indiquez votre pays'),
    })

export const validatePassword = (password: string): string | undefined =>
    password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)
        ? undefined
        : '8 caractères au moins, avec des lettres et des chiffres'

export const validateLogin = (data: { email: string, password: string }): Errors =>
    ({
        email: isEmail(data.email) ? undefined : 'Adresse e-mail invalide',
        password: required(data.password, 'Indiquez votre mot de passe'),
    })

export const validateMessage = (data: { name: string, email: string, phone: string, subject: string, body: string, consent: boolean }): Errors =>
    ({
        name: required(data.name, 'Indiquez votre nom'),
        email: isEmail(data.email) ? undefined : 'Adresse e-mail invalide',
        phone: !data.phone.trim() || isPhone(data.phone) ? undefined : 'Numéro invalide (exemple : 06 12 34 56 78)',
        subject: required(data.subject, 'Choisissez un sujet'),
        body: data.body.trim().length >= 10 ? undefined : 'Votre message doit faire au moins 10 caractères',
        consent: data.consent ? undefined : 'Cochez la case pour envoyer le message',
    })

export const validateVehicleModel = (model: string): string | undefined =>
    model.trim().length >= 2 ? undefined : 'Indiquez la marque et le modèle (exemple : Peugeot 208)'

// Simulated card of the payment window: 16 digits, MM/YY in the future, 3 digits
export const validateCard = (card: { number: string, expiry: string, cvc: string }): Errors =>
    {
        const match = /^(\d{2})\/(\d{2})$/.exec(card.expiry.trim())
        const month = Number(match?.[1] ?? 0)
        const year = 2000 + Number(match?.[2] ?? 0)
        const now = new Date()
        const expired = !match || month < 1 || month > 12 || year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)
        return {
            number: card.number.replace(/\D/g, '').length === 16 ? undefined : 'Le numéro de carte a 16 chiffres',
            expiry: expired ? 'Date au format MM/AA, dans le futur' : undefined,
            cvc: /^\d{3}$/.test(card.cvc.trim()) ? undefined : 'Le code a 3 chiffres',
        }
    }
