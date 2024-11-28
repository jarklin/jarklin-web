<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div :class="cn('relative [&>button~*]:pl-8 [&>button]:absolute [&>button]:left-2', props.class)" role="group">
    <slot />
  </div>
</template>
