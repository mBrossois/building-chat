// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/devtools',
        '@nuxtjs/supabase',
        'nuxt-icon',
        '@pinia/nuxt',
    ],
    devtools: {
        enabled: true,
    },
    pinia: {
        // Auto imports 'defineStore' from 'pinia' in every file`
        autoImports: [
            'defineStore',
        ]
    },
    runtimeConfig: {
        public: {
            SITE_URL: process.env.SITE_URL,
        }
    },
    css: [
        '~/assets/css/global.css'
    ]
})