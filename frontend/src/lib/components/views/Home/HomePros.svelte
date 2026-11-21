<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import { PHOTOS } from '#lib/content/photos.js'

    // Card for companies of the original home page
</script>

<InfoBlock photo={PHOTOS.infoHomePros} kicker="Professionnels" title="Des solutions sur mesure pour votre flotte"
    text="Concessions, loueurs, artisans, entreprises : un entretien régulier de vos véhicules, sans immobiliser vos équipes."
    points={[
        { icon: 'truck', text: 'Utilitaires, flottes et véhicules de courtoisie' },
        { icon: 'calendar', text: 'Passages ponctuels ou programmés' },
        { icon: 'tag', text: 'Devis gratuit et contrat sur mesure' },
    ]}>
    {#snippet actions()}
        <BaseButton variant="secondary" href={resolve('professionnels/')} title="Découvrir l’offre pour les professionnels" iconAfter="arrowRight">Découvrir l’offre pro</BaseButton>
    {/snippet}
</InfoBlock>
