import type { Config } from 'tailwindcss'
import * as tailwindContainerQueriesPlugin from '@tailwindcss/container-queries';
import vidstackCssPlugin from "@vidstack/react/tailwind.cjs";
import tailwindAnimatePlugin from "tailwindcss-animate";

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
            },
            'media-brand': 'rgb(var(--media-brand) / <alpha-value>)',
            'media-focus': 'rgb(var(--media-focus) / <alpha-value>)',
        },
        height: {
            "gallery": "16rem",
            "video": "12.5rem",
            "mixed": "14.5rem",
            "gallery-sm": "14rem",
            "video-sm": "10.5rem",
        },
        aspectRatio: {
            "portrait": "9 / 16",
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
        dropShadow: {
            "highlight": "0px 0px 2px rgb(0 0 0 / 0.5)"
        },
        gridTemplateColumns: {
            "kv": "auto, 1fr",
        },
    },
  },
  plugins: [
      tailwindContainerQueriesPlugin,
      tailwindAnimatePlugin,
      vidstackCssPlugin({
          prefix: 'media',
      }),
      customVariants,
  ],
} satisfies Config


function customVariants({ addVariant, matchVariant }) {
    // Strict version of `.group` to help with nesting.
    matchVariant('parent-data', (value) => `.parent[data-${value}] > &`);

    addVariant('hocus', ['&:hover', '&:focus-visible']);
    addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &']);
}
