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

A luxury Pakistani and Indian designer wear e-commerce site.

### Pages
- `/` — Homepage with hero, new arrivals, occasion tiles, designers, lookbook, reviews
- `/collections/bridal` — Bridal collection listing
- `/collections/eid-2026` — Eid 2026 collection listing
- `/collections/formal` — Formal wear listing
- `/products/:slug` — Product detail page
- `/pages/contact-us` — Contact with inquiry form
- `/pages/about-us` — About Us
- `/pages/size-chart` — Size Chart
- `/pages/shipping-policy` — Shipping Policy
- `/pages/return-policy` — Return Policy

### Designers
- HSY, Azeera, Haseens Official, Nameera by Farooq

### Design System
- Fonts: Playfair Display (headings), Inter (body)
- Colors: Cream/ivory background, antique gold accent (#B8973A), teal (#2A7B7B), blush, burgundy

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/south-asian-fashion run dev` — run frontend locally

## Database Schema
- `products` — Product catalog
- `collections` — Curated collections (bridal, eid-2026, formal)
- `designers` — Designer profiles
- `reviews` — Customer reviews
- `inquiries` — Contact form submissions

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
