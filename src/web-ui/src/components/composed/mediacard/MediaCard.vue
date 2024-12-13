<script setup lang="ts">
import {LucideFilm, LucideImages} from "lucide-vue-next";
import { aspectRatioFromSize, getMediaSize, getPreviewImage } from "@/lib";
import type {MediaEntry} from "@/types";
import InternalCard from "@/components/composed/mediacard/_InternalCard.vue";

const type2icon: Record<MediaEntry["type"], any> = {
  "video": LucideFilm,
  "gallery": LucideImages,
}

const props = defineProps<{
  media: MediaEntry
}>();
</script>

<template>
  <InternalCard
      :image-src="getPreviewImage(media.path)"
      :icon="type2icon[media.type]"
      :name="media.name"
      :aspect-ratio="aspectRatioFromSize(getMediaSize(props.media))"
  />
</template>
