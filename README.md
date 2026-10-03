# ELARÉ — Fashion Boutique Storefront

A production storefront for **ELARÉ**, a Pakistani dressmaking house from Lahore. The site presents a
five-chapter seasonal collection (ÉLAN, NOOR, AURA, VEIL, SIGNATURE) built around 18 pieces of kameez,
lawn, co-ords and floor-length tailoring, with a fully client-side shopping bag, wishlist and search.

The storefront is a **static, server-rendered Next.js application**. Every page is prerendered at build
time, and all interactive commerce behaviour (bag, wishlist, filters, search, quick view) runs in the
browser with state persisted to `localStorage`. There is no backend, no database and no third-party
service dependency.

---

## Table of Contents

- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Data & Content](#data--content)
- [Security Notes](#security-notes)
- [License](#license)

---

## Features

### Commerce

- **Shopping bag** — add items with a selected size and colour, change quantity, remove lines, clear the
  bag. Line identity is `slug + size + colour`, so the same garment in a different size is a separate line.
- **Live totals** — subtotal, savings against compare-at prices, flat-rate shipping, and a progress
  indicator toward the free-shipping threshold (PKR 20,000).
- **Wishlist** — save any piece, review saved items in a drawer, and move a wishlisted item into the bag.
- **Bag & wishlist persistence** — state is written to `localStorage` (`elare.bag.v1`,
  `elare.wishlist.v1`) and rehydrated on load. Persisted lines are sanitised against the live catalogue, so
  a removed product can never reappear from stale storage. Restoration happens in an effect, which keeps
  the server and client markup identical on first paint.
- **Product filtering** — filter the shop by category, size, price ceiling, in-stock-only and sale-only.
- **Product search** — full-text overlay search across product names, subtitles, categories, fabrics and
  collection names.
- **Quick view** — inspect and add a product to the bag without leaving the grid.
- **Size guide** — bust / waist / length / hip table for XS–XL, available from the product page and footer.
- **Contact form** — client-side validation across name, email, topic, order number and message; submits by
  handing off to the visitor's mail client with a prefilled message, so no server or form service is needed.

### Content & editorial

- **Five collection chapters**, each with its own silhouette language, accent editorial block and
  cross-links to the other chapters.
- **Lookbook** — four themed editorial stories (The Shoulder, The Hand, The Re-cut, The Signature) with
  imagery and written captions.
- **Studio story** — a nine-part editorial timeline on the About page covering the house history,
  production model and fabric sourcing.
- **Product storytelling** — every piece carries a design story, fabric composition, care instructions,
  construction details, delivery and returns policy, ratings and a stylist note.

### Interface

- **Overlay system** — a single `OverlayHost` mounts the bag, wishlist and search overlays, so only one
  overlay is ever open at a time.
- **Scroll reveals** — a `Reveal` wrapper using `IntersectionObserver` for section entrances, with
  `prefers-reduced-motion` respected.
- **Responsive** — mobile menu, filter sheet on small screens and horizontal scroll rails that reflow into
  grids from `sm` upwards.
- **Accessibility** — semantic landmarks, skip target, labelled icon buttons, `aria-live` regions for
  filter results, keyboard-operable drawer/modal focus traps, and visible focus rings.

### SEO

- Per-page `Metadata` with title templates, descriptions, keywords, canonical URLs and Open Graph /
  Twitter card images.
- `generateStaticParams` for all collection and product routes so every page is a real static document.
- A branded `not-found` page, `robots` directives, and a `sitemap`-ready static route tree.

---

## Pages & Routes

| Route | Rendering | Description |
| --- | --- | --- |
| `/` | Static | Hero, best sellers rail, new arrivals, the five chapters, atelier story, founder note, lookbook preview, private client service, newsletter. |
| `/shop` | Static | Full catalogue with the filterable `ShopBrowser` — category, size, price, in-stock and sale filters. |
| `/collections` | Static | Index of the five chapters with imagery and season labels. |
| `/collections/elan` | SSG | Chapter One — formalwear with a raised shoulder. |
| `/collections/noor` | SSG | Chapter Two — the tradition, refined rather than restated. |
| `/collections/aura` | SSG | Chapter Three — the kameez, re-cut for now. |
| `/collections/veil` | SSG | Chapter Four — modest dressing treated as couture. |
| `/collections/signature` | SSG | Chapter Five — the limited-run signature pieces. |
| `/product/[slug]` (18 pages) | SSG | Product detail — gallery, options, accordion detail panels, sizing, related products, add to bag. |
| `/lookbook` | Static | Four editorial stories with photography and captions. |
| `/about` | Static | The house story, a nine-part timeline, materials and production standards. |
| `/contact` | Static | Atelier contact details, opening hours, map/location block and the validated contact form. |
| `/_not-found` | Static | Branded 404 page. |

**33 pages** are prerendered at build time. Individual product examples:
`/product/zareen-ember-cutwork-kameez`, `/product/sitara-violet-sculpted-kameez`,
`/product/velvet-noor-signature-kameez`.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) `15.5.27` — App Router, React Server Components |
| UI runtime | [React](https://react.dev) `19.1.0` / `React DOM` `19.1.0` |
| Language | TypeScript `^5` (strict) |
| Styling | [Tailwind CSS](https://tailwindcss.com) `v4` via `@tailwindcss/postcss`, with design tokens declared in a CSS-first `@theme` block |
| Fonts | `next/font/google` — Cormorant Garamond (display) and Jost (sans), self-hosted and subset to Latin |
| Images | `next/image` with AVIF/WebP output, custom device and image sizes, remote patterns allow-listed for Unsplash and Pexels |
| State | React Context + `useReducer` (cart, wishlist) and Context (overlay state), persisted to `localStorage` |
| Linting | ESLint `9` with `eslint-config-next` |
| Hosting | Vercel |

No database, ORM, authentication provider, payment gateway or analytics script is used.

---

## Project Structure

```
src/
├── app/                        # App Router routes
│   ├── layout.tsx              # Root layout, fonts, metadata, global chrome
│   ├── globals.css             # Tailwind v4 @theme tokens + base styles
│   ├── page.tsx                # Home
│   ├── not-found.tsx           # 404
│   ├── about/page.tsx
│   ├── collections/page.tsx
│   ├── collections/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── lookbook/page.tsx
│   ├── product/[slug]/page.tsx
│   └── shop/page.tsx
├── components/
│   ├── commerce/               # BagDrawer, WishlistDrawer, SearchOverlay,
│   │                           # QuickViewModal, SizeGuideModal, ProductCard,
│   │                           # ProductDetail, ProductOptions, ShopBrowser, ContactForm
│   ├── layout/                 # SiteHeader, SiteFooter, OverlayHost, PageHeader
│   ├── sections/               # Hero, HomeSections
│   └── ui/                     # Button, Drawer, Modal, Accordion, Field, Price,
│                               # Reveal, Logo, icons
├── lib/
│   ├── products.ts             # 18 products, categories, sizes, price formatting, selectors
│   ├── collections.ts          # The five chapters
│   ├── images.ts               # Central CDN image manifest and `imageSrc()` helper
│   ├── site.ts                 # Site config, navigation, size guide table
│   └── types.ts                # Shared domain types
└── store/                      # AppProviders, cart-context, wishlist-context, ui-context
scripts/verify-manifest.ps1     # Verifies every image in the manifest returns HTTP 200
```

---

## Design System

Colours, type and surfaces are declared once in `src/app/globals.css` inside a Tailwind v4 `@theme`
block, and consumed as ordinary utility classes throughout the app.

- **Palette** — five families of ramps: `plum` (primary/brand), `rose`, `champagne` (accent),
  `ivory` (surfaces) and `espresso` (text).
- **Typography** — Cormorant Garamond for display headings, Jost for UI and body copy, exposed as the
  `--font-display` and `--font-sans` tokens.
- **Component utilities** — `container-elare` for the layout container and `eyebrow` for the small
  uppercase tracked labels used across every section.

---

## Getting Started

Requires **Node.js 20+**.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

### Environment variables

**None.** The application requires no environment variables, API keys or external services, which is why
no `.env` file is committed. Contact form submission hands off to the visitor's mail client, and the
shopping bag, wishlist and search all run entirely in the browser.

---

## Deployment

The repository is configured for zero-config deployment on Vercel.

1. Import the repository at [vercel.com/new](https://vercel.com/new), or deploy from the CLI:

   ```bash
   npm i -g vercel
   vercel          # preview deployment
   vercel --prod   # production deployment
   ```

2. Vercel detects Next.js automatically. No build settings, no environment variables and no custom build
   command are required.

Because every route is prerendered, production serves static HTML from the edge with client-side
JavaScript enhancing the interactive commerce features.

---

## Data & Content

All content is local and type-safe — there is no CMS.

- **Catalogue** — 18 products across 4 categories (Kameez, Lawn, Co-ords, Outerwear) and 5 sizes
  (XS–XL). Adding a product to `src/lib/products.ts` automatically creates its `/product/[slug]` route
  via `generateStaticParams`.
- **Collections** — 5 chapters in `src/lib/collections.ts`.
- **Site settings** — name, contact details, address, opening hours, social links and shipping thresholds
  live in `src/lib/site.ts`.
- **Imagery** — a single manifest in `src/lib/images.ts` maps semantic keys to verified Unsplash and
  Pexels CDN assets. Base URLs are stored; sizing parameters are applied by `next/image`. No image is
  reused across two products. Run `scripts/verify-manifest.ps1` to re-verify every asset returns HTTP 200.

---

## Security Notes

- **No secrets in the repository.** There are no API keys, tokens, passwords or `.env` files. The project
  makes no server-side data calls and integrates with no third-party service.
- `.gitignore` excludes `.env*`, `.vercel/`, `node_modules/`, `.next/`, `out/`, `*.pem`, build output and
  TypeScript build info, so environment files cannot be committed by accident.
- The contact form performs client-side validation only and hands off to the visitor's own mail client;
  no message data is transmitted to or stored by a server.
- Bag and wishlist data never leaves the browser — it lives in `localStorage` under versioned keys and is
  sanitised against the catalogue on load.

---

## License

All rights reserved. The ELARÉ name, identity and copy are the property of ELARÉ Atelier. Code is
provided for reference and internal use.