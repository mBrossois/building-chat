<script setup lang="ts">

let email = ''

const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const config = useRuntimeConfig()

// Login method using providers
async function signInDefault(provider: 'github' | 'google') {
  const { error } = await client.auth.signInWithOAuth({ provider,
  options: {
    redirectTo: config.SITE_URL ? config.SITE_URL : 'http://localhost:3000'
  } })
  if (error) {
    return alert('Something went wrong !')
  }

  navigateTo('/')
}

async function signInWithEmail() {
  const { data, error } = await client.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: config.SITE_URL ? config.SITE_URL : 'http://localhost:3000',
    },
  })
  if (error) {
    return alert('Something went wrong !')
  }

  email = ''
}

watch(user, () => {
  if (user.value) {
    navigateTo('/')
  }
})

</script>

<template>
  <input type="text" v-model="email" placeholder="Email">
  <button @click="signInWithEmail()" class="inline-flex min-w-32 justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">Login with email</button>
  <button @click="signInDefault('github')" class="inline-flex min-w-32 justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">Login with GitHub</button>
</template>
