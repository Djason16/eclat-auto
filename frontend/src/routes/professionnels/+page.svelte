<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Faq from '#lib/components/ui/Faq/Faq.svelte'
    import PageHero from '#lib/components/ui/PageHero/PageHero.svelte'
    import SectionHead from '#lib/components/ui/SectionHead/SectionHead.svelte'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import Steps from '#lib/components/ui/Steps/Steps.svelte'
    import ProsBenefits from '#lib/components/views/Pros/ProsBenefits.svelte'
    import ProsInfo from '#lib/components/views/Pros/ProsInfo.svelte'
    import ProsOffer from '#lib/components/views/Pros/ProsOffer.svelte'
    import ProsPlans from '#lib/components/views/Pros/ProsPlans.svelte'
    import ProsQuote from '#lib/components/views/Pros/ProsQuote.svelte'
    import ProsTrust from '#lib/components/views/Pros/ProsTrust.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import { PRO_FAQ, PRO_STEPS } from '#lib/content/pros.js'
</script>

<Seo pageKey="pros" />
<PageHero kicker="Professionnels" title="Une flotte toujours impeccable" accent="impeccable" photo={PHOTOS.heroPros}
    text="Concessions, loueurs, utilitaires et entreprises : des contrats sur mesure, sans immobiliser vos équipes." scrollLabel="Voir les offres">
    <BaseButton variant="primary" href={resolve('contact/')} title="Demander un devis" icon="mail">Demander un devis</BaseButton>
</PageHero>
<ProsBenefits />
<ProsPlans />
<ProsOffer />
<Steps id="pro-steps-title" kicker="Comment ça marche" title="De la demande au premier passage"
    text="Un devis sous 48 heures, puis un planning calé sur vos horaires." items={PRO_STEPS} />
<ProsTrust />
<Faq id="pro-faq-title" kicker="Questions des pros" title="Ce que les entreprises nous demandent" items={PRO_FAQ} white />
<ProsInfo />
<!-- Last block before the footer: dark, the form in a white card (no light block touching the footer) -->
<section class="section surface-dark texture-dark" aria-labelledby="quote-title">
    <div class="container">
        <SectionHead id="quote-title" kicker="Devis gratuit" title="Demander un devis" text="Réponse sous 48 heures, sans engagement." center />
        <div class="light-card">
            <ProsQuote />
        </div>
    </div>
</section>
