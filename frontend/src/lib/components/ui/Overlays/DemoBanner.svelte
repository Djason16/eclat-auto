<script lang="ts">
    import { resolve } from '$app/paths'
    import { page } from '$app/state'
    import { resetDemo } from '#lib/stores/actions/demoActions.js'
    import { askConfirm, notify, startTour } from '#lib/stores/actions/uiActions.js'

    const reset = async () => {
        const confirmed = await askConfirm({
            title: 'Remettre la démo à zéro ?',
            text: 'Vos réservations, comptes, messages et changements de tarifs faits dans ce navigateur seront effacés.',
            confirmLabel: 'Tout remettre à zéro',
            danger: true,
        })
        if (!confirmed) return
        resetDemo()
        notify('La démo est revenue à ses données de départ')
    }

    const featuresPath = resolve('fonctionnalites/')
</script>

<!-- Thin banner at the very top of every page: this is a demo of a fictional business, with the tools of the demo -->
<div class="demo-banner">
    <div class="container">
        <p><strong>Site de démonstration</strong>&#32;<span class="demo-banner-detail">· entreprise fictive, paiements et e-mails simulés</span></p>
        <ul aria-label="Outils de la démonstration">
            <li><a class="demo-banner-link" href={featuresPath} title="Voir tout ce que comprend ce site"
                aria-current={page.url.pathname === featuresPath ? 'page' : undefined}>Ce que comprend ce site</a></li>
            <li><button type="button" class="demo-banner-link" onclick={startTour}>Visite guidée</button></li>
            <li><button type="button" class="demo-banner-link" onclick={reset}>Remettre à zéro</button></li>
        </ul>
    </div>
</div>
