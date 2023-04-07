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
  navigateTo('/email-send')
}

watch(user, () => {
  if (user.value) {
    navigateTo('/')
  }
})

</script>

<template>
  <div class="flex flex-col items-center pt-16">
    <div>
      <Icon name="ic:outline-email" class="h-9 w-9 absolute ml-2 mt-0.5"></Icon>
      <input type="text" v-model="email" placeholder="Fill your e-mail adress in" class="w-80 h-11 bg-background-color text-black indent-14 placeholder:text-black border-b" >
    </div>
    <DefaultButton label="Continue" @click="signInWithEmail()"></DefaultButton>
    <p>or</p>
    <DefaultButton label="Continue with GitHub" @click="signInDefault('github')"></DefaultButton>
  </div>
</template>
