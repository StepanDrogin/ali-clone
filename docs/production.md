# Production Runbook

This project is prepared for Netlify production deploys with Nuxt/Nitro, Prisma, Supabase Auth and Stripe.

## Required Environment Variables

Configure these variables in Netlify before a production deploy:

```text
DATABASE_URL
NUXT_PUBLIC_SITE_URL
NUXT_PUBLIC_SUPABASE_URL
NUXT_PUBLIC_SUPABASE_KEY
STRIPE_PK_KEY
STRIPE_SK_KEY
```

Do not commit real values to the repository.

## Database Release

Run migrations before the first production deploy and whenever Prisma migrations change:

```bash
npm run db:migrate:deploy
```

Seed the demo catalog only when the target database is empty or intentionally reset:

```bash
npm run db:seed
```

## Local Production Check

```bash
npm install
npm run prod:check
npm audit --audit-level=moderate
```

To force the same environment validation used by Netlify production builds:

```bash
REQUIRE_PRODUCTION_ENV=true npm run validate:production-env
```

PowerShell:

```powershell
$env:REQUIRE_PRODUCTION_ENV = 'true'
npm run validate:production-env
Remove-Item Env:\REQUIRE_PRODUCTION_ENV
```

## Netlify Deploy

```bash
npx netlify login
npx netlify link --git-remote-url https://github.com/StepanDrogin/ali-clone.git
npm run deploy:preview
npm run deploy:prod
```

After deploy, check:

```text
/api/health
/robots.txt
/sitemap.xml
```

## Rollback

Use Netlify Deploys to restore the last healthy deploy if production checkout, auth or catalog flows regress.
