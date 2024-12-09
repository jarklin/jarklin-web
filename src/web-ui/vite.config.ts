import { fileURLToPath, URL } from 'node:url'
import * as p from "node:path";

import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vite as vidstack } from "vidstack/plugins";
import VueRouter from 'unplugin-vue-router/vite'

const asyncRoutes: string[] = [
    "/auth",
    "/media/consume",
    "/media/explorer",
    "/media/search",
]

// https://vite.dev/config/
export default defineConfig({
  base: "",  // make build relative
  server: {
    proxy: {
      '/files/': 'http://localhost:5000',
      '/auth/': 'http://localhost:5000',
      '/api/': 'http://localhost:5000',
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    }
  },
  plugins: [
    VueRouter({
      // importMode: "async",
      importMode: (path) => {
        const urlPath = `/${p.relative(p.join(__dirname, "src/pages"), path)}`
        if (asyncRoutes.some(asyncRoute => urlPath.startsWith(asyncRoute))) {
          return "async";
        } else {
          return "sync";
        }
      },
      exclude: [
          "**/_*.vue",
      ],
    }),
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
