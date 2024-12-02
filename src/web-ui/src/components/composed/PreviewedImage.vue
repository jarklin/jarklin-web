<script setup lang="ts">
import { computed, type HTMLAttributes, ref } from "vue";
import {LucideServerCrash} from "lucide-vue-next";
import { cn, getPreviewImage, getSource, modifyUrl } from "@/lib";
import type {GalleryMediaEntry} from "@/types";
import { useNetwork, whenever } from "@vueuse/core";
import { useWebSettings } from "@/composables";

const {class: classes, media, image} = defineProps<{
  class?: HTMLAttributes['class']
  media: GalleryMediaEntry
  image: GalleryMediaEntry['meta']['images'][number]
}>();

const { isOnline } = useNetwork();
const optimizedMedia = useWebSettings("optimizedMedia");

const aspectRatio = computed(() => `${image.width} / ${image.height}`);

const failed = ref(false);
const lowResLoaded = ref(false);
const highResLoaded = ref(false);

const lowResSrc = computed(() => getPreviewImage(media.path, media.meta.images.findIndex(e => e.filename === image.filename) + 1));
let highResSrc = computed(() => {
  let src = getSource(media.path, image.filename);
  if (optimizedMedia.value)
    src = modifyUrl(src, { query: { optimized: "true" } }).toString();
  return src;
});

whenever(isOnline, () => {
  failed.value = false;
});
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
