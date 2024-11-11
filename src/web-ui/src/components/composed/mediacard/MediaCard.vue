<script setup lang="ts">
import type {MediaEntry} from "@/composables";
import {LucideFilm, LucideImages} from "lucide-vue-next";
import {cn, getPreviewImage} from "@/lib";
import {computed, type HTMLAttributes} from "vue";
import {getMediaSize} from "@/lib/info";

const type2icon: Record<MediaEntry["type"], any> = {
  "video": LucideFilm,
  "gallery": LucideImages,
}

const props = defineProps<{
  class?: HTMLAttributes['class']
  media: MediaEntry
}>();

const aspectRatio = computed(() => {
  const { width, height } = getMediaSize(props.media);
  return width / height;
});
</script>

<template>
  <div :class="cn('size-full bg-accent rounded-md overflow-hidden relative isolate group', props.class)" :style="{ aspectRatio }">
    <img class="size-full object-cover group-hover:scale-105 transition-transform" loading="lazy" :src="getPreviewImage(media.path)" alt="preview" />
    <component :is="type2icon[media.type]" class="absolute top-1 left-1 drop-shadow-highlight" />
    <span class="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-75% from-black/50 drop-shadow-highlight line-clamp-3 font-bold break-words">
      {{ media.name }}
    </span>
  </div>
</template>
