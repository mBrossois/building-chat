// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/devtools',
        '@nuxtjs/supabase',
    ],
    devtools: {
        enabled: true
    },
    // supabase: {
    //     url: process.env.SUPABASE_URL,
    //     key: process.env.SUPABASE_KEY,
    // },
})
