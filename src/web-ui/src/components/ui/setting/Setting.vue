<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div :class="cn('relative [&>button[role=checkbox]~*]:pl-8 [&>button[role=switch]~*]:pl-16 [&>button]:absolute [&>button]:left-2', props.class)" role="group">
    <slot />
  </div>
</template>
