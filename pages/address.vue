<template>
    <MainLayout>
        <main id="AddressPage" class="mx-auto mt-4 w-full max-w-[520px] px-3">
            <div class="ui-panel p-4">
                <h1 class="ui-title mb-3 text-xl">Address Details</h1>
                <ErrorNotice
                    v-if="pageError"
                    class="mb-3"
                    title="Address could not be loaded"
                    :message="pageError"
                    tone="warning"
                    icon="ph:map-pin"
                />
                <form @submit.prevent="submit()">
                    <TextInput
                        class="w-full"
                        placeholder="Contact Name"
                        v-model:input="contactName"
                        inputType="text"
                        :error="error && error.type == 'contactName' ? error.message : ''"
                    />

                    <TextInput
                        class="mt-2 w-full"
                        placeholder="Address"
                        v-model:input="address"
                        inputType="text"
                        :error="error && error.type == 'address' ? error.message : ''"
                    />

                    <TextInput
                        class="mt-2 w-full"
                        placeholder="Zip Code"
                        v-model:input="zipCode"
                        inputType="text"
                        :error="error && error.type == 'zipCode' ? error.message : ''"
                    />

                    <TextInput
                        class="mt-2 w-full"
                        placeholder="City"
                        v-model:input="city"
                        inputType="text"
                        :error="error && error.type == 'city' ? error.message : ''"
                    />

                    <TextInput
                        class="mt-2 w-full"
                        placeholder="Country"
                        v-model:input="country"
                        inputType="text"
                        :error="error && error.type == 'country' ? error.message : ''"
                    />

                    <button
                        :disabled="isWorking"
                        type="submit"
                        class="ui-button mt-6 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-market-orange to-market-red p-2 text-[20px] font-semibold text-white"
                    >
                        <span v-if="!isWorking" class="ui-span">Update Address</span>
                        <Icon
                            v-else
                            name="eos-icons:loading"
                            size="25"
                            class="mr-2"
                        />
                    </button>
                </form>

                <ErrorNotice
                    v-if="submitError"
                    class="mt-3"
                    title="Address could not be saved"
                    :message="submitError"
                    tone="warning"
                    icon="ph:warning-circle"
                />
            </div>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';

definePageMeta({ middleware: "auth" })

const userId = useCurrentUserId()

let contactName = ref('')
let address = ref('')
let zipCode = ref('')
let city = ref('')
let country = ref('')

let currentAddress = ref(null)
let isUpdate = ref(false)
let isWorking = ref(false)
let error = ref(null)
let pageError = ref('')
let submitError = ref('')

onMounted(async () => {
    if (!userId.value) {
        return navigateTo('/auth')
    }

    try {
        currentAddress.value = await $fetch(`/api/prisma/get-address-by-user/${userId.value}`)
    } catch (error) {
        pageError.value = error?.data?.message || error?.message || 'Existing address data is unavailable. You can still submit a new address.'
        return
    }

    if (currentAddress.value) {
        contactName.value = currentAddress.value.name
        address.value = currentAddress.value.address
        zipCode.value = currentAddress.value.zipcode
        city.value = currentAddress.value.city
        country.value = currentAddress.value.country
        isUpdate.value = true
    }
})

const validate = () => {
    error.value = null

    if (!contactName.value) {
        error.value = { type: 'contactName', message: 'A contact name is required' }
    } else if (!address.value) {
        error.value = { type: 'address', message: 'An address is required' }
    } else if (!zipCode.value) {
        error.value = { type: 'zipCode', message: 'A zip code is required' }
    } else if (!city.value) {
        error.value = { type: 'city', message: 'A city is required' }
    } else if (!country.value) {
        error.value = { type: 'country', message: 'A country is required' }
    }

    return !error.value
}

const submit = async () => {
    isWorking.value = true
    submitError.value = ''

    if (!validate()) {
        isWorking.value = false
        return
    }

    const payload = {
        userId: userId.value,
        name: contactName.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        country: country.value,
    }

    try {
        if (isUpdate.value) {
            await $fetch(`/api/prisma/update-address/${currentAddress.value.id}`, {
                method: 'PATCH',
                body: payload
            })
        } else {
            await $fetch('/api/prisma/add-address/', {
                method: 'POST',
                body: payload
            })
        }
    } catch (error) {
        submitError.value = error?.data?.message || error?.message || 'The address API did not accept the request. Check the database connection and try again.'
        isWorking.value = false
        return
    }

    isWorking.value = false
    return navigateTo('/checkout')
}
</script>
