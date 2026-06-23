<template>
    <MainLayout>
        <main id="ItemPage" class="ui-page mt-4">
            <ErrorNotice
                v-if="error"
                title="Product is unavailable"
                message="This product could not be loaded or no longer exists in the catalog."
                tone="warning"
                icon="ph:package"
                action-label="Back to deals"
                action-to="/"
            />

            <div v-else-if="product" class="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
                <section class="ui-panel p-3">
                    <img
                        v-if="currentImage"
                        class="aspect-[4/3] w-full rounded-lg object-cover"
                        :src="currentImage"
                        :alt="product.title"
                    >
                    <div class="mt-3 grid grid-cols-5 gap-2">
                        <button
                            v-for="image in images"
                            :key="image"
                            @mouseover="currentImage = image"
                            @click="currentImage = image"
                            class="ui-button overflow-hidden rounded-lg border-2"
                            :class="currentImage === image ? 'border-market-red' : 'border-transparent hover:border-market-line'"
                            :aria-label="`Preview ${product.title}`"
                        >
                            <img class="aspect-square w-full object-cover" :src="image" :alt="product.title">
                        </button>
                    </div>
                </section>

                <section class="ui-panel p-4 md:p-5">
                    <h1 class="ui-title text-2xl md:text-3xl">{{ product.title }}</h1>
                    <p class="mt-3 text-sm leading-6 text-market-muted">{{ product.description }}</p>

                    <div class="mt-4 flex flex-wrap items-center gap-2">
                        <span class="ui-span flex items-center gap-1 rounded-full bg-[#FFF5CC] px-3 py-1 text-sm font-semibold text-[#8A5B00]">
                            <Icon name="material-symbols:star-rounded" size="16"/>
                            Top rated
                        </span>
                        <span class="ui-span rounded-full bg-[#FFF0F2] px-3 py-1 text-sm font-semibold text-market-red">Extra 5% off</span>
                    </div>

                    <div class="mt-4 flex items-center gap-1">
                        <Icon v-for="star in 5" :key="star" name="ic:baseline-star" class="text-market-red"/>
                        <span class="ui-span ml-2 text-[13px] font-light text-market-muted">5,213 reviews · 1,000+ orders</span>
                    </div>

                    <div class="my-5 border-b border-market-line" />

                    <div class="flex items-center gap-3">
                        <div class="text-3xl font-extrabold">$ {{ priceComputed }}</div>
                        <span class="ui-span rounded border border-[#E7D0BD] bg-[#FFF8F2] px-2 py-1 text-xs font-bold uppercase text-[#A15F2B]">20% off</span>
                    </div>

                    <div class="mt-4 grid gap-2 text-sm text-market-green sm:grid-cols-2">
                        <p class="rounded-lg bg-[#ECFDF5] p-3 font-semibold">Free 11-day delivery</p>
                        <p class="rounded-lg bg-[#ECFDF5] p-3 font-semibold">Free shipping</p>
                    </div>

                    <button
                        @click="addToCart()"
                        :disabled="isInCart"
                        class="ui-button mt-6 rounded-full bg-gradient-to-r from-market-orange to-market-red px-7 py-3 text-lg font-semibold text-white"
                    >
                        <span v-if="isInCart" class="ui-span">Added to cart</span>
                        <span v-else class="ui-span">Add to Cart</span>
                    </button>
                </section>
            </div>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore()
const route = useRoute()
const currentImage = ref(null)

const { data: product, error } = await useFetch(`/api/prisma/get-product-by-id/${route.params.id}`)

const images = computed(() => {
    if (!product.value) {
        return []
    }

    return [
        product.value.url,
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    ]
})

watchEffect(() => {
    if (product.value) {
        currentImage.value = product.value.url
    }
})

const isInCart = computed(() => {
    return userStore.cart.some((prod) => Number(route.params.id) === prod.id)
})

const priceComputed = computed(() => {
    if (product.value) {
        return (product.value.price / 100).toFixed(2)
    }
    return '0.00'
})

const addToCart = () => {
    if (!product.value || isInCart.value) {
        return
    }

    userStore.cart.push(product.value)
}
</script>
