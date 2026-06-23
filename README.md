# Market Express

Full stack marketplace demo built with Nuxt 3, Supabase Auth, Prisma/PostgreSQL, Pinia and Stripe PaymentIntents.

![Market Express desktop screenshot](docs/screenshots/home-desktop.png)

## Features

- Product catalog, search, product details, cart and checkout.
- Supabase OAuth auth with Google/GitHub.
- Prisma models for products, addresses, orders and order items.
- Stripe PaymentIntent checkout flow.
- Persisted cart/checkout state with Pinia.
- Tailwind-based design system with `ui-button`, `ui-span` and `ui-title` classes.

## Screenshots

| Desktop | Mobile |
| --- | --- |
| ![Desktop catalog](docs/screenshots/home-desktop.png) | ![Mobile catalog](docs/screenshots/home-mobile.png) |

Design reference: [docs/screenshots/concept-marketplace.png](docs/screenshots/concept-marketplace.png)

## Stack

- Nuxt `3.21`
- Vue `3.5`
- Tailwind CSS module
- Supabase Nuxt module
- Prisma `4.16`
- Stripe Node SDK and Stripe.js
- Pinia with persisted state

## Local Setup

```bash
npm install
cp .env.example .env
npx prisma generate
npm run db:migrate:deploy
npm run db:seed
npm run dev
```

Required environment variables are listed in `.env.example`.

For local UI-only preview without real Supabase credentials, the app uses safe placeholder Supabase config values. Real login, address, checkout and order flows require valid Supabase, PostgreSQL and Stripe environment variables.

## Production

```bash
npm run prod:check
npm run db:migrate:deploy
npm run build:netlify
npm run start
```

Deploy to Netlify as a Nuxt/Nitro server app. Configure the same environment variables in Netlify before running migrations and production deploys. Production builds validate required environment variables automatically when `CONTEXT=production`.

Operational endpoints:

- `/api/health`
- `/robots.txt`
- `/sitemap.xml`

See [docs/production.md](docs/production.md) for the deploy checklist.

## Releases

- [v1.0.0 refreshed full stack demo](docs/releases/v1.0.0.md)

## Disclaimer

This is an educational portfolio project. It is not affiliated with AliExpress, Alibaba Group, Supabase or Stripe.
