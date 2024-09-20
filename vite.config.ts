import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      manifest: {
        name: 'Smoothie !',
        short_name: 'Smoothie',
        description: 'A simple smoothie recipe app',
        theme_color: '#ffffff',

        icons: [
          {
            src: './public/logos/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: './public/logos/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './public/logos/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: './public/logos/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './public/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,json,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
