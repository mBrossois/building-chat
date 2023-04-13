export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  if (!user.value && !(to.path === '/login' || to.path === '/email-send')) {
    // return navigateTo('/login')
    return
  }
})