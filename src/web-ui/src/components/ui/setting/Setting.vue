<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div
      :class="cn(
          'relative',
          '[&>div[role=group]]:absolute [&>div[role=group]]:left-1.5 [&>div[role=group]~*]:pl-16 ' +
          '[&>button[role=switch]~*]:pl-16 [&>button[role=switch]]:absolute [&>button[role=switch]]:left-2 ' +
          '[&>button[role=checkbox]~*]:pl-16 [&>button[role=checkbox]]:absolute [&>button[role=checkbox]]:left-4',
          props.class,
          )"
      role="group"
  >
    <slot />
  </div>
</template>
