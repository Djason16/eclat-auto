<script lang="ts">
    import AccessMap from '#lib/components/ui/Illustration/AccessMap.svelte'
    import { BUSINESS, fullAddress } from '#lib/content/business.js'

    // "Où et quand nous trouver" of the original: the map on the left, the practical details on the right
    const LINES = [
        { label: 'Atelier', value: `${fullAddress} (adresse fictive)` },
        { label: 'Accès', value: 'Tram, arrêt Quai des Bains (ligne fictive), parking gratuit à 100 mètres' },
        { label: 'Accueil', value: 'Du lundi au samedi, sur rendez-vous de préférence' },
        { label: 'Éclat garanti', value: 'Un détail ne va pas ? Nous reprenons la zone sous 48 heures.' },
    ]
</script>

<div class="access">
    <AccessMap />
    <ul class="access-lines" role="list">
        {#each LINES as line (line.label)}
            <li><strong>{line.label} :</strong> {line.value}</li>
        {/each}
        <li><strong>Adresse e-mail :</strong> <a class="text-link" href="mailto:{BUSINESS.email}" title="Écrire à Éclat Auto (adresse fictive)">{BUSINESS.email}</a></li>
        <li><strong>Téléphone :</strong> <a class="text-link" href="tel:{BUSINESS.phoneLink}" title="Appeler Éclat Auto (numéro fictif)">{BUSINESS.phone}</a></li>
    </ul>
</div>

<style>
    .access {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--space-xlarge);
        align-items: start;
    }

    .access-lines {
        display: grid;
        gap: var(--space-normal);
    }

    strong {
        color: var(--gold-dark);
    }

    a {
        overflow-wrap: anywhere;
    }

    @media (max-width: 900px) {
        .access {
            grid-template-columns: 1fr;
        }
    }
</style>
