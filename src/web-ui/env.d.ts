/// <reference types="vite/client" />

/**
 * clean combined types for better readability
 */
type Clean<T> = {
    [K in keyof T]: T[K]
}
