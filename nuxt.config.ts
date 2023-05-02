// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/devtools',
        '@nuxtjs/supabase',
        'nuxt-icon',
        '@pinia/nuxt',
        'tablet-developer-tools',
        '@vite-pwa/nuxt'
        
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
    developerToolsTablet: {
        enabled: process.env.NODE_ENV === 'production' ? false : true
    },
    pwa: {
        registerWebManifestInRouteRules: true,
        strategies: 'injectManifest',
        srcDir: './service-worker',
        filename: 'sw.ts',
        injectManifest: {
            globPatterns: ['**/*.{ts,js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
            globIgnores: ['shiki/**', 'manifest**.webmanifest'],
        },
        devOptions: {
            enabled: true,
            type: 'module',
        },
    },
    runtimeConfig: {
        public: {
            SITE_URL: process.env.SITE_URL
        }
    },
    css: [
        '~/assets/css/global.css'
    ]
})