<script setup lang="ts">
import {onErrorCaptured, ref} from "vue";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {LucideAlertCircle} from "lucide-vue-next";

const props = defineProps<{
  title?: string,
}>();

const error = ref<Error | null>(null);

onErrorCaptured((e) => {
  console.error(e);
  error.value = e;
  return false;
});
</script>

<template>
  <div v-if="error" class="h-full grid place-content-center p-4">
    <Alert variant="destructive">
      <LucideAlertCircle class="size-4" />
      <AlertTitle>{{ props.title ?? "Something went wrong" }}</AlertTitle>
      <AlertDescription>{{ error.name }}: {{ error.message }}</AlertDescription>
    </Alert>
  </div>
  <slot v-else />
</template>
