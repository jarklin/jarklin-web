/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

type Pretty<T> = {
    [K in keyof T]: T[K]
} & {}

type KeyOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never
}[keyof T]
