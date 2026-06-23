const getSiteUrl = (event) => {
  const configuredUrl = process.env.NUXT_PUBLIC_SITE_URL
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '')
  }

  return getRequestURL(event).origin
}

export default defineEventHandler((event) => {
  const siteUrl = getSiteUrl(event)

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`
  ].join('\n')
})
