<script setup lang="ts">
import {useMediaQuery} from "@/composables";
import {useMediaPath} from "@/composables/useMediaPath";
import {computed} from "vue";
import Page404 from "@/views/404.vue";
import {getAnimatedPreview, getPreviewImage, height2resolution} from "@/lib";
import {VerticalScroll} from "@/components/composed/container";
import humanizeDuration from "humanize-duration";
import humanize from "humanize-plus";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Spinner} from "@/components/ui/spinner";
import {Image} from "@/components/ui/image";

const mediaQuery = useMediaQuery();
const mediaPath = useMediaPath();

const currentMedia = computed(() => {
  if (!mediaQuery.isSuccess) return undefined;
  return mediaQuery.data!
      .find(m => m.path === mediaPath.value) ?? null;
});
</script>

<template>
  <Spinner v-if="currentMedia === undefined" />
  <Page404 v-else-if="currentMedia === null" />
  <template v-else>
    <div class="relative min-h-[85vh] px-[5vw] py-[5vh]">
      <div class="absolute inset-0 bg-accent">
        <img class="size-full object-cover" :src="getAnimatedPreview(currentMedia.path)" alt="animated preview" />
      </div>
      <div class="min-h-[75vh] bg-background/50 rounded-lg shadow-2xl backdrop-blur-sm border border-border flex flex-col md:flex-row">
        <div class="grid place-content-center p-4">
          <Image class="h-full mx-auto object-contain border-2 border-border max-h-[40vh]" :src="getPreviewImage(currentMedia.path)" alt="preview" />
        </div>
        <div class="p-4">
          <h1 class="text-2xl">{{ currentMedia.name }}</h1>
          <div class="grid grid-cols-kv [&>label]:font-bold gap-x-2">
            <label>Path</label>
            <span>{{ currentMedia.path }}</span>
            <template v-if="currentMedia.type === 'video'">
              <label>Duration</label>
              <span>
                {{ humanizeDuration(currentMedia.meta.duration*1000, { largest: 2, round: true }) }}
              </span>
              <label>Dimensions</label>
              <span>
                {{ currentMedia.meta.width }}x{{ currentMedia.meta.height }}
              </span>
              <label>Resolution</label>
              <span>
                <Badge variant="secondary">{{ height2resolution(Math.min(currentMedia.meta.width, currentMedia.meta.height)) }}</Badge>
              </span>
              <label>Filesize</label>
              <span>
                {{ humanize.fileSize(currentMedia.meta.filesize) }}
              </span>
              <label>Filetype</label>
              <span>
                <Badge variant="secondary">{{ currentMedia.ext }}</Badge>
              </span>
              <label>Tags</label>
              <span>-X-</span>
            </template>
            <template v-else-if="currentMedia.type === 'gallery'">
              <label>Images</label>
              <span>
                {{ currentMedia.meta.images.length }}
              </span>
              <label>Total Size</label>
              <span>
                {{ humanize.fileSize(currentMedia.meta.images.reduce((size, img) => size + img.filesize, 0)) }}
              </span>
              <label>Avg Size</label>
              <span>
                {{ humanize.fileSize(currentMedia.meta.images.reduce((size, img) => size + img.filesize, 0) / currentMedia.meta.images.length) }}
              </span>
              <label>Filetypes</label>
              <span class="flex gap-x-2">
                <Badge v-for="ext in new Set(currentMedia.meta.images.map(img => img.ext))" :key="ext" variant="secondary">{{ ext }}</Badge>
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <Separator class="my-2" :label="currentMedia.type === 'video' ? (currentMedia.meta.chapters.length ? 'Chapters' : 'Scenes') : 'Images'" />
    <VerticalScroll class="p-2">
      <Image v-for="i in currentMedia.meta.n_previews" :key="i" :src="getPreviewImage(currentMedia.path, i)" :alt="`preview of #${i}`" class="h-60 md:h-80 rounded-md border-2 border-border" />
    </VerticalScroll>
  </template>
</template>
