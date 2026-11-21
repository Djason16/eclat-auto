<script lang="ts">
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import LegalPage from '#lib/components/views/Legal/LegalPage.svelte'
    import LegalSection from '#lib/components/views/Legal/LegalSection.svelte'
    import { BUSINESS } from '#lib/content/business.js'

    // Terms of an invented business: no real sale happens on this site
    const TERMS = [
        { title: 'Prestations', text: 'Les prestations de lavage et d’esthétique automobile sont décrites sur la page des prestations, avec leur durée estimée.' },
        { title: 'Prix', text: 'Les prix sont en euros, toutes taxes comprises, pour une citadine. Un supplément s’ajoute selon la taille du véhicule ; il est affiché avant la réservation. Le remplacement de pare-brise est fait sur devis, selon le contrat d’assurance.' },
        { title: 'Réservation', text: 'La réservation se fait en ligne sur un créneau libre. Payée en ligne, elle est confirmée tout de suite ; à régler sur place, elle est confirmée par l’atelier.' },
        { title: 'Paiement', text: 'En ligne par carte bancaire, ou sur place par carte ou en espèces, à la remise du véhicule.' },
        { title: 'Annulation', text: `Gratuite jusqu’à 24 heures avant le créneau, depuis l’espace client ; un paiement en ligne est alors remboursé sous 5 jours. Moins de 24 heures avant, appelez l’atelier au`, phone: true },
        { title: 'Satisfaction', text: 'Une réserve sur le résultat ? Signalez-la sous 48 heures : la zone concernée est reprise sans frais.' },
        { title: 'Responsabilité', text: 'Un état des lieux du véhicule est fait à son arrivée. Les objets de valeur doivent être retirés de l’habitacle avant la prestation.' },
        { title: 'Litiges', text: 'En cas de désaccord, une solution amiable est recherchée en premier ; le client peut aussi saisir gratuitement un médiateur de la consommation.' },
    ]
</script>

<Seo pageKey="terms" />
<LegalPage title="Conditions générales de vente" text="Conditions d’exemple d’une entreprise fictive : aucune vente réelle n’a lieu sur ce site." toc={TERMS.map((term) => term.title)}>
    {#each TERMS as term, index (term.title)}
        <LegalSection index={index + 1} title={term.title}>
            <p>
                {term.text}
                &#32;{#if 'phone' in term}<a class="text-link" href="tel:{BUSINESS.phoneLink}" title="Appeler l’atelier, numéro fictif">{BUSINESS.phone}</a>.{/if}
            </p>
        </LegalSection>
    {/each}
</LegalPage>
