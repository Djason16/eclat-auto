<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import { PHOTOS } from '#lib/content/photos.js'

    // Advice before the appointment, under the booking form like the original
    const NOTES = [
        { icon: 'seat' as const, text: 'Nettoyage intérieur : videz l’habitacle de vos objets et documents.' },
        { icon: 'shine' as const, text: 'Polissage : rien à préparer, le lavage et la décontamination sont compris.' },
        { icon: 'shield' as const, text: 'État des lieux à l’arrivée : retirez vos objets de valeur.' },
    ]
</script>

<InfoBlock photo={PHOTOS.infoBooking} kicker="Avant votre rendez-vous" title="Bien préparer votre venue"
    text="Quelques conseils pour un soin plus rapide et plus complet." points={NOTES}>
    {#snippet actions()}
        <BaseButton variant="primary" href={resolve('prestations/')} title="Voir le récapitulatif des prestations" icon="sparkle">Revoir les prestations</BaseButton>
    {/snippet}
</InfoBlock>
