// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  compatibilityDate: "2024-07-03",
  css: ['~/assets/styles/main.scss', '@mdi/font/css/materialdesignicons.css', '~/plugins/vue3-toastify.ts'],
  build: {
    transpile: ['vuetify']
  },
  buildModules: ['@nuxt/typescript-build'],
  app: {
    head: {
      title: 'Cinema',
      meta: [
        {
          name: 'description', content: 'Everything about next'
        }
      ],
    }
  },
  plugins: ['~/plugins/vuetify'],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs'
    ]
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/styles/variables.scss";`
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './')
      }
    },
  },
  vue: {
    config: {
      devtools: true,
      productionTip: false,
      performance: true,
    },
  },
  runtimeConfig: {
    public: {
      apiDomain: process.env.NUXT_PUBLIC_API_DOMAIN
    }    
  }
})