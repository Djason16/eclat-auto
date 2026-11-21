import type { Catalog, Category, CategoryId } from '#lib/types.js'
import type { IconName } from '#lib/utils/icons.js'

// Categories of services, in the order of the price page and of the booking
export const CATEGORIES: Category[] = [
    { id: 'interior', name: 'Nettoyage intérieur', tagline: 'Un habitacle sain, net et rafraîchi' },
    { id: 'complete', name: 'Formules tout-en-un', tagline: 'Intérieur et extérieur, de A à Z' },
    { id: 'polish', name: 'Polissage et céramique', tagline: 'Brillance retrouvée, protection durable' },
    { id: 'windshield', name: 'Pare-brise et assurances', tagline: 'Réparation ou remplacement, avec votre assurance' },
]

// Pictograms of the categories and of the vehicle sizes (services page, booking)
export const CATEGORY_ICONS: Record<CategoryId, IconName> = { interior: 'seat', complete: 'sparkle', polish: 'shine', windshield: 'windshield' }
export const VEHICLE_ICONS: Record<string, IconName> = { city: 'city', sedan: 'sedan', suv: 'suv', van: 'van' }

// Starting catalog of the demo (the admin can change prices, durations and visibility; kept in this browser)
export const SEED_CATALOG: Catalog = {
    services: [
        {
            id: 'interior-express', category: 'interior', name: 'Intérieur Express', price: 3490, duration: 45, featured: false, active: true, quoteOnly: false,
            summary: 'Le coup de propre rapide pour les conducteurs pressés.',
            details: ['Aspiration de l’habitacle', 'Vitres intérieures', 'Dépoussiérage du tableau de bord'],
        },
        {
            id: 'interior-comfort', category: 'interior', name: 'Intérieur Confort', price: 5490, duration: 60, featured: true, active: true, quoteOnly: false,
            summary: 'Un intérieur propre et sain, coffre compris.',
            details: ['Aspiration habitacle et coffre', 'Désinfection des surfaces', 'Plastiques nettoyés et nourris', 'Shampouinage des tapis'],
        },
        {
            id: 'interior-signature', category: 'interior', name: 'Intérieur Signature', price: 7990, duration: 120, featured: false, active: true, quoteOnly: false,
            summary: 'La remise à neuf complète de l’habitacle.',
            details: ['Aspiration en profondeur', 'Désinfection intégrale à la vapeur', 'Rénovation des plastiques', 'Shampouinage des sièges et des tapis'],
        },
        {
            id: 'complete-essential', category: 'complete', name: 'Complète Essentielle', price: 7490, duration: 90, featured: false, active: true, quoteOnly: false,
            summary: 'Propre dedans comme dehors, sans y passer la journée.',
            details: ['Aspiration et vitres intérieures', 'Lavage manuel de la carrosserie', 'Jantes nettoyées', 'Séchage à la microfibre'],
        },
        {
            id: 'complete-excellence', category: 'complete', name: 'Complète Excellence', price: 10990, duration: 120, featured: true, active: true, quoteOnly: false,
            summary: 'Notre best-seller : un soin approfondi avec cire de brillance.',
            details: ['Intérieur Confort compris', 'Lavage manuel deux seaux', 'Jantes et passages de roues', 'Cire de brillance'],
        },
        {
            id: 'complete-prestige', category: 'complete', name: 'Complète Prestige', price: 14990, duration: 180, featured: false, active: true, quoteOnly: false,
            summary: 'Le soin le plus complet, pour un véhicule comme neuf.',
            details: ['Intérieur Signature compris', 'Décontamination et dégoudronnage', 'Traitement hydrophobe des vitres', 'Finitions haute brillance'],
        },
        {
            id: 'polish-gloss', category: 'polish', name: 'Lustrage brillance', price: 12990, duration: 120, featured: false, active: true, quoteOnly: false,
            summary: 'Efface les micro-rayures et ravive la teinte.',
            details: ['Lavage et décontamination', 'Lustrage en une passe', 'Cire de protection (3 mois)'],
        },
        {
            id: 'polish-ceramic-1', category: 'polish', name: 'Céramique 1 an', price: 24990, duration: 240, featured: true, active: true, quoteOnly: false,
            summary: 'Polissage et protection céramique qui repousse l’eau et la saleté.',
            details: ['Polissage correcteur', 'Couche céramique (1 an)', 'Rénovation des phares avant', 'Conseils d’entretien'],
        },
        {
            id: 'polish-ceramic-3', category: 'polish', name: 'Céramique 3 ans', price: 44990, duration: 360, featured: false, active: true, quoteOnly: false,
            summary: 'La protection haut de gamme, pour les plus exigeants.',
            details: ['Polissage en deux passes', 'Deux couches céramique (3 ans)', 'Jantes et vitres traitées', 'Contrôle offert à 6 mois'],
        },
        {
            id: 'windshield-repair', category: 'windshield', name: 'Réparation d’impact', price: 6900, duration: 60, featured: false, active: true, quoteOnly: false,
            summary: 'Un impact plus petit qu’une pièce de 2 € ? Il se répare sans changer la vitre.',
            details: ['Injection de résine', 'Polissage de la zone', 'Souvent pris en charge par l’assurance'],
        },
        {
            id: 'windshield-replace', category: 'windshield', name: 'Remplacement de pare-brise', price: 0, duration: 120, featured: false, active: true, quoteOnly: true,
            summary: 'Avec une garantie bris de glace, nous gérons le dossier avec votre assureur.',
            details: ['Démarches avec l’assurance', 'Pare-brise de qualité équivalente', 'Lavage extérieur offert', 'Prix selon votre contrat'],
        },
    ],
    extras: [
        { id: 'mats', name: 'Tapis en profondeur', description: 'Tapis shampouinés et séchés.', price: 1990, duration: 15, active: true },
        { id: 'seats', name: 'Shampouinage des sièges', description: 'Tissu ou cuir, nettoyé et nourri.', price: 3990, duration: 45, active: true },
        { id: 'headlights', name: 'Rénovation des phares', description: 'Phares avant ternis rendus clairs.', price: 3990, duration: 30, active: true },
        { id: 'rain', name: 'Anti-pluie des vitres', description: 'L’eau perle et glisse sur les vitres.', price: 2490, duration: 15, active: true },
        { id: 'pets', name: 'Poils d’animaux', description: 'Retrait des poils incrustés.', price: 1990, duration: 20, active: true },
        { id: 'engine', name: 'Compartiment moteur', description: 'Dégraissage doux à la vapeur.', price: 2990, duration: 30, active: true },
    ],
    vehicles: [
        { id: 'city', name: 'Citadine', examples: 'Clio, 208, Yaris', surcharge: 0 },
        { id: 'sedan', name: 'Berline ou compacte', examples: 'Golf, Mégane, Octavia', surcharge: 1000 },
        { id: 'suv', name: 'SUV, break ou familiale', examples: '3008, Tiguan, Scénic', surcharge: 2000 },
        { id: 'van', name: 'Van ou utilitaire', examples: 'Trafic, Vito, Kangoo', surcharge: 3500 },
    ],
}
