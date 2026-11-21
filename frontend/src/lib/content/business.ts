// The fictional business of the demo: every name, address and number here is invented

export const BUSINESS = {
    name: 'Éclat Auto',
    tagline: 'Le soin auto, jusque dans les détails.',
    street: '18 rue des Lavandières',
    postalCode: '44000',
    city: 'Nantes',
    phone: '01 23 45 67 89',
    phoneLink: '+33123456789',
    email: 'contact@eclat-auto.example',
    // Fictional legal identity, shown on the legal pages
    legalForm: 'SAS fictive au capital de 1 000 €',
    registration: 'RCS fictif 000 000 000',
    director: 'Camille Martin (personnage fictif)',
    // Position of the fictional workshop on the drawn map (no real map, no tracking)
    geo: { latitude: 47.2135, longitude: -1.5536 },
    priceRange: '€€',
} as const

// Designer and developer of the site (footer, legal notice, meta author), like the client sites
export const DESIGNER = {
    name: 'Djason CHERY',
    href: 'https://djason-chery.dev',
    title: 'Voir le portfolio de Djason CHERY, développeur web (nouvel onglet)',
    // Profiles listed in the JSON-LD of djason-chery.dev (sameAs), copied as they are there
    profiles: [
        'https://www.linkedin.com/in/djason-chery-3b87702b4',
        'https://github.com/Djason16',
        'https://www.malt.fr/profile/djasonchery',
        'https://www.instagram.com/djasonchery',
        'https://www.tiktok.com/@djasonchery.dev',
        'https://www.facebook.com/profile.php?id=61596350354677',
    ],
} as const

// Project generator the site was built with
export const GENERATOR = {
    name: 'DC Scaffold',
    href: 'https://tools.djason-chery.dev/fr/scaffold/',
    title: 'Découvrir DC Scaffold (nouvel onglet)',
} as const

export const fullAddress = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`

// Weekly opening hours shown on the site; the booking slots come from the availability set in the admin
export const OPENING_HOURS = [
    { day: 'Lundi', hours: '8 h 30 à 19 h' },
    { day: 'Mardi', hours: '8 h 30 à 19 h' },
    { day: 'Mercredi', hours: '8 h 30 à 19 h' },
    { day: 'Jeudi', hours: '8 h 30 à 19 h' },
    { day: 'Vendredi', hours: '8 h 30 à 19 h' },
    { day: 'Samedi', hours: '9 h à 17 h' },
    { day: 'Dimanche', hours: 'Fermé' },
] as const

// Schema.org opening hours of the JSON-LD
export const OPENING_HOURS_SPEC = [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '17:00' },
]

// Credit of the illustrations and fonts (legal notice)
export const CREDITS = [
    'Plan d’accès : dessin vectoriel (SVG) créé pour cette démonstration.',
    'Police : Montserrat, par Julieta Ulanovsky et ses contributeurs, sous licence SIL Open Font License 1.1.',
]
