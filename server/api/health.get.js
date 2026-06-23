import prisma from '~/server/utils/prisma'

const requiredVariables = [
  'DATABASE_URL',
  'NUXT_PUBLIC_SITE_URL',
  'NUXT_PUBLIC_SUPABASE_URL',
  'NUXT_PUBLIC_SUPABASE_KEY',
  'STRIPE_PK_KEY',
  'STRIPE_SK_KEY'
]

export default defineEventHandler(async () => {
  const missingVariables = requiredVariables.filter((name) => !process.env[name])

  if (missingVariables.length) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service is not fully configured'
    })
  }

  try {
    await prisma.$queryRaw`SELECT 1`
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: 'Database is unavailable'
    })
  }

  return {
    status: 'ok',
    checkedAt: new Date().toISOString()
  }
})
