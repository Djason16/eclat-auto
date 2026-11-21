<script lang="ts">
    import { resolve } from '$app/paths'
    import { page } from '$app/state'
    import BaseButton from '#lib/components/ui/BaseButton/BaseButton.svelte'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import ShapeDivider from '#lib/components/ui/ShapeDivider/ShapeDivider.svelte'
    import { BUSINESS, DESIGNER } from '#lib/content/business.js'
    import { userPreferences } from '#lib/stores/userPreferences.svelte.js'

    const year = new Date().getFullYear()

    // aria-current on the link of the page being read (gold, like the header)
    const current = (href: string) => (page.url.pathname === href ? 'page' : undefined)
</script>

<!-- Bottom of every page, from the original: slanted edge, help block, four small columns, copyright and payment -->
<footer class="footer">
    <ShapeDivider direction="up" />
    <div class="footer-container">
        <div class="footer-top">
            <div class="footer-help">
                <h2 class="text-normal">Besoin d’aide ou d’un devis ?</h2>
                <p>
                    Une question ou un devis ?
                    <a class="text-link" href="mailto:{BUSINESS.email}" title="Écrire à Éclat Auto (adresse fictive)">Contactez-nous par mail</a>
                    ou cliquez sur le bouton ci-dessous.
                </p>
                <BaseButton variant="primary" size="small" full href={resolve('contact/')} title="Nous contacter">Contactez-nous</BaseButton>
            </div>

            <div class="footer-links">
                <div>
                    <h3><a href={resolve('contact/')} title="Nous contacter" aria-current={current(resolve('contact/'))}>Contact</a></h3>
                    <ul role="list">
                        <li><a href="tel:{BUSINESS.phoneLink}" title="Appeler Éclat Auto (numéro fictif)">{BUSINESS.phone}</a></li>
                        <li>{BUSINESS.street}, {BUSINESS.city}</li>
                    </ul>
                </div>
                <div>
                    <h3>Découvrir</h3>
                    <ul role="list">
                        <li><a href={resolve('professionnels/')} title="Offre pour les professionnels" aria-current={current(resolve('professionnels/'))}>Professionnels</a></li>
                        <li><a href={resolve('horaires-acces/')} title="Voir la carte et les horaires" aria-current={current(resolve('horaires-acces/'))}>Carte et horaires</a></li>
                        <li><a href={resolve('fonctionnalites/')} title="Voir tout ce que comprend ce site" aria-current={current(resolve('fonctionnalites/'))}>Ce que comprend ce site</a></li>
                    </ul>
                </div>
                <div>
                    <h3><a href={resolve('horaires-acces/')} title="Voir la carte et les horaires" aria-current={current(resolve('horaires-acces/'))}>Horaires</a></h3>
                    <ul role="list">
                        <li>Du lundi au vendredi : 8 h 30 à 19 h</li>
                        <li>Samedi : 9 h à 17 h</li>
                        <li>Dimanche : Fermé</li>
                    </ul>
                </div>
                <div>
                    <h3>Informations légales</h3>
                    <ul role="list">
                        <li><a href={resolve('mentions-legales/')} title="Lire les mentions légales" aria-current={current(resolve('mentions-legales/'))}>Mentions légales</a></li>
                        <li><a href={resolve('cgv/')} title="Lire les conditions générales de vente" aria-current={current(resolve('cgv/'))}>Conditions générales de vente</a></li>
                        <li><a href={resolve('confidentialite/')} title="Lire la politique de confidentialité" aria-current={current(resolve('confidentialite/'))}>Politique de confidentialité</a></li>
                        <li><a href={resolve('cookies/')} title="Lire la politique de cookies" aria-current={current(resolve('cookies/'))}>Politique de cookies</a></li>
                        <li><button type="button" class="footer-link" onclick={() => userPreferences.openSettings()}>Gérer les cookies</button></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© {year} {BUSINESS.name}. Entreprise fictive, site de démonstration.</p>
            <p>
                Site conçu et réalisé par
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- outside address (portfolio) -->
                <a class="text-link" href={DESIGNER.href} title={DESIGNER.title} target="_blank" rel="noopener">{DESIGNER.name}</a>
            </p>
            <p class="footer-payment"><Icon name="card" label="Carte bancaire" /> Paiement sécurisé (simulé)</p>
        </div>
    </div>
</footer>
