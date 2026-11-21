<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import FormField from '#lib/components/ui/FormField/FormField.svelte'
    import { openAuth } from '#lib/stores/actions/uiActions.js'
    import { draft } from '#lib/stores/bookingDraft.svelte.js'
    import { demo } from '#lib/stores/demo.svelte.js'
    import type { Errors } from '#lib/utils/validation.js'

    /*
     * Step 4 of the original: personal details and the vehicle, with the "Inscription / Connexion" buttons on top
     * (they open the sign-in window). Improved: booking without an account is possible, and signing in fills the fields.
     */
    let { errors = {} }: { errors?: Errors } = $props()

    // Signed in: the fields come from the account
    $effect(() => {
        const user = demo.user
        if (user && !draft.customer.email) {
            draft.customer = { firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }
        }
    })
</script>

<h3 class="step-title" tabindex="-1">Vos informations</h3>
{#if demo.user}
    <p class="step-description">Connecté(e) en tant que {demo.user.firstName} {demo.user.lastName} : vos informations sont remplies.</p>
{:else}
    <div class="auth-toggle">
        <BaseButton variant="tertiary" size="small" onclick={() => openAuth('register')}>Inscription</BaseButton>
        <BaseButton variant="primary" size="small" onclick={() => openAuth('login')}>Connexion</BaseButton>
    </div>
    <p class="step-description">Ou remplissez simplement vos informations : un compte n’est pas obligatoire.</p>
{/if}

<div class="form">
    <div class="form-row">
        <FormField label="Prénom :" name="first-name" bind:value={draft.customer.firstName} placeholder="Votre prénom" autocomplete="given-name"
            required error={errors['firstName']} />
        <FormField label="Nom :" name="last-name" bind:value={draft.customer.lastName} placeholder="Votre nom" autocomplete="family-name"
            required error={errors['lastName']} />
    </div>
    <div class="form-row">
        <FormField label="Adresse e-mail :" name="email" type="email" bind:value={draft.customer.email} placeholder="nom@domaine.fr"
            autocomplete="email" required error={errors['email']} />
        <FormField label="Téléphone :" name="phone" type="tel" bind:value={draft.customer.phone} placeholder="06 12 34 56 78" autocomplete="tel"
            required error={errors['phone']} />
    </div>
    <FormField label="Marque et modèle du véhicule :" name="vehicle-model" bind:value={draft.vehicleModel} placeholder="Exemple : Peugeot 208" required
        autocomplete="off" error={errors['vehicleModel']} />
    <FormField label="Précisions :" name="notes" as="textarea" bind:value={draft.notes}
        placeholder="Facultatif : siège bébé à nettoyer, rayure à regarder, code du parking..." />
</div>

<style>
    .auth-toggle {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-small);
    }
</style>
