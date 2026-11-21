<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
</script>

<Seo pageKey="notFound" />

<!-- Page shown for an address that does not exist: the same PageHero as the other pages -->
<PageHero kicker="Erreur 404" title="Cette page a pris la route" accent="la route"
    text="La page demandée n’existe pas ou a été déplacée. Les prestations, elles, sont toujours là.">
    <BaseButton variant="primary" href={resolve('/')} title="Retour à l’accueil" >Retour à l’accueil</BaseButton>
    <BaseButton variant="tertiary" href={resolve('reservation/')} title="Réserver un créneau en ligne" >Réserver</BaseButton>
</PageHero>
