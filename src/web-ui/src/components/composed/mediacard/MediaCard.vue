<script setup lang="ts">
import {LucideFilm, LucideImages} from "lucide-vue-next";
import {getPreviewImage} from "@/lib";
import {computed} from "vue";
import {getMediaSize} from "@/lib/info";
import type {MediaEntry} from "@/types";
import InternalCard from "@/components/composed/mediacard/_InternalCard.vue";

const type2icon: Record<MediaEntry["type"], any> = {
  "video": LucideFilm,
  "gallery": LucideImages,
}

const props = defineProps<{
  media: MediaEntry
}>();

const aspectRatio = computed(() => {
  const { width, height } = getMediaSize(props.media);
  return `${width} / ${height}`;
});
</script>

<template>
  <InternalCard
      :image-src="getPreviewImage(media.path)"
      :icon="type2icon[media.type]"
      :name="media.name"
      :aspect-ratio="aspectRatio"
  />
</template>
