<script lang="ts">
    import { fly } from 'svelte/transition'
    import { goto } from '$app/navigation'
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import { DEMO_ACCOUNTS } from '#lib/demo/seed.js'
    import { endTour } from '#lib/stores/actions/uiActions.js'
    import { ui } from '#lib/stores/ui.svelte.js'

    // Steps of the guided tour: the page it opens and what it shows
    const STEPS = [
        { path: resolve('/'), title: 'Bienvenue chez Éclat Auto', text: 'Une station de lavage et d’esthétique automobile fictive, refaite en démonstration : tout ce que vous faites ici reste dans votre navigateur.' },
        { path: resolve('prestations/'), title: 'Prestations et tarifs', text: 'Les formules par catégorie, les options et le supplément selon la taille du véhicule. Chaque carte mène à la réservation.' },
        { path: resolve('reservation/'), title: 'Réservation en 6 étapes', text: 'Prestation, options, véhicule, date et créneau libre, coordonnées puis récapitulatif avec paiement simulé (carte de test 4242 4242 4242 4242).' },
        { path: resolve('mon-espace/'), title: 'Comptes de démonstration', text: `La fenêtre « Connexion/Inscription » propose deux comptes en un clic : client (${DEMO_ACCOUNTS.customer.email}) ou administrateur (${DEMO_ACCOUNTS.admin.email}).` },
        { path: resolve('admin/'), title: 'Administration', text: 'Avec le compte admin : rendez-vous et statuts, calendrier des disponibilités, tarifs modifiables et messages reçus.' },
        { path: resolve('horaires-acces/'), title: 'Horaires et accès', text: 'Plan dessiné, sans service de cartes ni suivi. Le bouton « Remettre à zéro » en haut efface tout ce que vous avez fait.' },
        { path: resolve('fonctionnalites/'), title: 'Ce que comprend ce site', text: 'Toutes les fonctions par partie, chacune avec un lien vers son écran, et ce qui deviendrait réel sur un vrai site.' },
    ]

    const step = $derived(STEPS[ui.tourStep])

    const go = async (index: number) => {
        ui.tourStep = index
        const target = STEPS[index]
        if (target) await goto(target.path)
    }

    // Escape closes the tour
    const onKey = (event: KeyboardEvent) => {
        if (ui.tourStep >= 0 && event.key === 'Escape' && !document.querySelector('dialog[open]')) endTour()
    }

    // Opening the tour starts on its first page
    let opened = false
    $effect(() => {
        if (ui.tourStep === 0 && !opened) void go(0)
        opened = ui.tourStep >= 0
    })
</script>

<svelte:window onkeydown={onKey} />

{#if step}
    <section class="tour surface-dark" aria-label="Visite guidée" transition:fly={{ y: 24, duration: 450 }}>
        <p class="tour-step">Étape {ui.tourStep + 1} sur {STEPS.length}</p>
        <h2 class="text-xlarge">{step.title}</h2>
        <p>{step.text}</p>
        <div class="form-actions">
            {#if ui.tourStep > 0}
                <BaseButton variant="tertiary" size="small" icon="arrowLeft" onclick={() => go(ui.tourStep - 1)}>Précédent</BaseButton>
            {/if}
            {#if ui.tourStep < STEPS.length - 1}
                <BaseButton variant="primary" size="small" iconAfter="arrowRight" onclick={() => go(ui.tourStep + 1)}>Suivant</BaseButton>
            {:else}
                <BaseButton variant="primary" size="small" icon="check" onclick={endTour}>Terminer</BaseButton>
            {/if}
            <BaseButton variant="tertiary" size="small" onclick={endTour}>Fermer</BaseButton>
        </div>
    </section>
{/if}
