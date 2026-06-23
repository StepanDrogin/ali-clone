<template>
    <MainLayout>
        <main id="InfoPage" class="ui-page mt-4">
            <ErrorNotice
                v-if="!page"
                title="Page not found"
                message="This marketplace section is not available. Return to the catalog to continue shopping."
                tone="warning"
                icon="ph:compass"
                action-label="Back to catalog"
                action-to="/"
            />

            <template v-else>
                <section class="ui-panel overflow-hidden">
                    <div class="grid gap-4 p-5 md:grid-cols-[1fr_320px] md:p-6">
                        <div>
                            <span class="ui-span inline-flex rounded-full bg-[#FFF0F2] px-3 py-1 text-sm font-semibold text-market-red">
                                {{ page.eyebrow }}
                            </span>
                            <h1 class="ui-title mt-4 text-3xl md:text-4xl">{{ page.title }}</h1>
                            <p class="mt-3 max-w-2xl text-sm leading-6 text-market-muted md:text-base">
                                {{ page.description }}
                            </p>
                        </div>

                        <div class="grid gap-2 rounded-lg bg-market-canvas p-3">
                            <span class="ui-span text-xs font-semibold uppercase text-market-muted">Highlights</span>
                            <span
                                v-for="stat in page.stats"
                                :key="stat"
                                class="ui-span rounded-lg bg-white px-3 py-2 text-sm font-semibold text-market-ink"
                            >
                                {{ stat }}
                            </span>
                        </div>
                    </div>
                </section>

                <section class="mt-4 grid gap-4 md:grid-cols-3">
                    <article
                        v-for="section in page.sections"
                        :key="section.title"
                        class="ui-panel p-4"
                    >
                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF0F2] text-market-red">
                            <Icon name="ph:check-circle" size="23" />
                        </div>
                        <h2 class="ui-title text-lg">{{ section.title }}</h2>
                        <p class="mt-2 text-sm leading-6 text-market-muted">{{ section.text }}</p>
                    </article>
                </section>

                <section class="ui-panel mt-4 p-4">
                    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 class="ui-title text-xl">Continue shopping</h2>
                            <p class="mt-1 text-sm text-market-muted">Move back into the main customer flow without hitting a dead menu item.</p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <NuxtLink
                                to="/"
                                class="ui-button inline-flex rounded-full bg-market-red px-4 py-2 text-sm font-semibold text-white hover:bg-[#D92F43]"
                            >
                                <span class="ui-span">Catalog</span>
                            </NuxtLink>
                            <NuxtLink
                                to="/shoppingcart"
                                class="ui-button inline-flex rounded-full border border-market-line px-4 py-2 text-sm font-semibold hover:border-market-red hover:text-market-red"
                            >
                                <span class="ui-span">Cart</span>
                            </NuxtLink>
                        </div>
                    </div>
                </section>

                <section class="mt-4 grid gap-3 md:grid-cols-4">
                    <NuxtLink
                        v-for="link in relatedLinks"
                        :key="link.to"
                        :to="link.to"
                        class="ui-panel flex items-center gap-3 p-3 hover:border-market-red"
                    >
                        <Icon :name="link.icon" size="22" class="text-market-red" />
                        <span class="ui-span text-sm font-semibold text-market-ink">{{ link.label }}</span>
                    </NuxtLink>
                </section>
            </template>
        </main>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { categoryMenuLinks, infoPages, topMenuLinks } from '~/utils/navigation';

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const page = computed(() => infoPages[slug.value])
const allLinks = [...categoryMenuLinks, ...topMenuLinks]
const relatedLinks = computed(() => allLinks.filter((link) => link.to !== `/info/${slug.value}`).slice(0, 4))

useHead(() => ({
    title: page.value ? `${page.value.title} | Market Express` : 'Page not found | Market Express'
}))
</script>
