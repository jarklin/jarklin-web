<script setup lang="ts">
import { onErrorCaptured, ref, watch } from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const errorRef = ref<Error | null>(null);

onErrorCaptured((err) => {
  console.error(err);
  errorRef.value = err;
  return false;
});

watch(router.currentRoute, () => {
  errorRef.value = null;
});

import.meta.hot?.on("vite:afterUpdate", () => {
  errorRef.value = null;
});
</script>

<template>
  <slot name="fallback" v-if="errorRef" :error="errorRef" :resetBoundary="() => { errorRef = null }" />
  <slot v-else />
</template>
