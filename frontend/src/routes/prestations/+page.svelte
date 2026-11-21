<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import CtaBand from '#lib/components/ui/CtaBand/CtaBand.svelte'
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import SectionLayout from '#lib/components/ui/SectionLayout/SectionLayout.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import ServicesCatalog from '#lib/components/views/Services/ServicesCatalog.svelte'

    const sections = [{ component: ServicesCatalog, band: 'Nos services' }]
</script>

<Seo pageKey="services" />
<PageHero kicker="Prestations et tarifs" title="Des soins sur mesure pour chaque voiture" accent="sur mesure" photo={PHOTOS.heroServices}
    text="Quatre familles de soins, des formules claires et le prix affiché d’avance." scrollLabel="Comparer les formules" />
<SectionLayout {sections} />
<CtaBand title="Votre formule est choisie ?" text="Réservez votre créneau en deux minutes, payez en ligne ou sur place.">
    <BaseButton variant="secondary" href={resolve('reservation/')} title="Réserver un créneau en ligne" icon="calendar">Réserver maintenant</BaseButton>
</CtaBand>
