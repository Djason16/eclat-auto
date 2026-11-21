// dc-scaffold: adapted (every page of the site, "Page | Éclat Auto" titles, AutoWash JSON-LD on the business pages)
import { BUSINESS, DESIGNER, OPENING_HOURS_SPEC } from '#lib/content/business.js'
import { joinUrl, withTrailingSlash } from './pathHelpers'

/*
 * SEO of each page: title, description, share image, Open Graph and JSON-LD.
 * Add a page: one entry below (its address, title and description). {{name}} = name of the site.
 * Every title follows the same pattern: "Page | Éclat Auto". noIndex: true = hidden from search engines (account, admin).
 * business: true adds the AutoWash (LocalBusiness) block of the fictional workshop.
 */
interface SeoPage {
    path?: string
    image?: string
    keywords?: string
    noIndex?: boolean
    business?: boolean
    title?: string
    description?: string
}

export const SEO_PAGES: Record<string, SeoPage> = {
    index: {
        path: '/', business: true, title: 'Accueil | {{name}}', keywords: 'lavage auto, nettoyage voiture, esthétique automobile, céramique, Nantes',
        description: 'Lavage à la main, nettoyage intérieur, polissage et céramique : réservez en ligne votre créneau chez {{name}} (démonstration, entreprise fictive).',
    },
    services: {
        path: '/prestations/', business: true, title: 'Prestations et tarifs | {{name}}', keywords: 'tarifs lavage auto, nettoyage intérieur, polissage, pare-brise',
        description: 'Tous les tarifs de {{name}} : intérieur, formules complètes, polissage et céramique, pare-brise, options et supplément selon le véhicule.',
    },
    booking: {
        path: '/reservation/', title: 'Réservation | {{name}}',
        description: 'Réservez en 6 étapes : prestation, options, véhicule, date et créneau libre, coordonnées et paiement (simulé dans cette démonstration).',
    },
    pros: {
        path: '/professionnels/', title: 'Professionnels | {{name}}', keywords: 'lavage flotte entreprise, nettoyage véhicules de société',
        description: 'Entretien des véhicules de société, flottes et utilitaires : tarifs dégressifs, facture mensuelle et créneaux réservés.',
    },
    access: {
        path: '/horaires-acces/', business: true, title: 'Horaires et accès | {{name}}',
        description: 'Horaires d’ouverture, adresse et plan d’accès de l’atelier {{name}} (adresse fictive de démonstration).',
    },
    contact: {
        path: '/contact/', business: true, title: 'Contact | {{name}}',
        description: 'Une question, un devis ? Écrivez à {{name}} ou appelez-nous (coordonnées fictives de démonstration).',
    },
    features: {
        path: '/fonctionnalites/', title: 'Ce que comprend ce site | {{name}}',
        description: 'Réservation en 6 étapes, espace client, administration, offre pro, pages légales : toutes les fonctions de cette démo de site pour un atelier auto.',
    },
    login: { path: '/connexion/', noIndex: true, title: 'Connexion | {{name}}', description: 'Connexion à votre espace client {{name}}, comptes de démonstration.' },
    account: { path: '/mon-espace/', noIndex: true, title: 'Mon espace | {{name}}', description: 'Vos rendez-vous et vos informations.' },
    admin: { path: '/admin/', noIndex: true, title: 'Réservations | {{name}}', description: 'Liste des réservations et leurs statuts.' },
    adminSlots: { path: '/admin/disponibilites/', noIndex: true, title: 'Calendrier | {{name}}', description: 'Horaires, jours fermés et créneaux bloqués.' },
    adminCatalog: { path: '/admin/tarifs/', noIndex: true, title: 'Tarifs | {{name}}', description: 'Prix, durées et visibilité des prestations.' },
    adminUsers: { path: '/admin/utilisateurs/', noIndex: true, title: 'Utilisateurs | {{name}}', description: 'Comptes, rôles et documents des utilisateurs.' },
    adminMessages: { path: '/admin/messages/', noIndex: true, title: 'Messages | {{name}}', description: 'Messages reçus par les formulaires.' },
    legal: { path: '/mentions-legales/', title: 'Mentions légales | {{name}}', description: 'Éditeur, hébergeur et crédits du site de démonstration {{name}}.' },
    privacy: { path: '/confidentialite/', title: 'Confidentialité | {{name}}', description: 'Quelles données le site de démonstration {{name}} garde, où et pour combien de temps.' },
    terms: { path: '/cgv/', title: 'Conditions générales de vente | {{name}}', description: 'Conditions de réservation, de paiement, d’annulation et de réclamation de {{name}} (démonstration).' },
    cookies: { path: '/cookies/', title: 'Cookies | {{name}}', description: 'Les cookies et le stockage du navigateur utilisés par {{name}}, et comment changer votre choix.' },
    notFound: { path: '/404', noIndex: true, title: 'Page introuvable | {{name}}', description: 'Cette page n’existe pas.' },
}

const LOCALES: Record<string, string> = { fr: 'fr_FR', en: 'en_US' }

interface SeoOptions {
    pageKey: string
    locale: string
    site: { name: string, url: string }
}

export type MetaTag = { name: string, content: string } | { property: string, content: string }

// The fictional workshop for search engines (schema.org AutoWash, a kind of LocalBusiness)
const businessJsonLd = (siteUrl: string, image: string) => ({
    '@type': 'AutoWash',
    '@id': `${withTrailingSlash(siteUrl)}#business`,
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    url: withTrailingSlash(siteUrl),
    image,
    telephone: BUSINESS.phoneLink,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: { '@type': 'PostalAddress', streetAddress: BUSINESS.street, postalCode: BUSINESS.postalCode, addressLocality: BUSINESS.city, addressCountry: 'FR' },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude },
    openingHoursSpecification: OPENING_HOURS_SPEC,
})

// The author of the demo: creator, author, publisher and copyright holder of the site (the business itself is fictive)
const authorJsonLd = {
    '@type': 'Person',
    '@id': `${DESIGNER.href}/#person`,
    name: DESIGNER.name,
    url: DESIGNER.href,
    jobTitle: 'Développeur web',
    sameAs: [...DESIGNER.profiles],
}
const authorRef = { '@id': authorJsonLd['@id'] }

export const buildSeo = ({ pageKey, locale, site }: SeoOptions) => {
    const page = SEO_PAGES[pageKey] ?? {}
    const title = (page.title ?? '').replaceAll('{{name}}', site.name)
    const description = (page.description ?? '').replaceAll('{{name}}', site.name)
    const url = withTrailingSlash(joinUrl(site.url, page.path ?? '/'))
    const image = joinUrl(site.url, page.image ?? '/og-image.jpg')
    const robots = page.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    const website = {
        '@type': 'WebSite',
        '@id': `${withTrailingSlash(site.url)}#website`,
        name: site.name,
        url: withTrailingSlash(site.url),
        inLanguage: locale,
        creator: authorRef,
        author: authorRef,
        publisher: authorRef,
        copyrightHolder: authorRef,
    }
    const webPage = {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name: title,
        description,
        url,
        inLanguage: locale,
        isPartOf: { '@id': website['@id'] },
        creator: authorRef,
        author: authorRef,
        publisher: authorRef,
        copyrightHolder: authorRef,
        ...(page.business ? { about: { '@id': `${withTrailingSlash(site.url)}#business` } } : {}),
    }

    return {
        title,
        description,
        url,
        meta: [
            { name: 'description', content: description },
            { name: 'robots', content: robots },
            ...(page.keywords ? [{ name: 'keywords', content: page.keywords }] : []),
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: site.name },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: url },
            { property: 'og:image', content: image },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:image:alt', content: 'Éclat Auto, lavage et detailing automobile à Nantes : site de démonstration' },
            { property: 'og:locale', content: LOCALES[locale] ?? locale },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image },
            { name: 'generator', content: 'DC Scaffold' },
            { name: 'author', content: DESIGNER.name },
        ] as MetaTag[],
        link: [{ rel: 'canonical' as const, href: url }],
        jsonLd: page.noIndex ? null : {
            '@context': 'https://schema.org',
            '@graph': [website, webPage, authorJsonLd, ...(page.business ? [businessJsonLd(site.url, image)] : [])],
        },
    }
}
