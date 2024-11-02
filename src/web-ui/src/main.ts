import './assets/index.css'

import axios, {AxiosError, HttpStatusCode} from "axios";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "./";

const retryStatus: number[] = [
    HttpStatusCode.RequestTimeout,
    HttpStatusCode.TooEarly,
    HttpStatusCode.TooManyRequests,
    HttpStatusCode.ServiceUnavailable,
];
const maxFailureCount: number = 5;

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                retry: (failureCount, error) => {
                    if (error instanceof AxiosError) {
                        if (retryStatus.includes(error.status ?? 0)) {
                            return failureCount < maxFailureCount;
                        }
                    }
                    return false;  // don't retry
                },
                staleTime: 60,
            }
        }
    }
})
app.use(router)

app.mount('#app')
