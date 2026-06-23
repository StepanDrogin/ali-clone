<template>
    <div class="flex justify-start my-2">
        <img 
            class="h-[90px] w-[90px] rounded-md object-cover md:h-[130px] md:w-[150px]"
            :src="product.url"
            :alt="product.title"
        >

        <div class="overflow-hidden pl-3">
            <div class="flex items-center">
                <span class="ui-span rounded bg-market-red px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Today deal</span>
                <div class="truncate pl-2">{{ product.title }} </div>
            </div>

            <div class="text-lg font-semibold mt-2">
                $ <span class="ui-span font-bold">{{ formatPrice(product.price) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['product'])
const { product } = toRefs(props)
const formatPrice = (value) => (Number(value || 0) / 100).toFixed(2)
</script>
