import type { Config } from 'tailwindcss'

export default {
  content: [
      "./index.html",
      "./src/**/*.tsx",
  ],
  theme: {
    extend: {
        colors: {
            'primary': {
                'DEFAULT': "#222831",
                'light': "#393E46",
            },
            'accent': {
                'DEFAULT': "#00ADB5",
                'light': "#00FFF5",
            }
        }
    },
  },
  plugins: [],
} satisfies Config
