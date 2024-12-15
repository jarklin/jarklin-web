<script setup lang="ts">
import { onErrorCaptured, ref, watch } from "vue";
import {AxiosError, HttpStatusCode} from "axios";
import {useRouter} from "vue-router";

const router = useRouter();

const errorRef = ref<Error | null>(null);

onErrorCaptured((err) => {
  if (err instanceof AxiosError && err.status === HttpStatusCode.Unauthorized && router.currentRoute.value.name !== '/auth/login/') {
    router.push({ name: '/auth/login/', query: { redirect: router.currentRoute.value.fullPath } });
    return false;
  }
  console.error(err);
  errorRef.value = err;
  return false;
});

watch(router.currentRoute, () => {
  errorRef.value = null;
});
</script>

<template>
  <slot name="fallback" v-if="errorRef" :error="errorRef" :resetBoundary="() => { errorRef = null }" />
  <slot v-else />
</template>
