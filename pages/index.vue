<template>
    <MainLayout>
        <main id="IndexPage" class="ui-page mt-4">
            <section class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div class="ui-panel overflow-hidden p-5 md:p-6">
                    <div class="max-w-2xl">
                        <h1 class="ui-title text-3xl md:text-4xl">Fresh marketplace demo with real full stack flows</h1>
                        <p class="mt-3 max-w-xl text-sm leading-6 text-market-muted md:text-base">
                            Browse seeded products, add them to cart, save delivery details, pay through Stripe and review orders stored through Prisma.
                        </p>
                    </div>
                    <div class="mt-5 flex flex-wrap gap-2">
                        <span class="ui-span rounded-lg bg-[#FFF0F2] px-3 py-2 text-sm font-semibold text-market-red">Today deals</span>
                        <span class="ui-span rounded-lg bg-[#ECFDF5] px-3 py-2 text-sm font-semibold text-market-green">Free shipping</span>
                        <span class="ui-span rounded-lg bg-market-canvas px-3 py-2 text-sm font-semibold text-market-ink">Secure checkout</span>
                    </div>
                </div>

                <div class="ui-panel grid grid-cols-2 gap-3 p-4 text-sm">
                    <div class="rounded-lg bg-market-canvas p-4">
                        <span class="ui-span text-xs font-semibold uppercase text-market-muted">Stack</span>
                        <p class="mt-2 font-semibold">Nuxt 3, Supabase, Prisma, Stripe</p>
                    </div>
                    <div class="rounded-lg bg-market-canvas p-4">
                        <span class="ui-span text-xs font-semibold uppercase text-market-muted">Release</span>
                        <p class="mt-2 font-semibold">Portfolio-ready demo</p>
                    </div>
                    <div class="col-span-2 rounded-lg bg-gradient-to-r from-market-red to-market-orange p-4 text-white">
                        <span class="ui-span text-xs font-semibold uppercase opacity-80">Checkout path</span>
                        <p class="mt-2 font-semibold">Cart -> address -> payment -> order history</p>
                    </div>
                </div>
            </section>

            <section class="mt-6">
                <div class="mb-3 flex items-end justify-between gap-3">
                    <div>
                        <h2 class="ui-title text-2xl">Today deals</h2>
                        <p class="mt-1 text-sm text-market-muted">Seeded demo catalog for local and deployed environments.</p>
                    </div>
                    <span class="ui-span hidden text-sm font-semibold text-market-muted sm:inline">{{ products.length }} products</span>
                </div>

                <div v-if="pending" class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    <div v-for="item in 12" :key="item" class="h-[260px] animate-pulse rounded-lg bg-white" />
                </div>

                <div v-else-if="error" class="ui-panel p-6 text-sm text-market-muted">
                    Catalog is temporarily unavailable. Check `DATABASE_URL` and run Prisma seed.
                </div>

                <div v-else-if="!products.length" class="ui-panel p-6 text-sm text-market-muted">
                    No products yet. Run `npx prisma db seed` to populate the demo catalog.
                </div>

                <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    <ProductComponent v-for="product in products" :key="product.id" :product="product"/>
                </div>
            </section>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore()
const { data: products, pending, error } = await useFetch('/api/prisma/get-all-products', {
    default: () => [],
    server: false
})

onMounted(() => {
    userStore.isLoading = false
})
</script>
