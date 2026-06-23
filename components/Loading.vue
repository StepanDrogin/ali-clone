<template>
    <div
        class="fixed inset-0 z-40 flex h-screen min-h-screen w-screen items-center justify-center overflow-hidden bg-market-canvas/85 backdrop-blur-sm"
        aria-live="polite"
        role="status"
    >
        <div class="rounded-lg border border-market-line bg-white/80 p-5 shadow-market">
            <Icon name="eos-icons:bubble-loading" size="96" color="#FD374F"/>
            <span class="ui-span block pt-4 text-center text-base font-bold text-market-ink">Loading...</span>
        </div>
    </div>
</template>

<script setup>

</script>
