<template>
  <div class="fixed z-[-1] bg-[#F2F2F2] w-full h-[100vh]"/>
  <NuxtPage />
  <Loading v-if="userStore.isLoading" />

  <Transition
    enter-active-class="transition-opacity duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <MenuOverlay v-if="userStore.isMenuOverlay" />
  </Transition>
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
let stopLoadingTimer = null
let loadingStartedAt = 0
const minimumLoadingMs = 420

const clearLoadingTimers = () => {
    if (loadingFallbackTimer) {
        window.clearTimeout(loadingFallbackTimer)
        loadingFallbackTimer = null
    }

    if (stopLoadingTimer) {
        window.clearTimeout(stopLoadingTimer)
        stopLoadingTimer = null
    }
}

const startLoading = () => {
    clearLoadingTimers()
    loadingStartedAt = Date.now()
    userStore.isLoading = true

    loadingFallbackTimer = window.setTimeout(() => {
        userStore.isLoading = false
        loadingFallbackTimer = null
    }, 8000)
}

const stopLoading = async () => {
    if (loadingFallbackTimer) {
        window.clearTimeout(loadingFallbackTimer)
        loadingFallbackTimer = null
    }

    await nextTick()
    const elapsed = Date.now() - loadingStartedAt
    const remaining = Math.max(0, minimumLoadingMs - elapsed)

    if (remaining) {
        stopLoadingTimer = window.setTimeout(() => {
            userStore.isLoading = false
            stopLoadingTimer = null
        }, remaining)
        return
    }

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
    clearLoadingTimers()
})

watch(() => windowWidth.value, () => {
    if (windowWidth.value >= 767) {
        userStore.isMenuOverlay = false
    }
})

</script>
