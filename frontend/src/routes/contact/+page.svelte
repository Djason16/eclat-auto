<script lang="ts">
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import SectionLayout from '#lib/components/ui/SectionLayout/SectionLayout.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import ContactAfter from '#lib/components/views/Contact/ContactAfter.svelte'
    import ContactLayout from '#lib/components/views/Contact/ContactLayout.svelte'

    const sections = [{ component: ContactLayout, band: 'Contactez-nous' }, { component: ContactAfter, tone: 'dark' as const }]
</script>

<Seo pageKey="contact" />
<PageHero kicker="Contact" title="Une question ? Parlons-en" accent="Parlons-en" photo={PHOTOS.heroContact}
    text="Nettoyages, formules, options ou devis : réponse sous 48 heures, ou tout de suite par téléphone." scrollLabel="Écrire un message" />
<SectionLayout {sections} />
