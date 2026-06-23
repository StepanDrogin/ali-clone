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

            <button
                @click="login('google')"
                class="ui-button flex w-full items-center justify-center gap-3 rounded-full border border-market-line p-2 text-lg font-semibold hover:bg-market-canvas"
            >
                <img class="w-full max-w-[30px]" src="/google-logo.png" alt="Google">
                <span class="ui-span">Google</span>
            </button>

            <button
                @click="login('github')"
                class="ui-button mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-market-line p-2 text-lg font-semibold hover:bg-market-canvas"
            >
                <img class="w-full max-w-[30px]" src="/github-logo.png" alt="GitHub">
                <span class="ui-span">GitHub</span>
            </button>
        </section>
    </main>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(() => {
    if (user.value) {
        return navigateTo('/')
    }
})

const login = async (prov) => {
  await client.auth.signInWithOAuth({
    provider: prov,
    options: {
      redirectTo: window.location.origin
    }
  })
}
</script>
