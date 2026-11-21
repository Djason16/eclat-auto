<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import CtaBand from '#lib/components/ui/CtaBand/CtaBand.svelte'
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import { DESIGNER } from '#lib/content/business.js'
    import { FEATURE_GROUPS } from '#lib/content/features.js'
    import FeatureGroup from '#lib/components/views/Features/FeatureGroup.svelte'
    import FeaturesSimulated from '#lib/components/views/Features/FeaturesSimulated.svelte'

    // "Ce que comprend ce site" (/fonctionnalites/), linked from the demo banner and the footer: every feature of the demo
    // by area, with the way to its screen, then what is simulated, then the call to get the same site
</script>

<Seo pageKey="features" />
<PageHero kicker="Ce que comprend ce site" title="Tout un atelier en ligne, prêt à servir" accent="prêt à servir"
    text="Réservation, espace client, administration, pages pro et légales : chaque fonction se teste ici, en un clic." scrollLabel="Voir les fonctions">
    <BaseButton variant="primary" href={resolve('reservation/')} title="Tester la réservation en ligne" icon="calendar">Tester la réservation</BaseButton>
</PageHero>
{#each FEATURE_GROUPS as group, index (group.id)}
    <FeatureGroup {group} tone={index % 2 ? 'light' : 'white'} />
{/each}
<FeaturesSimulated />
<CtaBand title="Vous voulez le même site ?" text="Réservation, paiement, espace client et administration, aux couleurs de votre entreprise.">
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- outside address (portfolio) -->
    <BaseButton variant="secondary" href="{DESIGNER.href}/book/" title="Prendre rendez-vous avec Djason CHERY pour un site comme celui-ci (nouvel onglet)"
        target="_blank" rel="noopener" icon="mail">Contacter Djason CHERY</BaseButton>
    <BaseButton variant="primary" href={resolve('reservation/')} title="Tester la réservation en ligne" icon="calendar">Tester la réservation</BaseButton>
</CtaBand>
