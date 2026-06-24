<template>
    <div
        id="MainLayout"
        class="fixed inset-x-0 top-0 z-50 border-b border-market-line backdrop-blur transition-colors duration-150"
        :class="userStore.isLoading ? 'bg-market-canvas/95' : 'bg-white/95'"
    >
        <div
            class="hidden border-b border-market-line transition-colors duration-150 md:block"
            :class="userStore.isLoading ? 'bg-market-canvas' : 'bg-[#FAFAFA]'"
        >
            <ul class="mx-auto flex h-9 max-w-[1200px] items-center justify-end gap-5 px-3 text-xs text-market-muted">
                <li v-for="link in topMenuLinks" :key="link.to">
                    <NuxtLink :to="link.to" class="hover:text-market-red">
                        <span class="ui-span">{{ link.label }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <header class="mx-auto flex max-w-[1200px] items-center gap-4 px-3 py-4">
            <NuxtLink to="/" class="flex min-w-fit items-center gap-2" aria-label="Market Express home">
                <span class="ui-span flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-market-red to-market-orange text-lg font-black text-white">M</span>
                <span class="ui-span hidden text-xl font-extrabold tracking-normal text-market-ink sm:inline">Market Express</span>
            </NuxtLink>

            <div class="relative hidden w-full md:block">
                <div class="flex h-11 items-center overflow-hidden rounded-lg border-2 border-market-red bg-white">
                    <input
                        v-model="searchItem"
                        class="h-full w-full px-4 text-sm text-market-ink placeholder:text-market-muted focus:outline-none"
                        placeholder="Search products"
                        type="search"
                        autocomplete="off"
                    >
                    <Icon
                        v-if="isSearching"
                        name="eos-icons:loading"
                        size="24"
                        class="mr-2 text-market-red"
                    />
                    <button class="ui-button flex h-full items-center justify-center bg-market-red px-4 text-white hover:bg-[#D92F43]" aria-label="Search">
                        <Icon name="ph:magnifying-glass" size="21" />
                    </button>
                </div>

                <div v-if="searchItem && searchResults.length" class="absolute left-0 right-0 top-[52px] z-50 overflow-hidden rounded-lg border border-market-line bg-white shadow-market">
                    <NuxtLink
                        v-for="item in searchResults"
                        :key="item.id"
                        :to="`/item/${item.id}`"
                        class="flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-market-canvas"
                        @click="clearSearch"
                    >
                        <div class="flex min-w-0 items-center gap-3">
                            <img class="h-11 w-11 rounded-md object-cover" :src="item.url" :alt="item.title">
                            <span class="ui-span truncate text-market-ink">{{ item.title }}</span>
                        </div>
                        <span class="ui-span font-semibold text-market-red">${{ formatPrice(item.price) }}</span>
                    </NuxtLink>
                </div>
            </div>

            <div class="ml-auto flex items-center gap-2">
                <div
                    class="relative hidden h-11 items-center md:flex"
                    @mouseenter="openAccountMenu"
                    @mouseleave="scheduleAccountMenuClose"
                    @focusin="openAccountMenu"
                    @focusout="scheduleAccountMenuClose"
                >
                    <button
                        class="ui-button flex h-11 items-center gap-2 rounded-lg border border-market-line px-3 text-sm font-semibold hover:border-market-red hover:text-market-red"
                        type="button"
                        :aria-expanded="isAccountMenu"
                        aria-controls="AccountMenu"
                        @click="toggleAccountMenu"
                    >
                        <Icon name="ph:user" size="18" />
                        <span class="ui-span">Account</span>
                        <Icon name="mdi:chevron-down" size="16" />
                    </button>

                    <div
                        v-if="isAccountMenu"
                        class="absolute right-0 top-full z-50 w-[230px] pt-2"
                    >
                        <div
                            id="AccountMenu"
                            class="overflow-hidden rounded-lg border border-market-line bg-white text-sm shadow-market"
                        >
                            <div v-if="!user" class="p-3">
                                <div class="mb-3 font-semibold text-market-ink">Welcome back</div>
                                <NuxtLink
                                    to="/auth"
                                    class="ui-button block rounded-lg bg-market-red px-3 py-2 text-center font-semibold text-white hover:bg-[#D92F43]"
                                >
                                    <span class="ui-span">Login / Register</span>
                                </NuxtLink>
                            </div>
                            <div class="border-t border-market-line">
                                <button class="ui-button flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-market-canvas" @click="goTo('/orders')">
                                    <Icon name="ph:package" size="18" />
                                    <span class="ui-span">My Orders</span>
                                </button>
                                <button v-if="user" class="ui-button flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-market-canvas" @click="signOut">
                                    <Icon name="ph:sign-out" size="18" />
                                    <span class="ui-span">Sign out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <NuxtLink to="/shoppingcart" class="hidden md:block" aria-label="Open cart">
                    <button
                        class="ui-button relative flex h-11 items-center gap-2 rounded-lg border border-market-line px-3 text-sm font-semibold hover:border-market-red hover:text-market-red"
                        @mouseenter="isCartHover = true"
                        @mouseleave="isCartHover = false"
                    >
                        <Icon name="ph:shopping-cart-simple" size="22" :class="isCartHover ? 'text-market-red' : ''" />
                        <span class="ui-span">Cart</span>
                        <span class="ui-span absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-market-red px-1 text-xs font-bold text-white">
                            {{ userStore.cart.length }}
                        </span>
                    </button>
                </NuxtLink>

                <button
                    @click="userStore.isMenuOverlay = true"
                    class="ui-button rounded-lg p-2 hover:bg-market-canvas md:hidden"
                    aria-label="Open menu"
                >
                    <Icon name="radix-icons:hamburger-menu" size="30" />
                </button>
            </div>
        </header>

        <div class="mx-auto hidden max-w-[1200px] items-center gap-2 px-3 pb-3 text-sm text-market-muted md:flex">
            <NuxtLink
                v-for="(link, index) in categoryMenuLinks"
                :key="link.to"
                :to="link.to"
                class="rounded-md px-2 py-1 hover:bg-market-canvas hover:text-market-red"
                :class="index === 0 ? 'font-semibold text-market-ink' : ''"
            >
                <span class="ui-span">{{ link.label }}</span>
            </NuxtLink>
        </div>
    </div>

    <div class="pt-[84px] md:pt-[148px]" />
    <slot />

    <Footer />
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { categoryMenuLinks, topMenuLinks } from '~/utils/navigation';

const userStore = useUserStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const isAccountMenu = ref(false)
const isCartHover = ref(false)
const isSearching = ref(false)
const searchItem = ref('')
const searchResults = ref([])
let accountMenuCloseTimer = null

const formatPrice = (value) => (Number(value || 0) / 100).toFixed(2)

const clearSearch = () => {
    searchItem.value = ''
    searchResults.value = []
}

const searchByName = useDebounce(async () => {
    const query = searchItem.value.trim()

    if (!query) {
        searchResults.value = []
        isSearching.value = false
        return
    }

    isSearching.value = true

    try {
        searchResults.value = await $fetch(`/api/prisma/search-by-name/${encodeURIComponent(query)}`)
    } catch (error) {
        searchResults.value = []
    } finally {
        isSearching.value = false
    }
}, 180)

const clearAccountMenuCloseTimer = () => {
    if (accountMenuCloseTimer) {
        window.clearTimeout(accountMenuCloseTimer)
        accountMenuCloseTimer = null
    }
}

const openAccountMenu = () => {
    clearAccountMenuCloseTimer()
    isAccountMenu.value = true
}

const closeAccountMenu = () => {
    clearAccountMenuCloseTimer()
    isAccountMenu.value = false
}

const toggleAccountMenu = () => {
    clearAccountMenuCloseTimer()
    isAccountMenu.value = !isAccountMenu.value
}

const scheduleAccountMenuClose = () => {
    clearAccountMenuCloseTimer()
    accountMenuCloseTimer = window.setTimeout(() => {
        isAccountMenu.value = false
        accountMenuCloseTimer = null
    }, 180)
}

const goTo = (path) => {
    closeAccountMenu()
    return navigateTo(path)
}

const signOut = async () => {
    await client.auth.signOut()
    closeAccountMenu()
    return navigateTo('/')
}

onBeforeUnmount(() => {
    clearAccountMenuCloseTimer()
})

watch(() => searchItem.value, () => {
    searchByName()
})
</script>
