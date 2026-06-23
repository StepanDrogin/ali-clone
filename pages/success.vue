<template>
    <MainLayout>
        <main id="SuccessPage" class="ui-page mt-4 min-h-[50vh]">
            <section class="ui-panel p-6">
                <div class="flex items-center text-xl">
                    <Icon name="clarity:success-standard-line" class="text-market-green" size="35"/>
                    <h1 class="ui-title pl-4 text-2xl">Payment Successful</h1>
                </div>
                <p class="pl-[52px] pt-2 text-sm text-market-muted">Thank you. Your payment was received and the order is now available in order history.</p>
                <NuxtLink to="/orders" class="ml-[52px] mt-5 inline-flex rounded-full bg-market-red px-5 py-2 font-semibold text-white hover:bg-[#D92F43]">
                    View orders
                </NuxtLink>
            </section>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

onMounted(() => {
    userStore.isLoading = false
})
</script>
