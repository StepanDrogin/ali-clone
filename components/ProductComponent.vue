<template>
    <article
        :id="`ProductComponent${product.id}`"
        class="group h-full overflow-hidden rounded-lg border border-market-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-market"
    >
        <NuxtLink :to="`/item/${product.id}`" class="flex h-full flex-col">
            <div class="aspect-[4/3] overflow-hidden bg-market-canvas">
                <img
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    :src="product.url"
                    :alt="product.title"
                    loading="lazy"
                >
            </div>

            <div id="ProductDetails" class="flex flex-1 flex-col gap-2 p-3">
                <div class="flex items-center justify-between gap-2">
                    <span class="ui-span text-lg font-extrabold text-market-red">${{ priceComputed }}</span>
                    <span class="ui-span text-sm text-market-muted line-through">${{ oldPriceComputed }}</span>
                </div>

                <div class="flex flex-wrap items-center gap-1.5">
                    <span class="ui-span rounded bg-market-red px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Today deal</span>
                    <span class="ui-span rounded border border-[#E7D0BD] bg-[#FFF8F2] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#A15F2B]">Top rated</span>
                </div>

                <p class="line-clamp-2 min-h-10 text-sm leading-5 text-market-ink">
                    {{ product.title }}
                </p>

                <div class="mt-auto flex items-center justify-between gap-2 text-xs text-market-muted">
                    <span class="ui-span flex items-center gap-1">
                        <Icon name="material-symbols:star-rate" class="text-market-amber"/>
                        4.8
                    </span>
                    <span class="ui-span font-semibold text-market-green">Free shipping</span>
                </div>
            </div>
        </NuxtLink>
    </article>
</template>

<script setup>
const props = defineProps(['product'])
const { product } = toRefs(props)

const priceComputed = computed(() => {
    return (product.value.price / 100).toFixed(2)
})

const oldPriceComputed = computed(() => {
    let res =  (product.value.price + (product.value.price / 5))  / 100
    return res.toFixed(2)
})
</script>
