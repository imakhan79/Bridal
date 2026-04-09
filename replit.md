# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a premium South Asian fashion e-commerce website called "Nazakat" selling Pakistani and Indian designer wear.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion

## Artifacts

- **south-asian-fashion** (previewPath: `/`) — Main e-commerce frontend (React + Vite)
- **api-server** (previewPath: `/api`) — Express REST API backend

## South Asian Fashion Store — Nazakat

A luxury Pakistani and Indian designer wear e-commerce site featuring HSY, Azeera, Haseens Official, and Nameera by Farooq.

### Designers
- HSY, Azeera, Haseens Official, Nameera by Farooq

### Pages
- `/` — Homepage with hero, new arrivals, occasion tiles, designers, lookbook, reviews
- `/collections/:slug` — Collection listing with working filter sidebar (designer, occasion, fabric, color) + sort dropdown
- `/products/:slug` — Product detail with image gallery, size selector (with active state), Add to Bag (cart), Add to Wishlist, accordions, related products
- `/pages/contact-us` — Contact form with dressInterest dropdown, WhatsApp chat button, phone numbers, boutique locations
- `/pages/about-us` — About page with brand story, designers, custom tailoring info
- `/pages/size-chart` — Full size chart with measurement guide (XS–3XL)
- `/pages/shipping-policy` — Detailed shipping policy (worldwide free, DHL, timeframes, customs)
- `/pages/return-policy` — Return & exchange policy (custom vs ready-to-wear)

### Global State (StoreContext in App.tsx)
- `currency`: USD | PKR | GBP | AED | AUD — controls price display
- `cart`: CartItem[] — Add to Bag functionality, cart count shown in header badge
- `wishlist`: string[] (slugs) — heart icon toggle on product cards and detail page, wishlist count in header

### Layout Features (layout.tsx)
- Sticky header with announcement bar
- Desktop: centered logo, nav links in two rows, currency switcher dropdown, search/wishlist/account/cart icons
- Mobile: hamburger menu (≡/X) opens right-side drawer with full nav, currency picker, contact info
- WhatsApp FAB (fixed bottom-right, green button)
- Full footer with shop links, help links, contact info, payment icons

### Collection Page Filters (collection.tsx)
- Client-side filtering by: Designer (checkbox), Occasion (checkbox), Fabric (checkbox), Color (color swatches)
- Active filter tags shown above grid with individual X to remove
- Sort dropdown: Featured, Newest First, Price Low-High, Price High-Low (wired to API `sort` param)
- Mobile: "Filters" button toggles inline filter panel

### API Endpoints
- `GET /api/products` — list products (supports: collection, sort, limit, offset, featured, occasion)
- `GET /api/products/featured` — featured products
- `GET /api/products/new-arrivals` — new arrivals
- `GET /api/products/:slug` — single product
- `GET /api/products/:slug/related` — related products (excludes self, prefers same occasion)
- `GET /api/collections` — all collections
- `GET /api/collections/:slug` — collection + its products
- `GET /api/designers` — all designers
- `GET /api/reviews` — all reviews
- `POST /api/inquiries` — submit inquiry (name, email, phone, dressInterest, message)

### Database Tables (PostgreSQL / Drizzle)
- `products`: 8 seeded products across bridal, eid-2026, formal collections
- `collections`: bridal, eid-2026, formal
- `designers`: HSY, Azeera, Haseens Official, Nameera by Farooq
- `reviews`: 6 reviews
- `inquiries`: stores contact form submissions (supports dressInterest field)

### Product Slugs (seeded)
- azeera-floral-thread-embroidered-lehenga
- hsy-parisian-embroidered-front-open-shirt-lehenga
- nameera-embroidered-raw-silk-eid-dress
- haseens-zulaikha-chiffon-lehenga-teal
- azeera-royal-burgundy-anarkali
- nameera-eid-kurta-sharara-blush
- hsy-midnight-blue-sherwani
- haseens-mehendi-yellow-lehenga

### Design System
- Font: Playfair Display (serif headings), Inter (body)
- Colors: `nazakat-gold` (#B8973A), `nazakat-teal` (#2A7B7B)
- Public images: `/images/hero-bg.png`, `/images/lookbook-banner.png`, `/images/occasion-*.png`
