import prisma from '~/server/utils/prisma'

const getSiteUrl = (event) => {
  const configuredUrl = process.env.NUXT_PUBLIC_SITE_URL
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '')
  }

  return getRequestURL(event).origin
}

const createUrlEntry = ({ loc, lastmod, priority }) => [
  '  <url>',
  `    <loc>${loc}</loc>`,
  `    <lastmod>${lastmod}</lastmod>`,
  `    <priority>${priority}</priority>`,
  '  </url>'
].join('\n')

export default defineEventHandler(async (event) => {
  const siteUrl = getSiteUrl(event)
  const now = new Date().toISOString()

  let productRoutes = []

  if (process.env.DATABASE_URL) {
    try {
      const products = await prisma.products.findMany({
        select: {
          id: true,
          created_at: true
        },
        orderBy: { id: 'asc' }
      })

      productRoutes = products.map((product) => ({
        loc: `${siteUrl}/item/${product.id}`,
        lastmod: (product.created_at || new Date()).toISOString(),
        priority: '0.7'
      }))
    } catch {
      productRoutes = []
    }
  }

  const staticRoutes = [
    {
      loc: `${siteUrl}/`,
      lastmod: now,
      priority: '1.0'
    }
  ]

  const urls = [...staticRoutes, ...productRoutes].map(createUrlEntry).join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>'
  ].join('\n')
})
