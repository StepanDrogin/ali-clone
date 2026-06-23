<template>
  <div class="fixed z-[-1] bg-[#F2F2F2] w-full h-[100vh]"/>
  <NuxtPage />

  <MenuOverlay
    :class="[
        {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
        {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
    ]"
  />
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const router = useRouter()
let windowWidth = ref(0)
let removeResizeListener = null
let removeBeforeEach = null
let removeAfterEach = null
let removeRouterErrorHandler = null
let loadingFallbackTimer = null

const clearLoadingFallback = () => {
    if (loadingFallbackTimer) {
        window.clearTimeout(loadingFallbackTimer)
        loadingFallbackTimer = null
    }
}

const startLoading = () => {
    clearLoadingFallback()
    userStore.isLoading = true

    loadingFallbackTimer = window.setTimeout(() => {
        userStore.isLoading = false
        loadingFallbackTimer = null
    }, 8000)
}

const stopLoading = async () => {
    clearLoadingFallback()
    await nextTick()
    userStore.isLoading = false
}

onMounted(() => {
    stopLoading()
    windowWidth.value = window.innerWidth
    const onResize = () => {
        windowWidth.value = window.innerWidth;
    }
    window.addEventListener('resize', onResize);
    removeResizeListener = () => window.removeEventListener('resize', onResize)
    removeBeforeEach = router.beforeEach((to, from) => {
        if (to.fullPath !== from.fullPath) {
            startLoading()
        }
    })
    removeAfterEach = router.afterEach(() => {
        stopLoading()
    })
    removeRouterErrorHandler = router.onError(stopLoading)
})

onBeforeUnmount(() => {
    removeResizeListener?.()
    removeBeforeEach?.()
    removeAfterEach?.()
    removeRouterErrorHandler?.()
    clearLoadingFallback()
})

watch(() => windowWidth.value, () => {
    if (windowWidth.value >= 767) {
        userStore.isMenuOverlay = false
    }
})

</script>
