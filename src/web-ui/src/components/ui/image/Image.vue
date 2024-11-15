<script setup lang="ts">
import type {ImgHTMLAttributes} from "vue";

const props = defineProps</* @vue-ignore */ImgHTMLAttributes>();

// https://lucide.dev/icons/x-circle
const defaultErrorSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-x-circle'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m15 9-6 6'/%3E%3Cpath d='m9 9 6 6'/%3E%3C/svg%3E";
</script>

<template>
  <img v-bind="props" @error="(e) => {
    const target: HTMLImageElement = e.target as HTMLImageElement;
    target.src = defaultErrorSrc;
    target.classList.add('object-scale-down');
  }" />
</template>
