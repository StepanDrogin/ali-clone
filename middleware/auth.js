export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    if (!user.value && ['/checkout', '/orders', '/address'].includes(to.path)) {
        return navigateTo('/auth')
    }
})
