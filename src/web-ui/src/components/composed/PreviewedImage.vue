<script setup lang="ts">
import {type HTMLAttributes, ref} from "vue";
import {LucideServerCrash} from "lucide-vue-next";
import {cn, getPreviewImage, getSource} from "@/lib";
import type {GalleryMediaEntry} from "@/types";

const {class: classes, media, image} = defineProps<{
  class?: HTMLAttributes['class']
  media: GalleryMediaEntry
  image: GalleryMediaEntry['meta']['images'][number]
}>();

const aspectRatio = `${image.width} / ${image.height}`;

const failed = ref(false);
const lowResLoaded = ref(false);
const highResLoaded = ref(false);

const lowResSrc = getPreviewImage(media.path, media.meta.images.findIndex(e => e.filename === image.filename) + 1);
const highResSrc = getSource(media.path, image.filename);
</script>

<template>
  <div v-if="failed" :class="cn('grid place-content-center', classes)" :style="{ aspectRatio }">
    <LucideServerCrash />
  </div>
  <template v-else>
    <img
        :class="cn(highResLoaded ? '' : 'blur-sm', classes)"
        :src="highResLoaded ? highResSrc : lowResSrc"
        :alt="image.filename"
        :width="image.width" :height="image.height"
        :style="{ aspectRatio }"
        @load="() => {
          lowResLoaded = true;
        }"
        @error="() => {
          failed = true;
        }"
    />
    <img
        v-if="lowResLoaded && !highResLoaded"
        class="hidden"
        :src="highResSrc"
        alt="hidden-download"
        @load="() => {
          highResLoaded = true;
        }"
        @error="() => {
          failed = true;
        }"
    />
  </template>
</template>
