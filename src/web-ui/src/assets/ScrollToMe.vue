<script setup lang="ts">
import { templateRef } from "@vueuse/core";
import { watch } from "vue";

const props = defineProps<{
  if?: boolean
  behavior?: "smooth" | "instant"
}>();

const element = templateRef<HTMLDivElement>("element");

watch(() => element.value, () => {
  if (element.value && props.if) {
    element.value.scrollIntoView({ behavior: props.behavior });
  }
})
</script>

<template>
  <div v-if="props.if" ref="element" class="invisible" />
</template>
