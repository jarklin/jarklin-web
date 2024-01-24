import type { Config } from 'tailwindcss'
import * as tailwindContainerQueriesPlugin from '@tailwindcss/container-queries';

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
        },
        aspectRatio: {
            "vertical": "9 / 16",
        },
        animation: {
            "anything-is-loading": "marginLeftN100to100 1s linear infinite",
        },
        keyframes: {
            marginLeftN100to100: {
                "0%": {
                    marginLeft: "-100%",
                },
                "100%": {
                    marginLeft: "100%",
                },
            },
        },
    },
  },
  plugins: [
      tailwindContainerQueriesPlugin,
  ],
} satisfies Config

