# Deployment

**English** · [Français](../fr/mise-en-ligne.md)

Éclat Auto is a static site: `npm run build` produces the whole site in `frontend/build/`. It is live on
**Cloudflare Pages**, like Élan Solidaire, project `eclat-auto`, at **https://eclat-auto.djason-chery.dev** (a CNAME
record at Infomaniak points to `eclat-auto.pages.dev`). The "first time" steps below are already done for this project;
they stay to create another one.

## 1. Check then build

```bash
cd frontend
npm run check      # types, unique photos, tokens: zero error and zero warning
npm run lint
npm run build      # static site in frontend/build/
```

`frontend/.env.production` gives the address of the site to the build:

```text
PUBLIC_SITE_NAME="Éclat Auto"
PUBLIC_SITE_URL="https://eclat-auto.djason-chery.dev"
```

It holds no secret but stays out of Git, like every `.env`; `frontend/.env.example` is the template.

After the build (`postbuild`):

- `scripts/sitemap.mjs` writes `build/sitemap.xml` and `build/robots.txt` (private pages excluded);
- `scripts/csp.mjs` replaces `'unsafe-inline'` of `script-src` in `build/_headers` by the SHA-256 hashes of the inline
  scripts of the pages: only those scripts and the files of the site can run;
- the same script copies the fallback page `200.html` to `404.html`, the page Cloudflare Pages shows (with a 404
  status) for an unknown address.

## 2. Create the project (first time)

```bash
npx wrangler login
npx wrangler pages project create eclat-auto --production-branch master
```

## 3. Deploy

```bash
cd frontend && npm run build && npx wrangler pages deploy build --project-name eclat-auto --branch master
```

## 4. Domain (first time)

1. In Cloudflare Pages, project `eclat-auto`, "Custom domains" tab: add `eclat-auto.djason-chery.dev`.
2. At Infomaniak, DNS zone of `djason-chery.dev`: add a CNAME record `eclat-auto` pointing to `eclat-auto.pages.dev`.
3. Wait for Cloudflare to validate the domain and issue the HTTPS certificate.

## Project linked to a Git repository

| Setting | Value |
| --- | --- |
| Root directory | `frontend` |
| Build command | `npm run build` |
| Build output directory | `build` |
| Environment variables | `PUBLIC_SITE_NAME=Éclat Auto`, `PUBLIC_SITE_URL=https://eclat-auto.djason-chery.dev` |

## Headers (`frontend/static/_headers`)

- Security on every response: strict `Content-Security-Policy` (site scripts and hashes of the inline scripts, site
  styles, site images plus `data:`/`blob:` for account documents, no outside resource), `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
- Cache: one year for `/_app/immutable/*` (file names change with their content), 30 days for fonts and photos.
- `X-Robots-Tag: noindex` on private pages (`/admin/`, `/mon-espace/`, `/connexion/`).

No `_redirects`: the addresses are already in French and no old address needs a redirect.

## Legal notice

The "Hébergeur du site" section names Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, United States.
