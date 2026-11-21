<script lang="ts">
    import { resolve } from '$app/paths'
    import Seo from '#lib/components/ui/Seo/Seo.svelte'
    import LegalPage from '#lib/components/views/Legal/LegalPage.svelte'
    import LegalSection from '#lib/components/views/Legal/LegalSection.svelte'
    import { BUSINESS, CREDITS, DESIGNER, GENERATOR, fullAddress } from '#lib/content/business.js'
    import { PHOTO_CREDITS } from '#lib/content/photos.js'

    // Titles of the parts, shown in the table of contents
    const TOC = [
        'Informations sur le propriétaire du site',
        'Hébergeur du site',
        'Propriété intellectuelle',
        'Crédits des photos et de la police',
        'Données personnelles',
        'Conception et développement',
    ]
</script>

<Seo pageKey="legal" />
<LegalPage title="Mentions légales" text="Informations légales relatives au site et à son utilisation. Éclat Auto est une entreprise fictive." toc={TOC}>
    <LegalSection index={1} title={TOC[0] ?? ''}>
        <ul>
            <li><strong>Nom de l’entreprise :</strong> {BUSINESS.name} ({BUSINESS.legalForm})</li>
            <li><strong>Immatriculation :</strong> {BUSINESS.registration}</li>
            <li><strong>Adresse :</strong> {fullAddress} (adresse fictive)</li>
            <li><strong>Téléphone :</strong> <a class="text-link" href="tel:{BUSINESS.phoneLink}" title="Appeler l’atelier, numéro fictif">{BUSINESS.phone}</a></li>
            <li><strong>E-mail :</strong> <a class="text-link" href="mailto:{BUSINESS.email}" title="Écrire à l’atelier, adresse fictive">{BUSINESS.email}</a></li>
            <li><strong>Directeur de la publication :</strong> {BUSINESS.director}</li>
        </ul>
    </LegalSection>
    <LegalSection index={2} title={TOC[1] ?? ''}>
        <p>Site statique hébergé par Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis. Aucun serveur de l’atelier ne reçoit vos données.</p>
    </LegalSection>
    <LegalSection index={3} title={TOC[2] ?? ''}>
        <p>Les textes, la mise en page et le code de ce site appartiennent à leur auteur. Toute reproduction sans autorisation préalable est interdite.</p>
    </LegalSection>
    <LegalSection index={4} title={TOC[3] ?? ''}>
        <ul>
            {#each PHOTO_CREDITS as photo (photo.url)}
                <li>
                    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- outside address (Wikimedia Commons) -->
                    <a class="text-link" href={photo.url} title="Voir la photo d’origine sur Wikimedia Commons" rel="noopener">{photo.title}</a>,
                    {photo.author}, {photo.license} (recadrée, floutée et assombrie, partagée sous la même licence)
                </li>
            {/each}
            {#each CREDITS as credit (credit)}
                <li>{credit}</li>
            {/each}
        </ul>
    </LegalSection>
    <LegalSection index={5} title={TOC[4] ?? ''}>
        <p>
            Voir la <a class="text-link" href={resolve('confidentialite/')} title="Lire la politique de confidentialité">politique de confidentialité</a>
            et la <a class="text-link" href={resolve('cookies/')} title="Lire la politique cookies">politique cookies</a>.
        </p>
    </LegalSection>
    <LegalSection index={6} title={TOC[5] ?? ''}>
        <ul>
            <li>
                <strong>Conception et développement :</strong>
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- outside address (portfolio) -->
                <a class="text-link" href={DESIGNER.href} title={DESIGNER.title} target="_blank" rel="noopener">{DESIGNER.name}</a>, développeur web
            </li>
            <li>
                <strong>Réalisé avec :</strong>
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- outside address (tools.djason-chery.dev) -->
                <a class="text-link" href={GENERATOR.href} title={GENERATOR.title} target="_blank" rel="noopener">{GENERATOR.name}</a>, le générateur de projets de l’auteur
            </li>
        </ul>
        <p>Ce site est la refonte d’un site de station de lavage dont tout le contenu réel a été remplacé par du contenu inventé.</p>
    </LegalSection>
</LegalPage>
