<script lang="ts">
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import SectionLayout from '#lib/components/ui/SectionLayout/SectionLayout.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import AccountInfo from '#lib/components/views/Account/AccountInfo.svelte'
    import AccountManage from '#lib/components/views/Account/AccountManage.svelte'
    import { PHOTOS } from '#lib/content/photos.js'

    // "Mon compte" of the original: the details and reservations, then the actions on the account
    const sections = [{ component: AccountInfo, band: 'Informations du compte' }, { component: AccountManage, tone: 'dark' as const }]
</script>

<Seo pageKey="account" />
<PageHero kicker="Mon compte" title="Votre espace, vos rendez-vous" accent="vos rendez-vous" photo={PHOTOS.heroAccount}
    text="Vos informations, vos documents et vos réservations, au même endroit." scrollLabel="Voir mon compte" />
<SectionLayout {sections} />
