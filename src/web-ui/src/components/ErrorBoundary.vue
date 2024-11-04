<script setup lang="ts">
import {onErrorCaptured, ref} from "vue";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {LucideAlertCircle} from "lucide-vue-next";
import {AxiosError, HttpStatusCode} from "axios";
import router from "@/router";

const props = defineProps<{
  title?: string,
}>();

const errorRef = ref<Error | null>(null);

onErrorCaptured((err) => {
  if (err instanceof AxiosError && err.status === HttpStatusCode.Unauthorized) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    return false;
  }
  console.error(err);
  errorRef.value = err;
  return false;
});
</script>

<template>
  <div v-if="errorRef" class="h-full grid place-content-center p-4">
    <Alert variant="destructive">
      <LucideAlertCircle class="size-4" />
      <AlertTitle>{{ props.title ?? "Something went wrong" }}</AlertTitle>
      <AlertDescription>{{ errorRef.name }}: {{ errorRef.message }}</AlertDescription>
    </Alert>
  </div>
  <slot v-else />
</template>
