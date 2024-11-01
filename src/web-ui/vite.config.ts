import { fileURLToPath, URL } from 'node:url'

import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vite as vidstack } from "vidstack/plugins";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('media-'),
        }
      }
    }),
    vidstack({ include: /player\// }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
