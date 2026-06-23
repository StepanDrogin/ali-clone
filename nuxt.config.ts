// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    css: ['~/assets/css/main.css'],
    devtools: {
        enabled: false
    },
    modules: [
        'nuxt-icon',
        'nuxt-lodash',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase'
    ],
    runtimeConfig: {
        public: {
          stripePk: process.env.STRIPE_PK_KEY,
          authProviders: {
            google: process.env.NUXT_PUBLIC_AUTH_GOOGLE_ENABLED === 'true',
            github: process.env.NUXT_PUBLIC_AUTH_GITHUB_ENABLED === 'true'
          }
        }
    },
    supabase: {
        redirect: false,
        types: false,
        url: process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY || 'local-preview-anon-key'
    },
    app: {
        head: {
          title: 'Market Express',
          meta: [
            { name: 'description', content: 'Full stack Nuxt marketplace demo with catalog, cart, checkout, orders, Supabase auth, Prisma and Stripe.' }
          ],
          script: [
            { src: 'https://js.stripe.com/v3/', defer: true }
          ],
        }
      }
})
