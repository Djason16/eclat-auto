import { userPreferencesActions } from './actions/userPreferencesActions'

/*
 * Cookie preferences of the visitor (the cookie banner).
 *
 * Adding a category, for example "maps" for an interactive map:
 *   1. add  maps: false  to "preferences" (off as long as the visitor has not accepted it)
 *   2. add  maps: { required: false, label: 'Carte', description: 'Affiche une carte interactive' }  to "categories"
 *      (required: true = always on, cannot be refused; label and description: texts of the banner)
 * Then anywhere:  if (userPreferences.preferences.maps) { ...show the map... }
 */
export const userPreferences = $state({
    // true as soon as the visitor has clicked a button of the banner
    hasUserMadeChoice: false,

    // Current choice of the visitor
    preferences: {
        essential: true,
        functional: false,
    },

    // Categories shown when the visitor clicks « Personnaliser »
    categories: {
        essential: { required: true, label: 'Cookies essentiels', description: 'Nécessaires au fonctionnement du site.' },
        functional: { required: false, label: 'Cookies fonctionnels', description: 'Mémorisent vos préférences pour vos prochaines visites.' },
    },

    // loadPreferences, savePreferences, acceptAll, denyAll... (stores/actions/)
    ...userPreferencesActions,
})
