<template>
    <MainLayout>
        <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div class="md:flex gap-4 justify-between mx-auto w-full">
                <div class="md:w-[40%]">
                    <img
                        v-if="currentImage"
                        class="rounded-lg object-fit"
                        :src="currentImage"
                    >
                    <div v-if="images[0] !== ''" class="flex items-center justify-center mt-2" >
                        <div v-for="image in images">
                            <img
                            @mouseover="currentImage = image"
                                @click="currentImage = image"
                                width="70"
                                class="rounded-md object-fit border-[3px] cursor-pointer"
                                :class="currentImage === image ? 'border-[#FF5353]' : ''"
                                :src="image"
                            >
                        </div>
                    </div>
                </div>
                <div class="md:w-[60%] bg-white p-3 rounded-lg">
                    <div v-if="true">
                        <p class="mb-2">Title</p>
                        <p class="font-light text-[12px] mb-2">Description Section</p>
                    </div>
                    <div class="flex items-center pt-1.5">
                        <span class="h-4 min-w-4 rounded-full p-0.5 bg-[#FFD000] mr-2">
                            <Icon name="material-symbols:star-rounded" class="-mt-[17px]" size="12"/>
                        </span>
                        <p class="text-[#FF5353]">Extra 5% off</p>
                    </div>
                    <div class="flex items-center justify-start my-2">
                        <Icon name="ic:baseline-star" color="#FF5353"/>
                        <Icon name="ic:baseline-star" color="#FF5353"/>
                        <Icon name="ic:baseline-star" color="#FF5353"/>
                        <Icon name="ic:baseline-star" color="#FF5353"/>
                        <Icon name="ic:baseline-star" color="#FF5353"/>
                        <span class="text-[13px] font-light ml-2">5 213 Reviews 1,000+ orders</span>
                    </div>
                    <div class="border-b"></div>
                    <div class="flex items-center justify-start gap-2 my-2">
                        <div class="text-xl font-bold">$ {{ priceComputed }}</div>
                        <span class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm">70% off</span>
                    </div>
                    <p class="text-[#009A66] text-xs font-semibold pt-1">
                        Free 11-day delivery over $8.28
                    </p>
                    <p class="text-[#009A66] text-xs font-semibold pt-1">
                        Free shipping 
                    </p>
                    <div class="py-2"></div>
                    <button
                    @click="addToCart()"
                    :disabled="isInCart"
                    class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#FF851A] to-[#FFAC2C]"
                    >
                    <div v-if="isInCart">Is Added</div>
                    <div v-else>Add to Cart</div>
                </button>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

const route = useRoute()

let currentImage = ref(null)

onMounted(() => {
    watchEffect(() => {
        currentImage.value = 'https://as2.ftcdn.net/v2/jpg/00/97/58/97/1000_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg'
        images.value[0] = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHKKVogOI8JHHSDzM5tmIgGd9jD_NcscrmKw&usqp=CAU'
    })
})

const isInCart = ((computed) => {
    let res = false
    userStore.cart.forEach(prod => {
        if (route.params.id == prod.id) {
            res = true
        }
    })
    return res
})

const priceComputed = computed(() => {
    return '26.40'
})

const images = ref([
    '',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHKKVogOI8JHHSDzM5tmIgGd9jD_NcscrmKw&usqp=CAU',
    'https://icdn.lenta.ru/images/2019/10/06/13/20191006135047104/square_1024_3615e7dc238cab977f9163550f2d8b6b.jpg',
    'https://wl-adme.cf.tsp.li/resize/728x/jpg/a0a/9c6/6c8266551398ae6d3bf7200468.jpg',
    'https://icdn.lenta.ru/images/2019/10/06/13/20191006135047104/square_1024_3615e7dc238cab977f9163550f2d8b6b.jpg',
    'https://www.pravmir.ru/wp-content/uploads/2023/02/457585688-936x560.jpg',
])

const addToCart = () => {
    alert('added')
}
</script>
