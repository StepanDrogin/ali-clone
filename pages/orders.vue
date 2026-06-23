<template>
    <MainLayout>
        <main id="OrdersPage" class="ui-page mt-4 min-h-[50vh]">
            <section class="ui-panel p-5">
                <div class="flex items-center text-xl">
                    <Icon name="carbon:delivery" class="text-market-green" size="34"/>
                    <h1 class="ui-title pl-4 text-2xl">Orders</h1>
                </div>

                <div v-if="orders.length" class="mt-4 space-y-4">
                    <article
                        v-for="order in orders"
                        :key="order.id"
                        class="rounded-lg border border-market-line p-4 text-sm"
                    >
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="ui-span font-semibold text-market-ink">Order #{{ order.id }}</span>
                            <span class="ui-span rounded-full bg-market-canvas px-3 py-1 text-xs font-semibold text-market-muted">Stripe: {{ order.stripeId }}</span>
                        </div>

                        <div class="mt-3 space-y-2">
                            <NuxtLink
                                v-for="item in order.orderItem"
                                :key="item.id"
                                class="flex items-center gap-3 rounded-lg p-2 hover:bg-market-canvas"
                                :to="`/item/${item.productId}`"
                            >
                                <img class="h-12 w-12 rounded-md object-cover" :src="item.product.url" :alt="item.product.title">
                                <span class="ui-span line-clamp-1">{{ item.product.title }}</span>
                            </NuxtLink>
                        </div>

                        <div class="mt-3 rounded-lg bg-market-canvas p-3 text-market-muted">
                            Delivery Address: {{ order.name }}, {{ order.address }}, {{ order.zipcode }}, {{ order.city }}, {{ order.country }}
                        </div>
                    </article>
                </div>

                <div v-else class="mt-6 rounded-lg bg-market-canvas p-6 text-center text-market-muted">
                    You have no order history yet.
                </div>
            </section>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';

definePageMeta({ middleware: "auth" })

const userStore = useUserStore()
const userId = useCurrentUserId()
const orders = ref([])

onMounted(async () => {
    if (!userId.value) {
        return navigateTo('/auth')
    }

    orders.value = await $fetch(`/api/prisma/get-all-orders-by-user/${userId.value}`)
    userStore.isLoading = false
})
</script>
