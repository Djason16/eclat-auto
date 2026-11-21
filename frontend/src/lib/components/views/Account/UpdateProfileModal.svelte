<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import Modal from '#lib/components/ui/Modal/Modal.svelte'
    import { updateProfile } from '#lib/stores/actions/sessionActions.js'
    import { notify, reportErrors } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Errors } from '#lib/utils/validation.js'

    // "Mettre à jour vos informations" window of the original: identity, address, new password (optional)
    let { open, onclose }: { open: boolean, onclose: () => void } = $props()

    const fromUser = () => ({
        firstName: demo.user?.firstName ?? '', lastName: demo.user?.lastName ?? '', phone: demo.user?.phone ?? '', email: demo.user?.email ?? '',
        street: demo.user?.address.street ?? '', city: demo.user?.address.city ?? '', postalCode: demo.user?.address.postalCode ?? '',
        country: demo.user?.address.country ?? '', password: '', confirm: '',
    })

    let form = $state(fromUser())
    let errors: Errors = $state({})
    let saving = $state(false)

    // Each opening starts from the current details
    $effect(() => {
        if (open) {
            form = fromUser()
            errors = {}
        }
    })

    const save = async (event: SubmitEvent) => {
        event.preventDefault()
        saving = true
        const { street, city, postalCode, country, password, confirm, ...customer } = form
        const result = await updateProfile(customer, { street, city, postalCode, country }, password, confirm)
        saving = false
        errors = result.errors ?? {}
        if (!result.success) {
            reportErrors(result.errors ?? {}, document.querySelector('dialog[open]'), result.message)
            return
        }
        notify(result.message ?? 'Enregistré')
        onclose()
    }
</script>

<Modal {open} title="Mettre à jour vos informations" {onclose}>
    <form class="form" onsubmit={save} novalidate>
        <FormField label="Prénom :" name="profile-first-name" bind:value={form.firstName} placeholder="Votre prénom" autocomplete="given-name" error={errors['firstName']} />
        <FormField label="Nom de famille :" name="profile-last-name" bind:value={form.lastName} placeholder="Votre nom" autocomplete="family-name" error={errors['lastName']} />
        <FormField label="Numéro de téléphone :" name="profile-phone" type="tel" bind:value={form.phone} placeholder="06 12 34 56 78" autocomplete="tel" error={errors['phone']} />
        <FormField label="Adresse e-mail :" name="profile-email" type="email" bind:value={form.email} placeholder="nom@domaine.fr" autocomplete="email" error={errors['email']} />
        <FormField label="Rue :" name="profile-street" bind:value={form.street} placeholder="Numéro et rue" autocomplete="street-address" error={errors['street']} />
        <FormField label="Ville :" name="profile-city" bind:value={form.city} placeholder="Votre ville" autocomplete="address-level2" error={errors['city']} />
        <FormField label="Code postal :" name="profile-postal-code" bind:value={form.postalCode} placeholder="44000" autocomplete="postal-code" inputmode="numeric"
            error={errors['postalCode']} />
        <FormField label="Pays :" name="profile-country" bind:value={form.country} placeholder="France" autocomplete="country-name" error={errors['country']} />
        <FormField label="Mot de passe :" name="profile-password" type="password" bind:value={form.password} placeholder="Laisser vide pour le garder"
            autocomplete="new-password" error={errors['password']} />
        <FormField label="Confirmer mot de passe :" name="profile-confirm" type="password" bind:value={form.confirm} placeholder="Le même mot de passe"
            autocomplete="new-password" error={errors['confirm']} />
        <p><BaseButton type="submit" variant="primary" size="small" loading={saving}>Mettre à jour</BaseButton></p>
    </form>
</Modal>
