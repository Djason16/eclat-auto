<script lang="ts">
    import { resolve } from '$app/paths'
    import Icon from '#lib/components/ui/Icon/Icon.svelte'
    import { BUSINESS, fullAddress } from '#lib/content/business.js'
    import LazyMount from '#lib/components/ui/LazyMount/LazyMount.svelte'
</script>

<!-- Contact page: a short introduction and the quick contacts next to it, then the form over the whole width -->
<div class="contact-head mb-l">
    <div class="stack gap-s">
        <h2 class="text-large">Nous sommes heureux de recevoir vos questions, commentaires et suggestions.</h2>
        <p>Remplissez le formulaire ci-dessous afin que nous puissions vous aider. Nous vous répondrons dès que possible.</p>
    </div>
    <ul class="contact-quick" role="list" aria-label="Nous joindre directement">
        <li><a class="icon-link" href="tel:{BUSINESS.phoneLink}" title="Appeler l’atelier (numéro fictif)"><Icon name="phone" /><span>{BUSINESS.phone}</span></a></li>
        <li><a class="icon-link" href="mailto:{BUSINESS.email}" title="Écrire à Éclat Auto (adresse fictive)"><Icon name="mail" /><span>{BUSINESS.email}</span></a></li>
        <li><a class="icon-link" href={resolve('horaires-acces/')} title="Voir le plan et les horaires"><Icon name="pin" /><span>{fullAddress}</span></a></li>
    </ul>
</div>
<LazyMount load={() => import('./MessageForm.svelte')} props={{}} label="Chargement du formulaire" />

<style>
    .contact-head {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
        align-items: start;
        gap: var(--space-large);
    }

    .contact-quick {
        display: grid;
        gap: var(--space-small);
        padding: var(--space-normal) var(--space-large);
        border: 1px solid var(--border-color);
        border-left: 3px solid var(--gold);
        background-color: var(--white);
        list-style: none;
    }

    .contact-quick a {
        padding-block: var(--space-xs);
        overflow-wrap: anywhere;
    }

    @media (max-width: 768px) {
        .contact-head {
            grid-template-columns: 1fr;
        }
    }
</style>
