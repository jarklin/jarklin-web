<script setup lang="ts">

import type { HTMLAttributes } from "vue";
import { cn } from "@/lib";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div :class="cn('grid grid-cols-kv [&>label]:font-bold gap-x-2 gap-y-0.5', props.class)">
    <slot />
  </div>
</template>
