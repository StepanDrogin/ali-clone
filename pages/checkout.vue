<template>
    <MainLayout>
        <main id="CheckoutPage" class="ui-page mt-4">
            <div class="grid gap-4 md:grid-cols-[1fr_380px]">
                <section>
                    <div class="ui-panel p-4">
                        <h1 class="ui-title mb-3 text-xl">Shipping Address</h1>

                        <div v-if="currentAddress">
                            <NuxtLink
                                to="/address"
                                class="mb-3 flex items-center pb-2 text-sm font-semibold text-blue-600 hover:text-market-red"
                            >
                                <Icon name="mdi:plus" size="18" class="mr-2"/>
                                Update Address
                            </NuxtLink>

                            <div class="border-t border-market-line pt-3">
                                <div class="pb-2 text-sm font-semibold underline">Delivery Address</div>
                                <ul class="space-y-1 text-sm text-market-muted">
                                    <li class="flex items-center gap-2">
                                        <div>Contact name:</div>
                                        <div class="font-bold text-market-ink">{{ currentAddress.name }}</div>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <div>Address:</div>
                                        <div class="font-bold text-market-ink">{{ currentAddress.address }}</div>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <div>Zip Code:</div>
                                        <div class="font-bold text-market-ink">{{ currentAddress.zipcode }}</div>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <div>City:</div>
                                        <div class="font-bold text-market-ink">{{ currentAddress.city }}</div>
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <div>Country:</div>
                                        <div class="font-bold text-market-ink">{{ currentAddress.country }}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <NuxtLink
                            v-else
                            to="/address"
                            class="flex items-center text-sm font-semibold text-blue-600 hover:text-market-red"
                        >
                            <Icon name="mdi:plus" size="18" class="mr-2"/>
                            Add New Address
                        </NuxtLink>

                        <ErrorNotice
                            v-if="shippingError"
                            class="mt-3"
                            title="Shipping address could not be loaded"
                            :message="shippingError"
                            tone="warning"
                            icon="ph:map-pin"
                        />
                    </div>

                    <div id="Items" class="ui-panel mt-4 p-4">
                        <CheckoutItem v-for="product in userStore.checkout" :key="product.id" :product="product" />
                    </div>
                </section>

                <aside>
                    <div id="PlaceOrder" class="ui-panel p-4">
                        <h2 class="ui-title text-2xl">Summary</h2>

                        <div class="my-4 flex items-center justify-between text-sm">
                            <div>Total Shipping</div>
                            <div>Free</div>
                        </div>

                        <div class="border-t border-market-line" />

                        <div class="my-4 flex items-center justify-between">
                            <div class="font-semibold">Total</div>
                            <div class="text-2xl font-semibold">
                                $ <span class="ui-span font-extrabold">{{ formatPrice(total) }}</span>
                            </div>
                        </div>

                        <form @submit.prevent="pay()">
                            <div
                                class="rounded-lg border border-market-line p-3"
                                id="card-element"
                            />

                            <div id="card-error" class="mt-3 min-h-6">
                                <ErrorNotice
                                    v-if="paymentError"
                                    title="Payment needs attention"
                                    :message="paymentError"
                                    tone="warning"
                                    icon="ph:credit-card"
                                />
                            </div>

                            <button
                                :disabled="isProcessing || !isCardComplete || !currentAddress"
                                type="submit"
                                class="ui-button mt-4 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-market-orange to-market-red p-2 text-[20px] font-semibold text-white"
                            >
                                <Icon v-if="isProcessing" name="eos-icons:loading" />
                                <span v-else class="ui-span">Place order</span>
                            </button>
                        </form>
                    </div>

                    <div class="ui-panel mt-4 p-4">
                        <h2 class="ui-title mb-2 mt-2 text-lg">Secure checkout</h2>
                        <p class="my-2 text-sm text-market-muted">
                            Payment is handled by Stripe. Address and order history are stored through the app API.
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore()
const userId = useCurrentUserId()

definePageMeta({ middleware: "auth" })

let stripe = null
let elements = null
let card = null
let clientSecret = null

const total = ref(0)
const currentAddress = ref(null)
const isProcessing = ref(false)
const isCardComplete = ref(false)
const paymentError = ref('')
const shippingError = ref('')

const formatPrice = (value) => (Number(value || 0) / 100).toFixed(2)

onMounted(async () => {
    if (userStore.checkout.length < 1) {
        return navigateTo('/shoppingcart')
    }

    total.value = userStore.checkout.reduce((sum, item) => sum + Number(item.price || 0), 0)

    if (userId.value) {
        try {
            currentAddress.value = await $fetch(`/api/prisma/get-address-by-user/${userId.value}`)
        } catch (error) {
            shippingError.value = error?.data?.message || error?.message || 'Check the database connection and try again.'
        }
    }

    await stripeInit()
})

const stripeInit = async () => {
    isProcessing.value = true
    paymentError.value = ''

    try {
        const runtimeConfig = useRuntimeConfig()

        if (!window.Stripe || !runtimeConfig.public.stripePk) {
            paymentError.value = 'Stripe is not configured for this environment.'
            return
        }

        stripe = window.Stripe(runtimeConfig.public.stripePk)

        const res = await $fetch('/api/stripe/paymentintent', {
            method: 'POST',
            body: {
                amount: total.value,
            }
        })

        if (!res?.client_secret) {
            paymentError.value = 'Stripe did not return a payment session. Check STRIPE_SK_KEY and try again.'
            return
        }

        clientSecret = res.client_secret
        elements = stripe.elements()

        card = elements.create("card", {
            hidePostalCode: true,
            style: {
                base: {
                    fontSize: "16px",
                    color: "#191919",
                },
                invalid: {
                    color: "#B91C1C",
                    iconColor: "#B91C1C"
                }
            }
        })

        card.mount("#card-element")
        card.on("change", (event) => {
            isCardComplete.value = event.complete
            paymentError.value = event.error ? event.error.message : ""
        })
    } catch (error) {
        paymentError.value = error?.data?.message || error?.message || 'Payment could not be prepared. Check Stripe settings and try again.'
    } finally {
        isProcessing.value = false
    }
}

const pay = async () => {
    if (!currentAddress.value) {
        paymentError.value = 'Please add shipping address'
        return
    }

    if (!userId.value) {
        return navigateTo('/auth')
    }

    if (!stripe || !card || !clientSecret) {
        paymentError.value = 'Payment form is still loading. Wait a moment and try again.'
        return
    }

    isProcessing.value = true
    paymentError.value = ''

    try {
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        })

        if (result.error) {
            paymentError.value = result.error.message
            isProcessing.value = false
            return
        }

        await createOrder(result.paymentIntent.id)
        userStore.cart = []
        userStore.checkout = []
        return navigateTo('/success')
    } catch (error) {
        paymentError.value = error?.data?.message || error?.message || 'Payment could not be completed. Please try again.'
        isProcessing.value = false
    }
}

const createOrder = async (stripeId) => {
    await $fetch('/api/prisma/create-order', {
        method: "POST",
        body: {
            userId: userId.value,
            stripeId,
            name: currentAddress.value.name,
            address: currentAddress.value.address,
            zipcode: currentAddress.value.zipcode,
            city: currentAddress.value.city,
            country: currentAddress.value.country,
            products: userStore.checkout
        }
    })
}
</script>
