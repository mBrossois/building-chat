export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  if (!user.value && !(to.path === '/login' || to.path === '/email-send') && process.env.NODE_ENV === "production") {
    return navigateTo('/login')
  }
})