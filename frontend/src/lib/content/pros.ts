import type { IconName } from '#lib/utils/icons.js'

// Texts of the professionals page (fictive business: the figures and the testimonial are invented, the page says so)

export const BENEFITS: { icon: IconName, title: string, text: string }[] = [
    { icon: 'truck', title: 'Sur place ou à l’atelier', text: 'Nous venons sur votre parking, ou vos véhicules passent à l’atelier selon vos contraintes.' },
    { icon: 'calendar', title: 'Tournées programmées', text: 'Un passage chaque semaine ou chaque mois, sur les créneaux qui ne gênent pas vos équipes.' },
    { icon: 'euro', title: 'Facture mensuelle', text: 'Une seule facture par mois, détaillée par véhicule, avec le suivi des passages.' },
    { icon: 'user', title: 'Interlocuteur dédié', text: 'Une personne connaît votre parc et répond à vos demandes, sans standard.' },
    { icon: 'bolt', title: 'Créneaux prioritaires', text: 'Un véhicule à préparer en urgence ? Il passe en priorité dans la journée.' },
]

export const PLANS = [
    {
        name: 'Ponctuel', price: 'dès 39 €', unit: 'par véhicule', featured: false,
        text: 'Pour une remise en état avant une vente, une restitution ou un événement.',
        items: ['Formules du site au tarif pro', 'Sans engagement', 'Paiement à la prestation'],
    },
    {
        name: 'Abonnement flotte', price: 'dès 29 €', unit: 'par véhicule et par mois', featured: true,
        text: 'L’entretien régulier de vos véhicules de service, intérieur et extérieur.',
        items: ['Passages programmés', 'Facture mensuelle', 'Interlocuteur dédié', 'Créneaux prioritaires'],
    },
    {
        name: 'Concession et loueur', price: 'Sur devis', unit: 'selon le volume', featured: false,
        text: 'Préparation des véhicules neufs et d’occasion, retours de location, véhicules de courtoisie.',
        items: ['Préparation avant livraison', 'Équipe sur site possible', 'Rapport photo par véhicule'],
    },
]

export const PRO_STEPS: { icon: IconName, title: string, text: string }[] = [
    { icon: 'message', title: 'Échange', text: 'Vous nous décrivez votre parc, vos lieux et votre rythme.' },
    { icon: 'tag', title: 'Devis', text: 'Une proposition claire sous 48 heures, au véhicule ou au forfait.' },
    { icon: 'calendar', title: 'Planning', text: 'Les passages sont calés sur vos horaires, sans immobiliser vos équipes.' },
    { icon: 'chart', title: 'Suivi', text: 'Un rapport par passage et une facture mensuelle détaillée.' },
]

// Invented figures and names: no real customer behind them
export const FIGURES = [
    { value: '12 400', label: 'véhicules traités par an (fictif)' },
    { value: '85', label: 'entreprises clientes (fictif)' },
    { value: '4,9 / 5', label: 'note moyenne des pros (fictive)' },
    { value: '48 h', label: 'pour recevoir un devis' },
]

export const PARTNERS = ['Garage des Tilleuls', 'LocaVille', 'Transports Rivière', 'Auto Concept Ouest', 'Atlantique Services']

export const PRO_TESTIMONIAL = {
    text: 'Nos 40 utilitaires sont nettoyés tous les mois sur notre parking, sans perdre une heure de tournée. La facture mensuelle simplifie tout.',
    author: 'Marc T., responsable de flotte, Transports Rivière (témoignage fictif)',
}

export const PRO_FAQ = [
    { question: 'Intervenez-vous sur notre site ?', answer: 'Oui, dès 5 véhicules par passage : l’équipe vient avec son matériel et l’eau nécessaire. En dessous, les véhicules passent à l’atelier.' },
    { question: 'Comment est calculé le prix ?', answer: 'Au véhicule selon sa taille et la formule, ou au forfait mensuel pour une flotte. Le devis détaille tout avant de commencer.' },
    { question: 'Peut-on changer le rythme des passages ?', answer: 'Oui, d’un mois sur l’autre, en prévenant votre interlocuteur une semaine avant.' },
    { question: 'Quels documents recevons-nous ?', answer: 'Un rapport par passage (véhicules traités, remarques, photos si demandé) et une facture mensuelle.' },
]
