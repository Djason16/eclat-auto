<script lang="ts">
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import InfoBlock from '#lib/components/ui/InfoBlock/InfoBlock.svelte'
    import { BUSINESS } from '#lib/content/business.js'
    import { PHOTOS } from '#lib/content/photos.js'

    // "After your message" block of the original contact page
</script>

<InfoBlock photo={PHOTOS.infoContact} kicker="Après l’envoi" title="Une réponse sous 48 heures" reverse
    text="Votre message est lu par l’atelier et traité dans les plus brefs délais."
    points={[
        { icon: 'mail', text: 'Réponse par e-mail, en général sous 48 heures' },
        { icon: 'alert', text: 'Rien reçu ? Pensez aux courriers indésirables' },
        { icon: 'phone', text: `Urgent : appelez l’atelier au ${BUSINESS.phone}` },
    ]}>
    {#snippet actions()}
        <BaseButton variant="secondary" href="tel:{BUSINESS.phoneLink}" title="Appeler Éclat Auto (numéro fictif)" icon="phone">Appeler l’atelier</BaseButton>
    {/snippet}
</InfoBlock>
