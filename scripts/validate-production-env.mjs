const productionContext = process.env.CONTEXT === 'production'
const forcedValidation = process.env.REQUIRE_PRODUCTION_ENV === 'true'

if (!productionContext && !forcedValidation) {
  console.log('Skipping production environment validation outside production context.')
  process.exit(0)
}

const requiredVariables = [
  'DATABASE_URL',
  'NUXT_PUBLIC_SITE_URL',
  'NUXT_PUBLIC_SUPABASE_URL',
  'NUXT_PUBLIC_SUPABASE_KEY',
  'STRIPE_PK_KEY',
  'STRIPE_SK_KEY'
]

const missingVariables = requiredVariables.filter((name) => !process.env[name])

if (missingVariables.length) {
  console.error('Production build is missing required environment variables:')
  for (const name of missingVariables) {
    console.error(`- ${name}`)
  }
  process.exit(1)
}

console.log('Production environment variables are configured.')
