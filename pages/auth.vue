<template>
    <main id="AuthPage" class="min-h-screen bg-white">
        <div class="flex w-full items-center justify-center border-b border-market-line p-5">
            <NuxtLink to="/" class="flex items-center gap-2">
                <span class="ui-span flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-market-red to-market-orange text-lg font-black text-white">M</span>
                <span class="ui-span text-xl font-extrabold text-market-ink">Market Express</span>
            </NuxtLink>
        </div>

        <section class="mx-auto max-w-[420px] px-3 py-8">
            <h1 class="ui-title mb-6 text-center text-2xl">Login / Register</h1>
            <ErrorNotice
                v-if="authError"
                class="mb-4"
                :title="authError.title"
                :message="authError.message"
                tone="warning"
                icon="ph:lock-key"
                dismissible
                @dismiss="authError = null"
            />

            <button
                @click="login('google')"
                :disabled="Boolean(isWorkingProvider)"
                class="ui-button flex w-full items-center justify-center gap-3 rounded-full border border-market-line p-2 text-lg font-semibold hover:bg-market-canvas"
            >
                <Icon v-if="isWorkingProvider === 'google'" name="eos-icons:loading" size="30" class="text-market-red" />
                <img v-else class="w-full max-w-[30px]" src="/google-logo.png" alt="Google">
                <span class="ui-span">Google</span>
            </button>

            <button
                @click="login('github')"
                :disabled="Boolean(isWorkingProvider)"
                class="ui-button mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-market-line p-2 text-lg font-semibold hover:bg-market-canvas"
            >
                <Icon v-if="isWorkingProvider === 'github'" name="eos-icons:loading" size="30" class="text-market-red" />
                <img v-else class="w-full max-w-[30px]" src="/github-logo.png" alt="GitHub">
                <span class="ui-span">GitHub</span>
            </button>
        </section>
    </main>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const runtimeConfig = useRuntimeConfig()
const authError = ref(null)
const isWorkingProvider = ref('')

const providerLabels = {
    google: 'Google',
    github: 'GitHub'
}

watchEffect(() => {
    if (user.value) {
        return navigateTo('/')
    }
})

const setProviderError = (prov) => {
    const providerLabel = providerLabels[prov] || 'This provider'

    authError.value = {
        title: `${providerLabel} sign-in is not ready`,
        message: `${providerLabel} OAuth is not enabled for this deployment yet. Enable it in Supabase Authentication -> Providers, add the OAuth credentials, then set NUXT_PUBLIC_AUTH_${prov.toUpperCase()}_ENABLED=true in Netlify.`
    }
}

const getAuthRedirectUrl = () => {
    const configuredSiteUrl = String(runtimeConfig.public.siteUrl || '').replace(/\/$/, '')

    if (configuredSiteUrl && !window.location.origin.includes('localhost')) {
        return configuredSiteUrl
    }

    return window.location.origin
}

const login = async (prov) => {
    authError.value = null

    if (!runtimeConfig.public.authProviders?.[prov]) {
        setProviderError(prov)
        return
    }

    isWorkingProvider.value = prov

    try {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: prov,
            options: {
                redirectTo: getAuthRedirectUrl(),
                skipBrowserRedirect: true
            }
        })

        if (error) {
            authError.value = {
                title: 'Sign-in could not start',
                message: error.message || 'Supabase returned an authentication error. Check provider credentials and redirect URLs.'
            }
            return
        }

        if (!data?.url) {
            authError.value = {
                title: 'Sign-in URL is missing',
                message: 'Supabase did not return a provider URL. Check the authentication provider setup and try again.'
            }
            return
        }

        window.location.assign(data.url)
    } catch (error) {
        authError.value = {
            title: 'Sign-in could not start',
            message: error?.message || 'Unexpected authentication error. Check Supabase provider settings and try again.'
        }
    } finally {
        isWorkingProvider.value = ''
    }
}
</script>
