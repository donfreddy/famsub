import type { NuxtConfig } from '@nuxt/schema'
import { resolve } from 'node:path'
import process from 'node:process'

const scope: string = '/'
const option = {
  appName: 'Famsub',
  appDescription: 'Famsub est une application de gestion de porte-feuille familial.',
}

export default defineNuxtConfig({
  // ✅ Modules
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/content',
    '@sentry/nuxt/module',
    '@vite-pwa/nuxt',
    'motion-v/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  // ✅ Nuxt Compatibility
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },

  srcDir: 'app/ui',

  // ✅ TypeScript et Devtools
  devtools: { enabled: true },
  // typescript: {typeCheck: true},

  // ✅ App Meta / SEO
  app: {
    head: {
      title: option.appName,
      titleTemplate: `%s - ${option.appName}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      ],
    },

  },

  // ✅ CSS global
  css: ['~/assets/css/main.css'],

  // ✅ Plugins
  plugins: ['~/plugins/vue-query.ts'],

  // ✅ Variables d'environnement
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_API_KEY,
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
      siteUrl: process.env.NUXT_SITE_URL,
      siteEnv: process.env.NUXT_SITE_ENV,
      posthogPublicKey: 'phc_p45h0113LlTu3Sw8YelPfqWj6NH10TQ4PEQXx3b6V87',
      posthogHost: 'https://eu.i.posthog.com',
    },
  },

  // ✅ Mode Sombre
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },

  // ✅ Nuxt Content
  content: {
    contentHead: false,
    highlight: {},
  },

  // ✅ Sentry
  sentry: {
    sourceMapsUploadOptions: {
      org: 'famsub-team',
      project: 'famsub-web',
    },
    autoInjectServerSentry: 'top-level-import',
  },

  eslint: {
    config: {
      stylistic: true,
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  // ✅ Config PWA
  pwa: {
    registerType: 'autoUpdate',
    scope,
    base: scope,
    manifest: {
      id: scope,
      scope,
      name: option.appName,
      short_name: option.appName,
      description: option.appDescription,
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'apple-touch-icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,txt,png,ico,svg}'],
      navigateFallbackDenylist: [/^\/api\//],
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    registerWebManifestInRouteRules: true,
    writePlugin: true,
    devOptions: {
      enabled: process.env.NUXT_VITE_PLUGIN_PWA === 'true',
      navigateFallback: scope,
    },
  },

  // ✅ Sourcemap (utile pour debugging sans exposer le code en prod)
  sourcemap: {
    client: 'hidden',
  },

  // ✅ Options Vite
  vite: {
    logLevel: 'info',
    server: {
      fs: {
        strict: false,
      },
    },
  },

  // ✅ Option expérimentale utile (améliore l’expérience dev parfois)
  experimental: {
    inlineSSRStyles: false,
  },

  // ✅ Alias pour importer plus proprement
  alias: {
    '@': resolve(__dirname),
  },
} as NuxtConfig)
