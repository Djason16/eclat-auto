<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import CheckField from '#lib/components/ui/CheckField/CheckField.svelte'
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import { sendMessage } from '#lib/stores/actions/adminActions.js'
    import { notify, reportErrors } from '#lib/stores/actions/uiActions.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { MessageKind } from '#lib/types.js'
    import type { Errors } from '#lib/utils/validation.js'

    /*
     * Message form of the contact page (kind "contact") and of the professionals page (kind "fleet": company and fleet
     * size). Simulated: the message lands in the admin of this browser, no e-mail leaves.
     */
    let { kind = 'contact' }: { kind?: MessageKind } = $props()

    const SUBJECTS = {
        contact: ['Question sur une prestation', 'Demande de devis', 'Mon rendez-vous', 'Autre'],
        fleet: ['Entretien d’une flotte', 'Véhicules de location', 'Concession ou garage', 'Autre'],
    }
    const FLEET_SIZES = ['1 à 4 véhicules', '5 à 9 véhicules', '10 à 24 véhicules', '25 véhicules et plus']

    // Empty form; a signed-in visitor gets the name and e-mail of the account
    const empty = () => ({
        name: demo.user ? `${demo.user.firstName} ${demo.user.lastName}` : '', email: demo.user?.email ?? '',
        phone: '', company: '', fleetSize: '', subject: '', body: '', consent: false,
    })
    let form = $state(empty())
    let errors: Errors = $state({})
    let sending = $state(false)
    let formElement: HTMLFormElement | undefined = $state()

    // Sign-in or sign-out while the form is open: name and e-mail follow the account (never those of the one who left)
    let filledFor = demo.user?.id ?? ''
    $effect(() => {
        const id = demo.user?.id ?? ''
        if (id === filledFor) return
        filledFor = id
        const { name, email } = empty()
        form = { ...form, name, email }
    })

    const submit = async (event: SubmitEvent) => {
        event.preventDefault()
        sending = true
        const body = kind === 'fleet' && form.fleetSize ? `Taille de la flotte : ${form.fleetSize}\n\n${form.body}` : form.body
        const result = await sendMessage({ ...form, kind, body })
        sending = false
        errors = result.errors ?? {}
        if (!result.success) {
            reportErrors(errors, formElement)
            return
        }
        notify(result.message ?? 'Message envoyé')
        form = empty()
    }

    const reset = (event: Event) => {
        event.preventDefault()
        form = empty()
        errors = {}
    }
</script>

<style>
    .message-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--space-small);
    }
</style>

<form class="form" onsubmit={submit} onreset={reset} novalidate bind:this={formElement}>
    <div class="form-row">
        <FormField label="Nom :" name="name" bind:value={form.name} placeholder="Prénom et nom" autocomplete="name" required error={errors['name']} />
        {#if kind === 'fleet'}
            <FormField label="Entreprise :" name="company" bind:value={form.company} placeholder="Nom de votre société" autocomplete="organization" />
        {/if}
    </div>
    <div class="form-row">
        <FormField label="Adresse e-mail :" name="email" type="email" bind:value={form.email} placeholder="nom@domaine.fr" autocomplete="email" required
            error={errors['email']} />
        <FormField label="Téléphone :" name="phone" type="tel" bind:value={form.phone} placeholder="Facultatif : 06 12 34 56 78" autocomplete="tel"
            error={errors['phone']} />
    </div>
    <div class="form-row">
        <FormField label="Sujet :" name="subject" as="select" bind:value={form.subject} placeholder="Choisissez un sujet" required error={errors['subject']}
            options={SUBJECTS[kind].map((subject) => ({ value: subject, label: subject }))} />
        {#if kind === 'fleet'}
            <FormField label="Taille de la flotte :" name="fleet-size" as="select" bind:value={form.fleetSize} placeholder="Nombre de véhicules"
                options={FLEET_SIZES.map((size) => ({ value: size, label: size }))} />
        {/if}
    </div>
    <FormField label="Message :" name="body" as="textarea" bind:value={form.body} required error={errors['body']}
        placeholder={kind === 'fleet' ? 'Types de véhicules, fréquence souhaitée, lieu...' : 'Votre question, en quelques lignes'} />
    <CheckField name="consent" bind:checked={form.consent} error={errors['consent']}>
        J’accepte que mes informations servent seulement à répondre à ma demande, comme l’explique la
        <a class="text-link" href={resolve('confidentialite/')} title="Lire la politique de confidentialité">politique de confidentialité</a>.
    </CheckField>
    <small class="field-hint">Envoi simulé : le message reste dans ce navigateur et arrive dans l’administration de la démo.</small>
    <!-- Buttons of the original: reset on the left, send on the right -->
    <div class="message-actions">
        <BaseButton type="reset" variant="primary" size="small">Réinitialiser</BaseButton>
        <BaseButton type="submit" size="small" loading={sending}>{kind === 'fleet' ? 'Demander un devis' : 'Envoyer'}</BaseButton>
    </div>
</form>
