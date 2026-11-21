import { resolve } from '$app/paths'
import type { IconName } from '#lib/utils/icons.js'

/*
 * Texts of the page "Ce que comprend ce site" (/fonctionnalites/): the features of the demo grouped by area, each with
 * its pictogram, a short title, one sentence and a direct way to the screen (a link, or a button that opens the sign-in
 * window or the cookie settings). Then what is simulated here and what a real site would do instead.
 */
export interface FeatureLink {
    label: string
    title: string
    href?: string
    // Instead of a page: opens the sign-in window (demo accounts) or the cookie settings
    action?: 'auth' | 'cookies'
}

export interface FeatureItem {
    icon: IconName
    title: string
    text: string
    link?: FeatureLink
}

export interface FeatureGroup {
    id: string
    kicker: string
    title: string
    text: string
    items: FeatureItem[]
}

const signIn: FeatureLink = { label: 'Ouvrir la connexion', title: 'Ouvrir la fenêtre de connexion et ses comptes de démonstration', action: 'auth' }

export const FEATURE_GROUPS: FeatureGroup[] = [
    {
        id: 'showcase',
        kicker: 'Vitrine',
        title: 'Un site qui donne envie de réserver',
        text: 'Les pages publiques présentent l’atelier, ses prix et ses résultats, avec un chemin court vers la réservation.',
        items: [
            { icon: 'sparkle', title: 'Accueil complet', text: 'Étapes, tarifs par catégorie, avant / après à faire glisser, avis, questions fréquentes et bandeau final.',
                link: { label: 'Voir l’accueil', title: 'Voir la page d’accueil', href: resolve('/') } },
            { icon: 'tag', title: 'Prestations comparées', text: 'Filtres par catégorie, formules côte à côte, supplément selon le véhicule et options à la carte.',
                link: { label: 'Voir les prestations', title: 'Voir les prestations et les tarifs', href: resolve('prestations/') } },
            { icon: 'pin', title: 'Horaires et accès', text: 'Plan dessiné pour le site, sans service de cartes ni suivi, horaires et conseils de stationnement.',
                link: { label: 'Voir le plan', title: 'Voir le plan et les horaires', href: resolve('horaires-acces/') } },
        ],
    },
    {
        id: 'booking',
        kicker: 'Réservation en ligne',
        title: 'Un rendez-vous en six étapes',
        text: 'Le client choisit, voit le prix bouger en direct et repart avec une confirmation claire.',
        items: [
            { icon: 'car', title: 'Six étapes guidées', text: 'Service, véhicule et formule, options, informations, date et récapitulatif modifiable avant de payer.',
                link: { label: 'Réserver en ligne', title: 'Commencer une réservation en ligne', href: resolve('reservation/') } },
            { icon: 'calendar', title: 'Créneaux réels', text: 'Le calendrier ne propose que les heures libres, selon les horaires, les jours fermés et les autres rendez-vous.',
                link: { label: 'Voir les créneaux', title: 'Choisir un créneau dans la réservation', href: resolve('reservation/') } },
            { icon: 'card', title: 'Paiement simulé', text: 'Carte de test 4242 4242 4242 4242 acceptée, 4000 0000 0000 0002 refusée : aucun prestataire n’est appelé.',
                link: { label: 'Essayer le paiement', title: 'Aller jusqu’au paiement simulé de la réservation', href: resolve('reservation/') } },
            { icon: 'download', title: 'Confirmation complète', text: 'Récapitulatif, fichier agenda .ics à télécharger et aperçu de l’e-mail que recevrait le client.',
                link: { label: 'Réserver pour voir', title: 'Réserver pour voir la confirmation', href: resolve('reservation/') } },
        ],
    },
    {
        id: 'account',
        kicker: 'Espace client',
        title: 'Le client suit ses rendez-vous',
        text: 'Une fenêtre « Connexion / Inscription », puis un espace personnel clair.',
        items: [
            { icon: 'user', title: 'Comptes de démonstration', text: 'Un client et un administrateur, ouverts en un clic depuis la fenêtre de connexion.', link: signIn },
            { icon: 'chart', title: 'Tableau de bord', text: 'Prochain rendez-vous, réservations à venir, soins réalisés et total réglé.',
                link: { label: 'Ouvrir mon espace', title: 'Ouvrir l’espace client', href: resolve('mon-espace/') } },
            { icon: 'clock', title: 'Annulation encadrée', text: 'Un rendez-vous s’annule en ligne jusqu’à 24 heures avant, comme le disent les conditions de vente.',
                link: { label: 'Voir mes réservations', title: 'Voir les réservations de l’espace client', href: resolve('mon-espace/') } },
            { icon: 'shield', title: 'Informations et documents', text: 'Coordonnées modifiables, documents compressés dans le navigateur, suppression du compte.',
                link: { label: 'Gérer mon compte', title: 'Gérer les informations du compte client', href: resolve('mon-espace/') } },
        ],
    },
    {
        id: 'admin',
        kicker: 'Administration',
        title: 'L’atelier se gère sans toucher au code',
        text: 'Avec le compte administrateur, chaque écran se met à jour pour tout le site.',
        items: [
            { icon: 'check', title: 'Réservations', text: 'Chiffres clés, filtres par statut, recherche, confirmation et annulation des rendez-vous.',
                link: { label: 'Voir les réservations', title: 'Ouvrir les réservations de l’administration', href: resolve('admin/') } },
            { icon: 'calendar', title: 'Calendrier des disponibilités', text: 'Chaque jour en couleur selon ses places libres, ses créneaux à ouvrir ou fermer d’un clic.',
                link: { label: 'Ouvrir le calendrier', title: 'Ouvrir le calendrier des disponibilités', href: resolve('admin/disponibilites/') } },
            { icon: 'clock', title: 'Horaires de la semaine', text: 'Un interrupteur Ouvert / Fermé et les heures de chaque jour, qui changent les créneaux proposés.',
                link: { label: 'Régler les horaires', title: 'Régler les horaires de la semaine', href: resolve('admin/disponibilites/') } },
            { icon: 'euro', title: 'Tarifs', text: 'Prix, durées et visibilité de chaque prestation, repris partout sur le site.',
                link: { label: 'Modifier les tarifs', title: 'Modifier les tarifs des prestations', href: resolve('admin/tarifs/') } },
            { icon: 'message', title: 'Messages', text: 'Les demandes de contact et de devis arrivent ici, à lire puis à traiter.',
                link: { label: 'Lire les messages', title: 'Lire les messages reçus', href: resolve('admin/messages/') } },
            { icon: 'user', title: 'Utilisateurs', text: 'Comptes, rôles et documents envoyés par les clients.',
                link: { label: 'Voir les utilisateurs', title: 'Voir les comptes des utilisateurs', href: resolve('admin/utilisateurs/') } },
        ],
    },
    {
        id: 'pros',
        kicker: 'Professionnels et contact',
        title: 'Les entreprises et les questions ont leur place',
        text: 'Une page dédiée aux flottes et deux formulaires qui alimentent les messages de l’administration.',
        items: [
            { icon: 'truck', title: 'Offre professionnelle', text: 'Atouts, trois formules, cartes par métier, étapes, chiffres et questions des pros.',
                link: { label: 'Voir l’offre pro', title: 'Voir l’offre pour les professionnels', href: resolve('professionnels/') } },
            { icon: 'mail', title: 'Demande de devis', text: 'Un formulaire pensé pour les flottes : entreprise, taille de la flotte et besoin, réponse promise sous 48 heures.',
                link: { label: 'Demander un devis', title: 'Remplir la demande de devis des professionnels', href: resolve('professionnels/') } },
            { icon: 'phone', title: 'Page contact', text: 'Formulaire de message, avec le téléphone, l’e-mail et l’adresse cliquables juste à côté.',
                link: { label: 'Écrire un message', title: 'Ouvrir la page contact', href: resolve('contact/') } },
        ],
    },
    {
        id: 'legal',
        kicker: 'Pages légales et cookies',
        title: 'Tout ce que la loi demande',
        text: 'Des pages lisibles, avec un sommaire qui suit la lecture, et un vrai choix pour les cookies.',
        items: [
            { icon: 'info', title: 'Mentions légales', text: 'Éditeur, hébergeur, conception du site et crédits de chaque photo.',
                link: { label: 'Lire les mentions', title: 'Lire les mentions légales', href: resolve('mentions-legales/') } },
            { icon: 'euro', title: 'Conditions de vente', text: 'Réservation, paiement, annulation et réclamation, en clair.',
                link: { label: 'Lire les CGV', title: 'Lire les conditions générales de vente', href: resolve('cgv/') } },
            { icon: 'eye', title: 'Confidentialité', text: 'Quelles données sont gardées, où, pour combien de temps et comment les effacer.',
                link: { label: 'Lire la politique', title: 'Lire la politique de confidentialité', href: resolve('confidentialite/') } },
            { icon: 'settings', title: 'Choix des cookies', text: 'Une bannière au premier passage et des réglages qui se rouvrent à tout moment.',
                link: { label: 'Gérer les cookies', title: 'Ouvrir les réglages des cookies', action: 'cookies' } },
        ],
    },
    {
        id: 'quality',
        kicker: 'Qualité',
        title: 'Rapide, accessible et bien référencé',
        text: 'Ce qui ne se voit pas, mais que les visiteurs et les moteurs de recherche sentent tout de suite.',
        items: [
            { icon: 'bolt', title: 'Performance', text: 'Pages statiques, photos légères à la bonne taille, Lighthouse à 95 et plus sur téléphone.' },
            { icon: 'eye', title: 'Accessibilité', text: 'Clavier partout, contrastes AA, textes pour les lecteurs d’écran et fenêtres qui ne bougent pas la page.' },
            { icon: 'star', title: 'Référencement', text: 'Adresses en français, titres et descriptions par page, plan du site et données structurées.' },
            { icon: 'seat', title: 'Dès 320 pixels', text: 'Chaque page reste lisible et utilisable sur les plus petits téléphones, en largeur comme en hauteur.' },
        ],
    },
]

// What the demo simulates, and what a real site would do instead
export const SIMULATED = [
    { icon: 'download' as IconName, topic: 'Données', demo: 'Gardées dans ce navigateur, effacées par « Remettre à zéro ».', real: 'Une base de données sur un serveur, sauvegardée chaque jour.' },
    { icon: 'card' as IconName, topic: 'Paiement', demo: 'Cartes de test, aucun prestataire contacté.', real: 'Un vrai paiement sécurisé (Stripe ou autre), avec remboursements.' },
    { icon: 'mail' as IconName, topic: 'E-mails', demo: 'Un aperçu à l’écran, rien ne part.', real: 'Confirmation, rappel la veille et messages envoyés pour de vrai.' },
    { icon: 'shield' as IconName, topic: 'Comptes', demo: 'Empreinte du mot de passe gardée dans le navigateur.', real: 'Comptes sur le serveur, lien de mot de passe oublié par e-mail.' },
    { icon: 'calendar' as IconName, topic: 'Créneaux', demo: 'Calculés pour vous seul, avec les mêmes règles.', real: 'Partagés entre tous les clients : un créneau pris disparaît pour les autres.' },
    { icon: 'quote' as IconName, topic: 'Contenus', demo: 'Entreprise, avis et chiffres inventés.', real: 'Vos textes, vos photos et les vrais avis de vos clients.' },
]
