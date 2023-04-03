export default defineNuxtRouteMiddleware(to => {  
  console.log('middleware/auth.ts')
  
  const user = useSupabaseUser()

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})