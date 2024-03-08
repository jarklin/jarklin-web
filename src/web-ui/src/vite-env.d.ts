// / <reference types="vite/client" />

type DebugClean<T> = {
    [K in keyof T]: T[K]
}
