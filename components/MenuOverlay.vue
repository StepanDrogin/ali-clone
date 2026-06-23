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

        <div class="h-[calc(100vh-82px)] overflow-y-auto py-5">
            <section class="ui-panel overflow-hidden">
                <h2 class="ui-title px-3 pt-3 text-sm uppercase text-market-muted">Account</h2>
                <ul class="w-full pt-2">
                    <li
                        @click="goTo('/orders')"
                        class="relative flex cursor-pointer items-center justify-between border-t border-market-line px-3 py-3 hover:bg-market-canvas"
                    >
                        <div class="flex items-center text-[18px] font-semibold">
                            <Icon name="ph:package" size="30"/>
                            <span class="ui-span pl-4">My Orders</span>
                        </div>
                    </li>

                    <li
                        @click="goTo('/shoppingcart')"
                        class="relative flex cursor-pointer items-center justify-between border-t border-market-line px-3 py-3 hover:bg-market-canvas"
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
                        class="relative flex cursor-pointer items-center justify-between border-t border-market-line px-3 py-3 hover:bg-market-canvas"
                    >
                        <div class="flex items-center text-[18px] font-semibold">
                            <Icon name="ph:sign-out" size="30"/>
                            <span class="ui-span pl-4">Sign out</span>
                        </div>
                    </li>

                    <li
                        v-else
                        @click="signIn()"
                        class="relative flex cursor-pointer items-center justify-between border-t border-market-line px-3 py-3 hover:bg-market-canvas"
                    >
                        <div class="flex items-center text-[18px] font-semibold">
                            <Icon name="ph:sign-in" size="30"/>
                            <span class="ui-span pl-4">Sign in / Register</span>
                        </div>
                    </li>
                </ul>
            </section>

            <section class="ui-panel mt-4 overflow-hidden">
                <h2 class="ui-title px-3 pt-3 text-sm uppercase text-market-muted">Shopping</h2>
                <NuxtLink
                    v-for="link in categoryMenuLinks"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center border-t border-market-line px-3 py-3 text-[18px] font-semibold hover:bg-market-canvas"
                    @click="closeMenu"
                >
                    <Icon :name="link.icon" size="30"/>
                    <span class="ui-span pl-4">{{ link.label }}</span>
                </NuxtLink>
            </section>

            <section class="ui-panel mt-4 overflow-hidden">
                <h2 class="ui-title px-3 pt-3 text-sm uppercase text-market-muted">Support</h2>
                <NuxtLink
                    v-for="link in topMenuLinks"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center border-t border-market-line px-3 py-3 text-[18px] font-semibold hover:bg-market-canvas"
                    @click="closeMenu"
                >
                    <Icon :name="link.icon" size="30"/>
                    <span class="ui-span pl-4">{{ link.label }}</span>
                </NuxtLink>
            </section>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { categoryMenuLinks, topMenuLinks } from '~/utils/navigation';
const userStore = useUserStore()

const client = useSupabaseClient()
const user = useSupabaseUser()

const closeMenu = () => {
    userStore.isMenuOverlay = false
}

const goTo = (url) => {
    closeMenu()
    return navigateTo(url)
}

const signOut = async () => {
    await client.auth.signOut()
    closeMenu()
    return navigateTo('/')
}

const signIn = () => {
    closeMenu()
    return navigateTo('/auth')
}
</script>
