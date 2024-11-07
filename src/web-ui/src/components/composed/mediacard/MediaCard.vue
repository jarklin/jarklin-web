<script setup lang="ts">
import type {MediaEntry} from "@/composables";
import {LucideFilm, LucideImages} from "lucide-vue-next";
import {cn, getPreviewImage} from "@/lib";
import type {HTMLAttributes} from "vue";

const type2icon: Record<MediaEntry["type"], any> = {
  "video": LucideFilm,
  "gallery": LucideImages,
}

const props = defineProps<{
  media: MediaEntry,
  class?: HTMLAttributes['class'],
}>();
const { media } = props;
</script>

<template>
  <div :class="cn('bg-accent rounded-md overflow-hidden relative isolate group', props.class)">
    <img class="size-full object-cover group-hover:scale-105 transition-transform" loading="lazy" :src="getPreviewImage(media.path)" alt="preview" />
    <component :is="type2icon[media.type]" class="absolute top-1 left-1 drop-shadow-highlight" />
    <span class="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-75% from-black/50 drop-shadow-highlight line-clamp-3 font-bold">{{ media.name }}</span>
  </div>
</template>
