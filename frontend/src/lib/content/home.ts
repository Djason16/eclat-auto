import type { IconName } from '#lib/utils/icons.js'

// Texts of the home page sections added to the original: how it works, reviews (fictive), questions

export const STEPS: { icon: IconName, title: string, text: string }[] = [
    { icon: 'sparkle', title: 'Choisissez', text: 'Une prestation, une formule et vos options, avec le prix affiché tout de suite.' },
    { icon: 'calendar', title: 'Réservez', text: 'Un créneau libre en temps réel, payé en ligne ou sur place.' },
    { icon: 'car', title: 'Déposez', text: 'Vous laissez la voiture à l’atelier, ou nous la prenons en charge sur place.' },
    { icon: 'shine', title: 'Récupérez', text: 'Une voiture nette et brillante, contrôlée point par point avec vous.' },
]

// Invented reviews: the demo says so on the page, there is no real customer behind them
export const REVIEWS = [
    { name: 'Sophie L.', car: 'Peugeot 3008', rating: 5, text: 'Intérieur méconnaissable après la formule Signature : les sièges ont retrouvé leur couleur. Rendez-vous pris en deux minutes.' },
    { name: 'Karim B.', car: 'Renault Clio', rating: 5, text: 'Lavage à la main soigné, jantes impeccables, et le prix affiché était le prix payé. Je reviens tous les mois.' },
    { name: 'Hélène D.', car: 'Volvo XC60', rating: 4, text: 'La céramique tient ses promesses : l’eau perle encore après trois mois. Un peu d’attente au retrait, mais résultat parfait.' },
]

export const FAQ = [
    {
        question: 'Combien de temps dure une prestation ?',
        answer: 'De 45 minutes pour l’Intérieur Express à 6 heures pour la Céramique 3 ans. La durée est affichée sur chaque formule et le créneau réservé en tient compte.',
    },
    {
        question: 'Le prix change-t-il selon le véhicule ?',
        answer: 'Oui : citadine au prix affiché, puis un supplément pour une berline, un SUV ou un utilitaire. Le total exact apparaît pendant la réservation, avant de payer.',
    },
    {
        question: 'Faut-il créer un compte pour réserver ?',
        answer: 'Non. Un compte permet seulement de retrouver vos rendez-vous et de remplir vos informations plus vite la fois suivante.',
    },
    {
        question: 'Puis-je annuler ou déplacer mon rendez-vous ?',
        answer: 'Oui, depuis votre compte jusqu’à 24 heures avant, ou par téléphone. Un paiement en ligne est alors remboursé.',
    },
    {
        question: 'Mon pare-brise est-il pris en charge par l’assurance ?',
        answer: 'Avec une garantie bris de glace, le plus souvent oui : nous faisons les démarches avec votre assureur et le prix dépend de votre contrat.',
    },
]
