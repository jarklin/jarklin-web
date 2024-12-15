<script setup lang="ts">
import * as humanize from "humanize-plus";
import { Badge } from "@/components/ui/badge";
import type { GalleryMediaEntry } from "@/types";
import { useWebSettings } from "@/composables";

defineProps<{
  media: GalleryMediaEntry
}>();

const extendedMediaDetails = useWebSettings("extendedMediaDetails");
</script>

<template>
  <label>Images</label>
  <span>
    {{ media.meta.images.length }}
  </span>
  <label>Total Size</label>
  <span>
    {{ humanize.fileSize(media.meta.images.reduce((size, img) => size + img.filesize, 0)) }}
  </span>
  <template v-if="extendedMediaDetails">
    <label>Avg Size</label>
    <span>
      {{ humanize.fileSize(media.meta.images.reduce((size, img) => size + img.filesize, 0) / media.meta.images.length) }}
    </span>
  </template>
  <label>Filetypes</label>
  <span class="flex flex-wrap gap-1">
    <Badge v-for="ext in new Set(media.meta.images.map(img => img.ext))" :key="ext" variant="secondary">{{ ext }}</Badge>
  </span>
</template>
