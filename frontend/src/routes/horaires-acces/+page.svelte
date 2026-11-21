<script lang="ts">
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import SectionLayout from '#lib/components/ui/SectionLayout/SectionLayout.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import AccessDetails from '#lib/components/views/Access/AccessDetails.svelte'
    import AccessHours from '#lib/components/views/Access/AccessHours.svelte'

    const sections = [{ component: AccessDetails, band: 'Où et quand nous trouver' }, { component: AccessHours, tone: 'dark' as const }]
</script>

<Seo pageKey="access" />
<PageHero kicker="Horaires et accès" title="On vous accueille avec le sourire" accent="le sourire" photo={PHOTOS.heroAccess}
    text="L’atelier, le plan, les horaires et le parking : tout pour venir sans détour." scrollLabel="Plan et horaires" />
<SectionLayout {sections} />
