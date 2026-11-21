<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import { PHOTOS } from '#lib/content/photos.js'

    // "Entrons en contact" block of the original professionals page
</script>

<InfoBlock photo={PHOTOS.infoPros} kicker="Une question, un devis ?" title="Entrons en contact"
    text="Parlez-nous de vos véhicules et de votre rythme : nous revenons vers vous avec une proposition claire."
    points={[
        { icon: 'message', text: 'Réponse rapide de l’équipe' },
        { icon: 'tag', text: 'Devis gratuit et sans engagement' },
        { icon: 'user', text: 'Un interlocuteur unique pour votre flotte' },
    ]}>
    {#snippet actions()}
        <BaseButton variant="secondary" href={resolve('contact/')} title="Nous contacter" iconAfter="arrowRight">Demander un devis</BaseButton>
    {/snippet}
</InfoBlock>
