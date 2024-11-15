<script setup lang="ts">
import {cn} from "@/lib";
import type {Component, HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
  imageSrc: string
  icon: Component
  name: string
  aspectRatio?: string
}>();
</script>

<template>
  <div :class="cn('size-full bg-accent rounded-md overflow-hidden relative isolate group', props.class)" :style="{ aspectRatio }">
    <img class="size-full object-cover group-hover:scale-105 transition-transform" loading="lazy" :src="props.imageSrc" alt="preview" />
    <component :is="props.icon" class="absolute top-1 left-1 drop-shadow-highlight" />
    <span class="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-75% from-black/50 drop-shadow-highlight line-clamp-3 font-bold break-words">
      {{ props.name }}
    </span>
  </div>
</template>
