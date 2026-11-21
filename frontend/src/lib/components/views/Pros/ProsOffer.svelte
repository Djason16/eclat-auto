<script lang="ts">
    import { resolve } from '$app/paths'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import IconList from '#lib/components/ui/IconList/IconList.svelte'
    import PageSection from '#lib/components/ui/PageSection/PageSection.svelte'
    import { PHOTOS } from '#lib/content/photos.js'
    import { lazyBackground } from '#lib/utils/lazyBackground.js'
    import { reveal } from '#lib/utils/reveal.js'

    /*
     * For whom: one card per kind of customer, its photo on top (gold line), the title, the text, what is done and the
     * button; three columns on a large screen, one on a phone.
     */
    const OFFERS = [
        {
            title: 'Concessionnaires automobiles', photo: PHOTOS.offerDealers,
            items: ['Préparation des véhicules neufs et d’occasion', 'Nettoyage des véhicules de courtoisie', 'Entretien régulier du parc exposé'],
            text: 'Nous prenons en charge la préparation de vos véhicules avant la livraison, le nettoyage des véhicules de courtoisie ou de location, et l’entretien complet de votre parc.',
        },
        {
            title: 'Utilitaires et poids lourds', photo: PHOTOS.offerVans,
            items: ['Nettoyage intérieur complet des cabines', 'Désinfection et dépoussiérage', 'Lavage extérieur des utilitaires'],
            text: 'Quel que soit l’état ou la taille de vos véhicules, nous avons le matériel et le savoir-faire pour nettoyer et rénover cabines, utilitaires et remorques.',
        },
        {
            title: 'Entreprises', photo: PHOTOS.offerCompanies,
            items: ['Entretien régulier des flottes', 'Contrats sur mesure', 'Service proposé à vos salariés', 'Nettoyages ponctuels ou programmés'],
            text: 'Vous cherchez un entretien ponctuel ou régulier pour votre flotte ? Nous proposons des contrats adaptés à vos besoins, et pouvons aussi proposer ce service à vos salariés.',
        },
    ]
</script>

<PageSection id="offers-title" kicker="Pour qui" title="Chaque métier, sa solution" center tone="white">
    <div class="offers aligned-cards" style:--card-rows="5" style:--card-min="18rem">
        {#each OFFERS as offer, index (offer.title)}
            <article class="premium-card aligned-card offer reveal" use:reveal={index}>
                <div class="offer-photo" use:lazyBackground={offer.photo} aria-hidden="true"></div>
                <div class="offer-body">
                    <h3 class="card-title">{offer.title}</h3>
                    <p class="offer-text">{offer.text}</p>
                    <IconList items={offer.items} />
                    <BaseButton variant="tertiary" full class="card-end" href={resolve('contact/')} title="Demander un devis : {offer.title}" iconAfter="arrowRight">Demander un devis</BaseButton>
                </div>
            </article>
        {/each}
    </div>
</PageSection>

<style>
    .offer {
        padding: 0;
        overflow: hidden;
    }

    .offer-photo {
        aspect-ratio: 16 / 9;
        border-bottom: 3px solid var(--gold);
        background: var(--lazy-photo, none) center / cover no-repeat, var(--black-3);
    }

    /* The body shares the 4 last rows of the card: titles, texts, lists and buttons line up across the cards */
    .offer-body {
        display: grid;
        grid-row: 2 / -1;
        grid-template-rows: subgrid;
        row-gap: var(--space-normal);
        padding: var(--space-large);
    }

    .offer-body > :last-child {
        align-self: end;
    }

    .offer-text {
        color: var(--text-color-muted);
    }

</style>
