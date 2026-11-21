# Architecture

**English** · [Français](../fr/architecture.md)

## Pages

| Address | Page | View |
| --- | --- | --- |
| `/` | Home | `components/views/Home/` |
| `/prestations/` | Services and prices | `components/views/Services/` |
| `/reservation/` | Booking | `components/views/Booking/` (loaded after the first paint, `BookingLoader`) |
| `/professionnels/` | Offer for companies | `components/views/Pros/` |
| `/horaires-acces/` | Hours and map | `components/views/Access/` |
| `/contact/` | Contact | `components/views/Contact/` |
| `/mon-espace/` | Customer account (private) | `components/views/Account/` |
| `/admin/...` | Administration (private): bookings, users, availability, prices, messages | `components/views/Admin/` |
| `/connexion/` | Fallback sign-in page (signing in usually happens in a window) | `components/views/Login/` |
| `/mentions-legales/`, `/confidentialite/`, `/cgv/`, `/cookies/` | Legal pages | `components/views/Legal/` |
| `/fonctionnalites/` | What this site includes (demo banner, footer, last step of the guided tour) | `components/views/Features/`, texts in `content/features.ts` |

Each folder of `src/routes/` holds the page (`+page.svelte`): its SEO (`Seo`), its hero (`PageHero`) and its sections.
The shared frame (header, mobile menu, footer, demo banner, windows, notifications) is in `components/layout/`.

## Reusable components (`components/ui/`)

| Component | Role |
| --- | --- |
| `BaseButton` | Every button and button-like link (variants, icon, loading) |
| `PageHero` | Hero of the inner pages: breadcrumb, gold kicker, title with a gold word, subtitle, buttons |
| `PageSection`, `SectionHead` | Section with its head (gold kicker, big italic title, text) |
| `SectionLayout`, `GoldBand` | Sequence of blocks of a page, with the gold bands of the original |
| `InfoBlock` | Dark block with photo and text, key points, buttons |
| `CtaBand` | Call to action band at the end of a page |
| `FormulaCard`, `ServiceCard`, `ChoiceCard` | Formula cards (services page, home, booking) |
| `IconList` | List of points with a pictogram |
| `KpiCards` | Key figure tiles (account, admin) |
| `Steps`, `Faq`, `Expandable` | "How it works" steps, FAQ, folding blocks |
| `BeforeAfter` | Before / after slider |
| `FormField`, `CheckField`, `Switch` | Form fields, check boxes, switch |
| `Modal`, `ImageZoom` | Windows (the page never moves) |
| `MonthCalendar` | Month calendar (booking, admin) |
| `LazyMount` | Loads a heavy part after the first paint (booking, forms) |
| `PreferencesBanner` | Cookie banner and preferences |

## Styles (`src/lib/assets/css/`)

- `utils/variables.css`: the tokens (colors, font sizes, spacing, durations). Every font size and spacing goes through
  them (`npm run check:tokens`).
- `base/`: reset, typography, accessibility.
- `components/`: one file per family (header, footer, buttons, forms, windows, lists, heroes, sections, `premium.css`
  for cards, chips and aligned rows, `booking.css`, `expandable.css`).
- Styles of a single component stay in its `<style>`.

## State

- `stores/demo.svelte.ts`: catalog, bookings, accounts, availability, messages, session.
- `stores/bookingDraft.svelte.ts`: booking in progress (cleared after confirmation, on sign-out and on reset).
- `stores/ui.svelte.ts`: windows, notifications, menu, guided tour.
- `stores/actions/`: the only functions that change the state (see [demo-layer.md](demo-layer.md)).

## Checks

- `scripts/images.mjs`: one photo per place, no duplicated or unused photo.
- `scripts/tokens.mjs`: no font size or spacing written by hand.
- `scripts/sitemap.mjs` and `scripts/csp.mjs`: sitemap, robots and security headers after the build.

## Performance

- Montserrat in two weights, the bold one preloaded.
- Blurred WebP photos (very light), 640 px copies for phones, photos lower on the page loaded when they come near.
- One JavaScript file and one stylesheet for the whole site (`bundleStrategy: 'single'` in `vite.config.ts`): two
  requests instead of about thirty before the first screen, then cached for the next pages.
- Booking and forms mounted once the page has loaded and the browser is idle (`LazyMount`).
- Lighthouse mobile: 96 to 98 in performance on the 10 public pages (3 runs each), 97 on `/fonctionnalites/`, 100 in accessibility, best practices
  and SEO; 100 everywhere on desktop.
