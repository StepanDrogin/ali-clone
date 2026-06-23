<template>
    <div class="flex gap-3 border-b border-market-line py-3 last:border-b-0">
        <button
            class="ui-button mt-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
            :class="[
                isSelected ? 'border-market-red bg-market-red' : 'border-market-line bg-white hover:border-market-red'
            ]"
            :aria-label="isSelected ? 'Unselect product' : 'Select product'"
            @click="isSelected = !isSelected"
        >
            <span class="ui-span h-2 w-2 rounded-full bg-white" />
        </button>

        <img
            class="h-[96px] w-[96px] rounded-lg object-cover md:h-[132px] md:w-[132px]"
            :src="product.url"
            :alt="product.title"
        >

        <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                    <span class="ui-span mb-1 inline-flex rounded bg-market-red px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Today deal</span>
                    <p class="truncate font-semibold text-market-ink">{{ product.title }}</p>
                </div>
                <button
                    @click="removeFromCart()"
                    class="ui-button hidden rounded-lg p-2 text-market-muted hover:bg-market-canvas hover:text-market-red sm:block"
                    aria-label="Remove product"
                >
                    <Icon name="material-symbols:delete-outline" size="20" />
                </button>
            </div>

            <div class="mt-2 text-xl font-semibold">
                $ <span class="ui-span font-bold">{{ formatPrice(product.price) }}</span>
            </div>

            <p class="pt-1 text-xs font-semibold text-market-green">
                Free 11-day delivery
            </p>

            <p class="pt-1 text-xs font-semibold text-market-green">
                Free shipping
            </p>

            <div class="flex justify-end sm:hidden">
                <button
                    @click="removeFromCart()"
                    class="ui-button rounded-lg p-2 text-market-muted hover:bg-market-canvas hover:text-market-red"
                    aria-label="Remove product"
                >
                    <Icon name="material-symbols:delete-outline" size="20" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const props = defineProps(['product'])
const { product } = toRefs(props)
const emit = defineEmits(['selectedRadio'])

let isSelected = ref(false)

const formatPrice = (value) => (Number(value || 0) / 100).toFixed(2)

const removeFromCart = () => {
    userStore.cart = userStore.cart.filter((prod) => prod.id !== product.value.id)
}

watch(() => isSelected.value, (val) => {
    emit('selectedRadio', { id: product.value.id, val })
})
</script>
