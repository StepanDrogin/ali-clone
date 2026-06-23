export const useCurrentUserId = () => {
  const user = useSupabaseUser()

  return computed(() => user.value?.id || user.value?.sub || null)
}
