<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const config = useRuntimeConfig()

// Login method using providers
async function login(provider: 'github' | 'google' | 'facebook') {
  const { error } = await client.auth.signInWithOAuth({ provider,
  options: {
    redirectTo: config.SITE_URL ? config.SITE_URL : 'http://localhost:3000'
  } })
  if (error) {
    return alert('Something went wrong !')
  }

  navigateTo('/')
}

watch(user, () => {
  if (user.value) {
    navigateTo('/')
  }
})

</script>

<template>
  <button @click="login('github')" class="inline-flex min-w-32 justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">Login with GitHub</button>
  <button @click="login('facebook')" class="inline-flex min-w-32 justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">Login with Facebook</button>
</template>
