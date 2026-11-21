<script lang="ts">
    import { resolve } from '$app/paths'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import LegalPage from '#lib/components/views/Legal/LegalPage.svelte'
    import LegalSection from '#lib/components/views/Legal/LegalSection.svelte'

    // Titles of the parts, shown in the table of contents
    const TOC = [
        'Données saisies',
        'Mots de passe et paiement',
        'Mesure d’audience et services tiers',
        'Dans la vraie version',
        'Tout effacer',
    ]
</script>

<Seo pageKey="privacy" />
<LegalPage title="Politique de confidentialité" text="Ce que la démonstration garde, où, et comment tout effacer." toc={TOC}>
    <LegalSection index={1} title={TOC[0] ?? ''}>
        <p>
            Les comptes, réservations, messages et changements faits dans l’administration sont enregistrés dans le stockage local
            (localStorage) de votre navigateur, sur votre appareil. Rien ne quitte votre navigateur : pas de serveur, pas d’e-mail envoyé.
        </p>
    </LegalSection>
    <LegalSection index={2} title={TOC[1] ?? ''}>
        <p>
            Un mot de passe n’est jamais gardé en clair : seule son empreinte (SHA-256) est enregistrée. Le paiement est simulé : aucun
            numéro de carte n’est enregistré ni transmis, aucun prestataire de paiement n’est contacté.
        </p>
    </LegalSection>
    <LegalSection index={3} title={TOC[2] ?? ''}>
        <p>Aucun outil de mesure, aucune publicité, aucune carte chargée depuis un autre site : le plan d’accès est un dessin.</p>
    </LegalSection>
    <LegalSection index={4} title={TOC[3] ?? ''}>
        <p>
            Les données d’une réservation (nom, e-mail, téléphone, véhicule) serviraient seulement à gérer le rendez-vous et seraient
            gardées 3 ans après le dernier contact. Vous pourriez y accéder, les corriger ou les faire effacer en écrivant à l’atelier.
        </p>
    </LegalSection>
    <LegalSection index={5} title={TOC[4] ?? ''}>
        <p>
            Le bouton « Remettre à zéro », en haut de chaque page, efface tout ce que vous avez fait. Voir aussi la
            <a class="text-link" href={resolve('cookies/')} title="Lire la politique cookies">politique cookies</a>.
        </p>
    </LegalSection>
</LegalPage>
