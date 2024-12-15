<script setup lang="ts">
import * as humanize from "humanize-plus";
import { Badge } from "@/components/ui/badge";
import type { GalleryMediaEntry } from "@/types";
import { useWebSettings } from "@/composables";
import { type LucideIcon, LucideRectangleHorizontal, LucideRectangleVertical, LucideSquare } from "lucide-vue-next";
import { computed } from "vue";
import { findClosestEntry } from "@/lib";

const { media } = defineProps<{
  media: GalleryMediaEntry
}>();

const extendedMediaDetails = useWebSettings("extendedMediaDetails");

const aspect2IconMap: Record<number, [LucideIcon, string]> = {
  [9/16]: [LucideRectangleVertical, "portrait"],
  [1]: [LucideSquare, "squared"],
  [16/9]: [LucideRectangleHorizontal, "landscape"],
};

const aspectIcons = computed(() => (
    Array
        .from(new Set(
            media.meta.images
                .map(image => image.width / image.height)  // calculate aspect-ratio's
                .map(ratio => findClosestEntry(aspect2IconMap, ratio)),
        ))
));
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
    <template v-for="ext in new Set(media.meta.images.map(img => img.ext))" :key="ext">
      <Badge variant="secondary">{{ ext }}</Badge>
    </template>
  </span>
  <template v-if="extendedMediaDetails">
    <label>Aspects</label>
    <span>
      <template v-for="[icon, label] in aspectIcons">
        <component class="size-6" :is="icon" :title="label" />
      </template>
    </span>
  </template>
</template>
