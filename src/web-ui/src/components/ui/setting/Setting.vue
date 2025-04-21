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
          '[&>button[role=button]~*]:pl-16 [&>button[role=button]]:absolute [&>button[role=button]]:left-8 [&>button[role=button]]:-translate-x-1/2 ' +
          '[&>div[role=group]~*]:pl-16 [&>div[role=group]]:absolute [&>div[role=group]]:left-8  [&>div[role=group]]:-translate-x-1/2 ' +
          '[&>button[role=switch]~*]:pl-16 [&>button[role=switch]]:absolute [&>button[role=switch]]:left-8 [&>button[role=switch]]:-translate-x-1/2 ' +
          '[&>button[role=checkbox]~*]:pl-16 [&>button[role=checkbox]]:absolute [&>button[role=checkbox]]:left-8 [&>button[role=checkbox]]:-translate-x-1/2',
          props.class,
          )"
      role="group"
  >
    <slot />
  </div>
</template>
