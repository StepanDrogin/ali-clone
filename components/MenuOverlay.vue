<template>
    <div id="MenuOverlay" class="fixed inset-0 z-50 h-full w-full bg-white px-4">
        <div class="flex items-center justify-between border-b border-market-line py-5">
            <NuxtLink to="/" class="flex items-center gap-2" @click="userStore.isMenuOverlay = false">
                <span class="ui-span flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-market-red to-market-orange text-lg font-black text-white">M</span>
                <span class="ui-span text-xl font-extrabold text-market-ink">Market Express</span>
            </NuxtLink>

            <button
                @click="userStore.isMenuOverlay = false"
                class="ui-button rounded-lg p-2 hover:bg-market-canvas"
                aria-label="Close menu"
            >
                <Icon name="mdi:close" size="30"/>
            </button>
        </div>

        <ul class="w-full pt-5">
            <li
                @click="goTo('orders')"
                class="relative flex cursor-pointer items-center justify-between border-b border-market-line px-3 py-3 hover:bg-market-canvas"
            >
                <div class="flex items-center text-[18px] font-semibold">
                    <Icon name="ph:package" size="30"/>
                    <span class="ui-span pl-4">My Orders</span>
                </div>
            </li>

            <li
                @click="goTo('shoppingcart')"
                class="relative flex cursor-pointer items-center justify-between border-b border-market-line px-3 py-3 hover:bg-market-canvas"
            >
                <div class="flex items-center text-[18px] font-semibold">
                    <Icon name="ph:shopping-cart-simple" size="30"/>
                    <span class="ui-span pl-4">Cart</span>
                </div>
                <span class="ui-span flex h-[34px] min-w-[34px] items-center justify-center rounded-full bg-market-red px-2 text-lg font-bold text-white">
                    {{ userStore.cart.length }}
                </span>
            </li>

            <li
                v-if="user"
                @click="signOut()"
                class="relative flex cursor-pointer items-center justify-between border-b border-market-line px-3 py-3 hover:bg-market-canvas"
            >
                <div class="flex items-center text-[18px] font-semibold">
                    <Icon name="ph:sign-out" size="30"/>
                    <span class="ui-span pl-4">Sign out</span>
                </div>
            </li>

            <li
                v-else
                @click="signIn()"
                class="relative flex cursor-pointer items-center justify-between border-b border-market-line px-3 py-3 hover:bg-market-canvas"
            >
                <div class="flex items-center text-[18px] font-semibold">
                    <Icon name="ph:sign-in" size="30"/>
                    <span class="ui-span pl-4">Sign in / Register</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const client = useSupabaseClient()
const user = useSupabaseUser()

const goTo = (url) => {
    userStore.isMenuOverlay = false
    return navigateTo(`/${url}`)
}

const signOut = async () => {
    await client.auth.signOut()
    userStore.isMenuOverlay = false
    return navigateTo('/')
}

const signIn = () => {
    userStore.isMenuOverlay = false
    return navigateTo('/auth')
}
</script>
