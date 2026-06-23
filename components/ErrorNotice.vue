<template>
    <article
        class="ui-panel overflow-hidden p-4"
        :class="toneClass"
        role="alert"
    >
        <div class="flex gap-3">
            <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                :class="iconClass"
            >
                <Icon :name="icon" size="22" />
            </div>

            <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                    <h2 class="ui-title text-lg">{{ title }}</h2>
                    <button
                        v-if="dismissible"
                        class="ui-button rounded-lg p-1 text-market-muted hover:bg-market-canvas hover:text-market-ink"
                        aria-label="Dismiss message"
                        @click="$emit('dismiss')"
                    >
                        <Icon name="mdi:close" size="20" />
                    </button>
                </div>

                <p class="mt-1 text-sm leading-6 text-market-muted">{{ message }}</p>

                <div v-if="actionTo || $slots.default" class="mt-3">
                    <slot />
                    <NuxtLink
                        v-if="actionTo && actionLabel"
                        :to="actionTo"
                        class="ui-button inline-flex items-center justify-center rounded-full bg-market-red px-4 py-2 text-sm font-semibold text-white hover:bg-[#D92F43]"
                    >
                        <span class="ui-span">{{ actionLabel }}</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    tone: {
        type: String,
        default: 'error'
    },
    icon: {
        type: String,
        default: 'ph:warning-circle'
    },
    actionLabel: {
        type: String,
        default: ''
    },
    actionTo: {
        type: String,
        default: ''
    },
    dismissible: {
        type: Boolean,
        default: false
    }
})

defineEmits(['dismiss'])

const toneClass = computed(() => {
    if (props.tone === 'warning') {
        return 'border-[#F7D27A] bg-[#FFFBEB]'
    }

    if (props.tone === 'success') {
        return 'border-[#A7F3D0] bg-[#ECFDF5]'
    }

    return 'border-[#FFD7DC] bg-[#FFF7F8]'
})

const iconClass = computed(() => {
    if (props.tone === 'warning') {
        return 'bg-[#FFF5CC] text-[#8A5B00]'
    }

    if (props.tone === 'success') {
        return 'bg-[#D1FAE5] text-market-green'
    }

    return 'bg-[#FFF0F2] text-market-red'
})
</script>
