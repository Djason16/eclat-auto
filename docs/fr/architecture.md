# Architecture

[English](../en/architecture.md) · **Français**

## Pages

| Adresse | Page | Vue |
| --- | --- | --- |
| `/` | Accueil | `components/views/Home/` |
| `/prestations/` | Prestations et tarifs | `components/views/Services/` |
| `/reservation/` | Prise de rendez-vous | `components/views/Booking/` (chargée après l'affichage, `BookingLoader`) |
| `/professionnels/` | Offre pour les entreprises | `components/views/Pros/` |
| `/horaires-acces/` | Horaires et plan | `components/views/Access/` |
| `/contact/` | Contact | `components/views/Contact/` |
| `/mon-espace/` | Compte client (privé) | `components/views/Account/` |
| `/admin/...` | Administration (privé) : réservations, utilisateurs, disponibilités, tarifs, messages | `components/views/Admin/` |
| `/connexion/` | Connexion de secours (la connexion se fait d'habitude dans une fenêtre) | `components/views/Login/` |
| `/mentions-legales/`, `/confidentialite/`, `/cgv/`, `/cookies/` | Pages légales | `components/views/Legal/` |
| `/fonctionnalites/` | Ce que comprend ce site (bannière de démo, pied de page, dernière étape de la visite guidée) | `components/views/Features/`, textes dans `content/features.ts` |

Chaque dossier de `src/routes/` contient la page (`+page.svelte`) : son SEO (`Seo`), son haut de page (`PageHero`) et
ses sections. Le cadre commun (en-tête, menu mobile, pied de page, bannière de démo, fenêtres, notifications) est dans
`components/layout/`.

## Composants réutilisables (`components/ui/`)

| Composant | Rôle |
| --- | --- |
| `BaseButton` | Tous les boutons et liens en forme de bouton (variantes, icône, chargement) |
| `PageHero` | Haut des pages intérieures : fil d'Ariane, petit titre doré, titre avec un mot en or, sous-titre, boutons |
| `PageSection`, `SectionHead` | Section avec son en-tête (petit titre doré, grand titre italique, texte) |
| `SectionLayout`, `GoldBand` | Suite de blocs d'une page, avec les bandes dorées de l'original |
| `InfoBlock` | Bloc sombre photo + texte, points clés, boutons |
| `CtaBand` | Bandeau d'appel à l'action en fin de page |
| `FormulaCard`, `ServiceCard`, `ChoiceCard` | Cartes de formules (prestations, accueil, réservation) |
| `IconList` | Liste de points avec pictogramme |
| `KpiCards` | Tuiles de chiffres clés (compte, admin) |
| `Steps`, `Faq`, `Expandable` | Étapes « comment ça marche », questions fréquentes, blocs repliables |
| `BeforeAfter` | Avant / après à faire glisser |
| `FormField`, `CheckField`, `Switch` | Champs de formulaire, cases à cocher, interrupteur |
| `Modal`, `ImageZoom` | Fenêtres (la page ne bouge jamais) |
| `MonthCalendar` | Calendrier du mois (réservation, admin) |
| `LazyMount` | Charge une partie lourde après l'affichage (réservation, formulaires) |
| `PreferencesBanner` | Bannière cookies et préférences |

## Styles (`src/lib/assets/css/`)

- `utils/variables.css` : les jetons (couleurs, tailles de texte, espacements, durées). Toute valeur de taille de texte
  ou d'espacement passe par eux (`npm run check:tokens`).
- `base/` : remise à zéro, typographie, accessibilité.
- `components/` : un fichier par famille (en-tête, pied de page, boutons, formulaires, fenêtres, listes, héros,
  sections, `premium.css` pour les cartes, puces et rangées alignées, `booking.css`, `expandable.css`).
- Les styles propres à un composant restent dans son `<style>`.

## État

- `stores/demo.svelte.ts` : catalogue, réservations, comptes, disponibilités, messages, session.
- `stores/bookingDraft.svelte.ts` : réservation en cours (vidée après la confirmation, à la déconnexion et à la remise à zéro).
- `stores/ui.svelte.ts` : fenêtres, notifications, menu, visite guidée.
- `stores/actions/` : les seules fonctions qui modifient l'état (voir [couche-de-demo.md](couche-de-demo.md)).

## Contrôles

- `scripts/images.mjs` : une photo par endroit, aucune photo en double ni inutilisée.
- `scripts/tokens.mjs` : aucune taille de texte ni espacement écrit à la main.
- `scripts/sitemap.mjs` et `scripts/csp.mjs` : sitemap, robots et en-têtes de sécurité après le build.

## Performances

- Police Montserrat en deux graisses, la grasse préchargée.
- Photos en WebP floutées (très légères), copie de 640 px pour les téléphones, photos du bas de page chargées à l'approche.
- Un seul fichier JavaScript et une seule feuille de style pour tout le site (`bundleStrategy: 'single'` dans
  `vite.config.ts`) : deux requêtes au lieu d'une trentaine avant le premier écran, puis en cache pour les pages suivantes.
- Réservation et formulaires montés une fois la page chargée et le navigateur au repos (`LazyMount`).
- Lighthouse mobile : 96 à 98 en performance sur les 10 pages publiques (3 passages chacune), 97 sur `/fonctionnalites/`, 100 en accessibilité,
  bonnes pratiques et SEO ; 100 partout sur ordinateur.
