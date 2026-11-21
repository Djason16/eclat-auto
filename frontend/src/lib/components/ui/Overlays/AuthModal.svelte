<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import Modal from '#lib/components/ui/Modal/Modal.svelte'
    import { DEMO_ACCOUNTS } from '#lib/demo/seed.js'
    import { login, register, type Result } from '#lib/stores/actions/sessionActions.js'
    import { closeAuth, notify, reportErrors } from '#lib/stores/actions/uiActions.js'
    import { ui, type AuthMode } from '#lib/stores/ui.svelte.js'
    import type { Errors } from '#lib/utils/validation.js'

    /*
     * The sign-in window of the original (LoginInscription): "Connexion", "Inscription" or "Réinitialisation du mot de
     * passe", the fields, the button, then the italic links. Opened from the header, the booking and the private pages.
     * Added for the demo: the two demo accounts, one click to enter. Everything stays in this browser.
     */
    const TITLES: Record<AuthMode, string> = { login: 'Connexion', register: 'Inscription', reset: 'Réinitialisation du mot de passe' }

    let credentials = $state({ email: '', password: '' })
    let account = $state({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
    let address = $state({ street: '', city: '', postalCode: '', country: 'France' })
    let resetEmail = $state('')
    let errors: Errors = $state({})
    let busy = $state(false)

    // Each opening starts empty: nothing typed before (password included) nor any red field is left
    $effect(() => {
        if (!ui.authOpen) return
        credentials = { email: '', password: '' }
        account = { firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' }
        address = { street: '', city: '', postalCode: '', country: 'France' }
        resetEmail = ''
        errors = {}
        busy = false
    })

    const switchTo = (mode: AuthMode) => {
        ui.authMode = mode
        errors = {}
    }

    const finish = (result: Result) => {
        busy = false
        errors = result.errors ?? {}
        if (!result.success) {
            if (result.errors) reportErrors(result.errors, document.querySelector('dialog[open]'), result.message)
            else notify(result.message ?? 'Connexion impossible', 'error')
            return
        }
        notify(result.message ?? 'Connecté(e)')
        closeAuth()
    }

    const submitLogin = async (event: SubmitEvent) => {
        event.preventDefault()
        busy = true
        finish(await login(credentials.email, credentials.password))
    }

    const submitRegister = async (event: SubmitEvent) => {
        event.preventDefault()
        busy = true
        const { password, confirm, ...customer } = account
        finish(await register(customer, { ...address }, password, confirm))
    }

    // Simulated: a real site sends a link valid one hour, used once
    const submitReset = (event: SubmitEvent) => {
        event.preventDefault()
        notify('Démonstration : dans la vraie version, un lien valable une heure serait envoyé à cette adresse.', 'info')
        switchTo('login')
    }

    const useDemo = async (email: string, password: string) => {
        credentials = { email, password }
        busy = true
        finish(await login(email, password))
    }
</script>

<Modal open={ui.authOpen} title={TITLES[ui.authMode]} onclose={closeAuth}>
    {#if ui.authMode === 'login'}
        <form class="form" onsubmit={submitLogin} novalidate>
            <FormField label="Adresse e-mail :" name="auth-email" type="email" bind:value={credentials.email} placeholder="nom@domaine.fr"
                autocomplete="email" required error={errors['email']} />
            <FormField label="Mot de passe :" name="auth-password" type="password" bind:value={credentials.password} placeholder="Votre mot de passe"
                autocomplete="current-password" required error={errors['password']} />
            <p><BaseButton type="submit" variant="primary" size="small" loading={busy}>Se connecter</BaseButton></p>
        </form>
    {:else if ui.authMode === 'register'}
        <form class="form" onsubmit={submitRegister} novalidate>
            <FormField label="Prénom :" name="auth-first-name" bind:value={account.firstName} placeholder="Votre prénom" autocomplete="given-name"
                required error={errors['firstName']} />
            <FormField label="Nom de famille :" name="auth-last-name" bind:value={account.lastName} placeholder="Votre nom" autocomplete="family-name"
                required error={errors['lastName']} />
            <FormField label="Numéro de téléphone :" name="auth-phone" type="tel" bind:value={account.phone} placeholder="06 12 34 56 78" autocomplete="tel"
                required error={errors['phone']} />
            <FormField label="Adresse e-mail :" name="auth-reg-email" type="email" bind:value={account.email} placeholder="nom@domaine.fr"
                autocomplete="email" required error={errors['email']} />
            <FormField label="Rue :" name="auth-street" bind:value={address.street} placeholder="Numéro et rue" autocomplete="street-address"
                required error={errors['street']} />
            <FormField label="Ville :" name="auth-city" bind:value={address.city} placeholder="Votre ville" autocomplete="address-level2"
                required error={errors['city']} />
            <FormField label="Code postal :" name="auth-postal-code" bind:value={address.postalCode} placeholder="44000" autocomplete="postal-code"
                inputmode="numeric" required error={errors['postalCode']} />
            <FormField label="Pays :" name="auth-country" bind:value={address.country} placeholder="France" autocomplete="country-name"
                required error={errors['country']} />
            <FormField label="Mot de passe :" name="auth-new-password" type="password" bind:value={account.password} placeholder="8 caractères au moins"
                autocomplete="new-password" required error={errors['password']} hint="Des lettres et des chiffres, 8 caractères au moins." />
            <FormField label="Confirmer mot de passe :" name="auth-confirm-password" type="password" bind:value={account.confirm}
                placeholder="Le même mot de passe" autocomplete="new-password" required error={errors['confirm']} />
            <p><BaseButton type="submit" variant="primary" size="small" loading={busy}>S’inscrire</BaseButton></p>
        </form>
    {:else}
        <form class="form" onsubmit={submitReset} novalidate>
            <FormField label="Adresse e-mail :" name="auth-reset-email" type="email" bind:value={resetEmail} placeholder="nom@domaine.fr" autocomplete="email" />
            <p><BaseButton type="submit" variant="primary" size="small">Envoyer le lien</BaseButton></p>
        </form>
    {/if}

    <div class="auth-links">
        <button type="button" onclick={() => switchTo(ui.authMode === 'login' ? 'register' : 'login')}>
            {ui.authMode === 'login' ? 'Créer un compte' : 'Déjà un compte ? Se connecter'}
        </button>
        {#if ui.authMode === 'login'}
            <button type="button" onclick={() => switchTo('reset')}>Mot de passe oublié ?</button>
        {:else if ui.authMode === 'reset'}
            <a class="text-link" href={resolve('contact/')} title="Nous contacter" onclick={closeAuth}>Si vous avez besoin d’aide, contactez-nous ici.</a>
        {/if}
    </div>

    <section class="auth-demo" aria-labelledby="auth-demo-title">
        <h3 id="auth-demo-title">Comptes de démonstration</h3>
        <p>Client : {DEMO_ACCOUNTS.customer.email} · {DEMO_ACCOUNTS.customer.password}</p>
        <p>Administrateur : {DEMO_ACCOUNTS.admin.email} · {DEMO_ACCOUNTS.admin.password}</p>
        <div class="auth-demo-actions">
            <BaseButton size="small" disabled={busy} onclick={() => useDemo(DEMO_ACCOUNTS.customer.email, DEMO_ACCOUNTS.customer.password)}>
                Entrer comme client
            </BaseButton>
            <BaseButton variant="secondary" size="small" disabled={busy} onclick={() => useDemo(DEMO_ACCOUNTS.admin.email, DEMO_ACCOUNTS.admin.password)}>
                Entrer comme admin
            </BaseButton>
        </div>
    </section>
</Modal>

<style>
    .auth-links {
        display: grid;
        justify-items: start;
        gap: var(--space-xs);
    }

    .auth-links button,
    .auth-links a {
        min-height: 24px;
        padding: 0;
        border: none;
        background: none;
        color: var(--black);
        font-size: var(--font-normal);
        font-style: italic;
        text-align: left;
        cursor: pointer;
        transition: color var(--transition);
    }

    @media (hover: hover) and (pointer: fine) {
        .auth-links button:hover,
        .auth-links a:hover {
            color: var(--gold-dark);
        }
    }

    .auth-demo {
        display: grid;
        gap: var(--space-xs);
        padding-top: var(--space-normal);
        border-top: 1px solid rgb(0 0 0 / 25%);
    }

    .auth-demo h3 {
        font-size: var(--font-normal);
    }

    .auth-demo p {
        font-size: var(--font-small);
        overflow-wrap: anywhere;
    }

    .auth-demo-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-small);
        margin-top: var(--space-small);
    }
</style>
