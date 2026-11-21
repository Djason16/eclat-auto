<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import CtaBand from '#lib/components/ui/CtaBand/CtaBand.svelte'
    import Faq from '#lib/components/ui/Faq/Faq.svelte'
    import SectionLayout from '#lib/components/ui/SectionLayout/SectionLayout.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import Steps from '#lib/components/ui/Steps/Steps.svelte'
    import { FAQ, STEPS } from '#lib/content/home.js'
    import { BUSINESS } from '#lib/content/business.js'
    import HomeExtras from '#lib/components/views/Home/HomeExtras.svelte'
    import HomeHero from '#lib/components/views/Home/HomeHero.svelte'
    import HomePros from '#lib/components/views/Home/HomePros.svelte'
    import HomeReviews from '#lib/components/views/Home/HomeReviews.svelte'
    import HomeServices from '#lib/components/views/Home/HomeServices.svelte'
    import HomeShowcase from '#lib/components/views/Home/HomeShowcase.svelte'

    // Blocks of the home page (src/lib/components/views/Home): the rates of the original, framed by the premium sections
    const middle = [
        { component: HomeExtras, band: 'Services supplémentaires', tone: 'dark' as const },
    ]
    const end = [
        { component: HomePros, band: 'Nos services pour professionnels', tone: 'dark' as const },
    ]
</script>

<Seo pageKey="index" />
<HomeHero />
<Steps id="steps-title" kicker="Comment ça marche" title="Quatre étapes, zéro prise de tête"
    text="De la réservation au retrait des clés, tout est simple et le prix est connu d’avance." items={STEPS} />
<HomeServices />
<HomeShowcase />
<SectionLayout sections={middle} />
<HomeReviews />
<SectionLayout sections={end} />
<Faq id="faq-title" kicker="Questions fréquentes" title="Tout ce qu’il faut savoir avant de venir"
    text="Une autre question ? Le téléphone et le formulaire de contact sont là pour ça." items={FAQ} />
<CtaBand title="Prêt à retrouver l’éclat du premier jour ?" text="Choisissez votre formule, votre créneau, et laissez-nous faire.">
    <BaseButton variant="secondary" href={resolve('reservation/')} title="Réserver un créneau en ligne" icon="calendar">Réserver en 2 min</BaseButton>
    <BaseButton variant="primary" href="tel:{BUSINESS.phoneLink}" title="Appeler l’atelier" icon="phone">{BUSINESS.phone}</BaseButton>
</CtaBand>
