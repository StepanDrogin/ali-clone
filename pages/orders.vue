<template>
    <MainLayout>
        <main id="OrdersPage" class="ui-page mt-4 min-h-[50vh]">
            <section class="ui-panel p-5">
                <div class="flex items-center text-xl">
                    <Icon name="carbon:delivery" class="text-market-green" size="34"/>
                    <h1 class="ui-title pl-4 text-2xl">Orders</h1>
                </div>

                <div v-if="isOrdersLoading" class="mt-4 space-y-3">
                    <div v-for="item in 3" :key="item" class="h-[118px] animate-pulse rounded-lg bg-market-canvas" />
                </div>

                <ErrorNotice
                    v-else-if="ordersError"
                    class="mt-4"
                    title="Orders could not be loaded"
                    :message="ordersError"
                    tone="warning"
                    icon="ph:package"
                />

                <div v-else-if="orders.length" class="mt-4 space-y-4">
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

definePageMeta({ middleware: "auth" })

const userId = useCurrentUserId()
const orders = ref([])
const isOrdersLoading = ref(true)
const ordersError = ref('')

onMounted(async () => {
    if (!userId.value) {
        return navigateTo('/auth')
    }

    try {
        orders.value = await $fetch(`/api/prisma/get-all-orders-by-user/${userId.value}`)
    } catch (error) {
        ordersError.value = error?.data?.message || error?.message || 'Order history is unavailable. Check the database connection and try again.'
    } finally {
        isOrdersLoading.value = false
    }
})
</script>
