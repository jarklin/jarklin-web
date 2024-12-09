/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

type Pretty<T> = {
    [K in keyof T]: T[K]
} & {}
