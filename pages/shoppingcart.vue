<template>
    <MainLayout>
        <main id="ShoppingCartPage" class="ui-page mt-4">
            <div v-if="!userStore.cart.length" class="flex min-h-[520px] items-center justify-center">
                <div class="ui-panel max-w-md p-8 text-center">
                    <img
                        class="mx-auto"
                        width="220"
                        src="/cart-empty.png"
                        alt="Empty cart"
                    >

                    <h1 class="ui-title mt-5 text-2xl">Your cart is empty</h1>
                    <p class="mt-2 text-sm text-market-muted">Add a few products from the catalog to continue the checkout flow.</p>

                    <div v-if="!user" class="mt-5 flex text-center">
                        <NuxtLink
                            to="/auth"
                            class="ui-button w-full rounded-full bg-market-red p-2 text-[18px] font-semibold text-white hover:bg-[#D92F43]"
                        >
                            <span class="ui-span">Sign in</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div v-else class="grid gap-4 md:grid-cols-[1fr_380px]">
                <section>
                    <div class="ui-panel p-4">
                        <h1 class="ui-title text-2xl">Shopping Cart ({{ userStore.cart.length }})</h1>
                        <p class="mt-1 text-sm text-market-muted">Select items for checkout or continue with the whole cart.</p>
                    </div>

                    <div class="mt-4 rounded-lg border border-[#FFD7DC] bg-[#FFF0F2] p-4">
                        <div class="font-bold text-market-red">Today deal applies to selected demo products</div>
                    </div>

                    <div id="Items" class="ui-panel mt-4 p-4">
                        <CartItem
                            v-for="product in userStore.cart"
                            :key="product.id"
                            :product="product"
                            @selectedRadio="selectedRadioFunc"
                        />
                    </div>
                </section>

                <aside>
                    <div id="Summary" class="ui-panel p-4">
                        <h2 class="ui-title text-2xl">Summary</h2>
                        <div class="my-4 flex items-center justify-between">
                            <div class="font-semibold">Total</div>
                            <div class="text-2xl font-semibold">
                                $ <span class="ui-span font-extrabold">{{ totalPriceComputed }}</span>
                            </div>
                        </div>
                        <button
                            @click="goToCheckout"
                            class="ui-button flex w-full items-center justify-center rounded-full bg-market-red p-2 text-[20px] font-semibold text-white hover:bg-[#D92F43]"
                        >
                            Checkout
                        </button>
                    </div>

                    <div id="PaymentProtection" class="ui-panel mt-4 p-4">
                        <h2 class="ui-title mb-2 text-lg">Payment methods</h2>
                        <div class="my-4 flex items-center justify-start gap-8">
                            <img v-for="card in cards" :key="card" class="h-6" :src="card" :alt="card">
                        </div>

                        <div class="border-b border-market-line"/>

                        <h2 class="ui-title mb-2 mt-3 text-lg">Buyer Protection</h2>
                        <p class="my-2 text-sm text-market-muted">
                            Get a full refund if an item is not as described or is not delivered.
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore()
const user = useSupabaseUser()
const selectedProductIds = ref([])

const cards = ref([
    'visa.png',
    'mastercard.png',
    'paypal.png',
    'applepay.png',
])

const formatPrice = (value) => (Number(value || 0) / 100).toFixed(2)

const selectedProducts = computed(() => {
    if (!selectedProductIds.value.length) {
        return userStore.cart
    }

    return userStore.cart.filter((item) => selectedProductIds.value.includes(item.id))
})

const totalPriceComputed = computed(() => {
    const price = selectedProducts.value.reduce((sum, prod) => sum + Number(prod.price || 0), 0)
    return formatPrice(price)
})

const selectedRadioFunc = ({ id, val }) => {
    if (val && !selectedProductIds.value.includes(id)) {
        selectedProductIds.value.push(id)
        return
    }

    selectedProductIds.value = selectedProductIds.value.filter((itemId) => itemId !== id)
}

const goToCheckout = () => {
    userStore.checkout = selectedProducts.value.map((item) => toRaw(item))
    return navigateTo('/checkout')
}
</script>
