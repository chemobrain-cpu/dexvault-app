import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/', // 👈 Set this to '/' if deploying at root, or '/your-subfolder/' if under a subpath
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons8-wallet-32.png'],
      manifest: {
        name: 'dexvault',
        short_name: 'dexvault',
        start_url: '/',
        display: 'standalone',
        background_color: '#4F46E5',
        theme_color: '#000000',
        icons: [
          {
            src: 'icons8-wallet-32.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons8-wallet-32.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})

