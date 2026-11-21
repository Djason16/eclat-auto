<script lang="ts">
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import SectionLayout from '#lib/components/ui/SectionLayout/SectionLayout.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import BookingInfo from '#lib/components/views/Booking/BookingInfo.svelte'
    import BookingLoader from '#lib/components/views/Booking/BookingLoader.svelte'

    const sections = [{ component: BookingLoader, band: 'Prendre rendez-vous' }, { component: BookingInfo, tone: 'dark' as const }]
</script>

<Seo pageKey="booking" />
<PageHero kicker="Rendez-vous en ligne" title="Réservez votre soin en deux minutes" accent="deux minutes" photo={PHOTOS.heroBooking}
    text="Choisissez la formule, les options et un créneau libre : le prix est affiché à chaque étape." scrollLabel="Commencer la réservation" />
<SectionLayout {sections} />
