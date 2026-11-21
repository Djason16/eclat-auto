# Couche de démo

[English](../en/demo-layer.md) · **Français**

Éclat Auto n'a ni serveur ni base de données : toute la vie du site se passe dans le navigateur du visiteur, avec les
règles qu'aurait une vraie application.

## Données

| Donnée | Clé du `localStorage` | Départ |
| --- | --- | --- |
| Catalogue (prestations, options, véhicules) | `eclat-auto:catalog` | `src/lib/content/catalog.ts` |
| Réservations | `eclat-auto:bookings` | `src/lib/demo/seed.ts` |
| Comptes | `eclat-auto:accounts` | client et admin de démo |
| Disponibilités (horaires, créneaux bloqués) | `eclat-auto:availability` | horaires de l'atelier |
| Messages | `eclat-auto:messages` | quelques messages d'exemple |
| Session | `eclat-auto:session` | personne connectée |

Le stockage est dans `src/lib/demo/storage.ts` ; les données de départ dans `src/lib/demo/seed.ts`. Une version
(`eclat-auto:version`) remet les données à zéro quand leur format change.

## Actions

Les écrans n'écrivent jamais directement : ils appellent des actions (`src/lib/stores/actions/`) qui vérifient puis
enregistrent, et répondent au format `{ success, message, errors }` des API générées par DC Scaffold.

- `sessionActions` : connexion, inscription, déconnexion, profil, documents, suppression du compte. Les mots de passe
  sont gardés sous forme d'empreinte SHA-256.
- `bookingActions` : prix et durée d'une demande (`quote`), création d'une réservation (créneau vraiment libre,
  plusieurs créneaux d'une heure si la prestation est longue), annulation jusqu'à 24 heures avant, statuts.
- `adminActions` : rôles, suppression de comptes (les comptes de démo sont protégés), tarifs, horaires, créneaux
  bloqués, messages.
- `demoActions` : chargement, enregistrement et « Remettre à zéro ».
- `uiActions` : notifications, fenêtres de confirmation et de paiement, visite guidée.

Un léger délai simulé (`simulateLatency`) rend les attentes visibles, comme avec un vrai serveur.

## Ce qui n'arrive jamais

- Aucun e-mail n'est envoyé : la confirmation de réservation montre un aperçu de l'e-mail.
- Aucun paiement : la fenêtre de carte accepte `4242 4242 4242 4242` et refuse `4000 0000 0000 0002`, sans contacter
  de prestataire ; aucun numéro n'est enregistré.
- Aucune requête vers un autre site : pas de carte en ligne, pas de mesure d'audience, pas de police externe.

## Remettre à zéro

« Remettre à zéro », dans la bannière en haut de chaque page, efface les clés `eclat-auto:` et recharge les données de
départ, après confirmation. Le brouillon de réservation en cours est vidé aussi.
