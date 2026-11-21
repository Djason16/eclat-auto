# Mise en ligne

[English](../en/deployment.md) · **Français**

Éclat Auto est un site statique : `npm run build` produit tout le site dans `frontend/build/`. Il est en ligne
sur **Cloudflare Pages**, comme Élan Solidaire, projet `eclat-auto`, à l'adresse **https://eclat-auto.djason-chery.dev**
(un enregistrement CNAME chez Infomaniak pointe vers `eclat-auto.pages.dev`). Les étapes « première fois » ci-dessous
sont déjà faites pour ce projet ; elles restent pour en créer un autre.

## 1. Vérifier puis construire

```bash
cd frontend
npm run check      # types, photos uniques, jetons : zéro erreur et zéro avertissement
npm run lint
npm run build      # site statique dans frontend/build/
```

`frontend/.env.production` donne l'adresse du site au build :

```text
PUBLIC_SITE_NAME="Éclat Auto"
PUBLIC_SITE_URL="https://eclat-auto.djason-chery.dev"
```

Ce fichier ne contient aucun secret mais reste hors de Git, comme tous les `.env` ; `frontend/.env.example` en donne le modèle.

Après le build (`postbuild`) :

- `scripts/sitemap.mjs` écrit `build/sitemap.xml` et `build/robots.txt` (pages privées exclues) ;
- `scripts/csp.mjs` remplace `'unsafe-inline'` de `script-src` dans `build/_headers` par les empreintes SHA-256 des
  scripts en ligne des pages : seuls ces scripts et les fichiers du site peuvent s'exécuter ;
- le même script copie la page de secours `200.html` en `404.html`, la page que Cloudflare Pages montre (avec un code
  404) pour une adresse inconnue.

## 2. Créer le projet (première fois)

```bash
npx wrangler login
npx wrangler pages project create eclat-auto --production-branch master
```

## 3. Mettre en ligne

```bash
cd frontend && npm run build && npx wrangler pages deploy build --project-name eclat-auto --branch master
```

## 4. Le domaine (première fois)

1. Dans Cloudflare Pages, projet `eclat-auto`, onglet « Custom domains » : ajouter `eclat-auto.djason-chery.dev`.
2. Chez Infomaniak, zone DNS de `djason-chery.dev` : ajouter un enregistrement CNAME `eclat-auto` vers `eclat-auto.pages.dev`.
3. Attendre que Cloudflare valide le domaine et pose le certificat HTTPS.

## Projet relié à un dépôt Git

| Réglage | Valeur |
| --- | --- |
| Root directory | `frontend` |
| Build command | `npm run build` |
| Build output directory | `build` |
| Variables d'environnement | `PUBLIC_SITE_NAME=Éclat Auto`, `PUBLIC_SITE_URL=https://eclat-auto.djason-chery.dev` |

## En-têtes (`frontend/static/_headers`)

- Sécurité sur toutes les réponses : `Content-Security-Policy` stricte (scripts du site et empreintes des scripts en
  ligne, styles du site, images du site et `data:`/`blob:` pour les documents du compte, aucune ressource extérieure),
  `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
- Cache : un an pour `/_app/immutable/*` (le nom des fichiers change avec leur contenu), 30 jours pour les polices et
  les photos.
- `X-Robots-Tag: noindex` sur les pages privées (`/admin/`, `/mon-espace/`, `/connexion/`).

Pas de `_redirects` : les adresses sont déjà en français et aucune ancienne adresse n'est à rediriger.

## Mentions légales

La section « Hébergeur du site » indique Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis.
