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
import TagBadge from "@/components/composed/TagBadge.vue";
import {MainLayout} from "@/layouts";
import { usePreferredReducedMotion } from "@vueuse/core";
import { getLinkInfo } from "@/views/media/details/getLinkInfo";
import { useCollections } from "@/composables/useCollections";
import { MediaCard } from "@/components/composed/mediacard";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { LucideLibraryBig } from "lucide-vue-next";

const preferredReducedMotion = usePreferredReducedMotion();

const mediaQuery = useMediaQuery();
const mediaPath = useMediaPath();

const collections = useCollections();

const currentMedia = computed(() => {
  if (!mediaQuery.isSuccess) return undefined;
  return mediaQuery.data!
      .find(m => m.path === mediaPath.value) ?? null;
});

const linkInfo = computed(() => currentMedia.value && getLinkInfo(currentMedia.value));

const collection = computed(
    () => currentMedia.value && collections.value.find(c => c.mediaList.includes(currentMedia.value!))
);
</script>

<template>
  <MainLayout>
    <Spinner v-if="currentMedia === undefined" />
    <Page404 v-else-if="currentMedia === null" />
    <template v-else>
      <div class="relative min-h-[85vh] px-[5vw] py-[5vh]">
        <div class="absolute inset-0 bg-accent">
          <img class="size-full object-cover" :src="(preferredReducedMotion === 'reduce' ? getPreviewImage : getAnimatedPreview)(currentMedia.path)" alt="animated preview" />
        </div>
        <div class="min-h-[75vh] bg-background/50 rounded-lg shadow-2xl backdrop-blur-sm border border-border flex flex-col md:flex-row">
          <div class="grid place-content-center p-4">
            <router-link :to="linkInfo!.consumeLink">
              <Image class="h-full mx-auto object-contain border-2 border-border rounded-md max-h-[40vh]" :src="getPreviewImage(currentMedia.path)" alt="preview" />
            </router-link>
          </div>
          <div class="p-4">
            <h1 class="text-2xl">{{ currentMedia.name }}</h1>
            <div class="h-4" />
            <div class="grid grid-cols-kv [&>label]:font-bold gap-y-0.5 gap-x-2">
              <label>Path</label>
              <span>{{ currentMedia.path }}</span>
              <label>Tags</label>
              <span class="flex flex-wrap gap-1">
                <TagBadge v-for="tag in currentMedia.tags" :key="tag" :tag="tag" />
              </span>
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
                  <Badge variant="secondary">
                    {{ height2resolution(Math.min(currentMedia.meta.width, currentMedia.meta.height)) }}
                  </Badge>
                </span>
                <label>Filesize</label>
                <span>
                  {{ humanize.fileSize(currentMedia.meta.filesize) }}
                </span>
                <label>Filetype</label>
                <span>
                  <Badge variant="secondary">{{ currentMedia.ext }}</Badge>
                </span>
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
                <span class="flex flex-wrap gap-1">
                  <Badge v-for="ext in new Set(currentMedia.meta.images.map(img => img.ext))" :key="ext" variant="secondary">{{ ext }}</Badge>
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <Separator class="my-2" :label="currentMedia.type === 'video' ? (currentMedia.meta.chapters.length ? 'Chapters' : 'Scenes') : 'Images'" />
      <VerticalScroll class="p-2">
        <template v-for="i in currentMedia.meta.n_previews" :key="i">
          <router-link :to="linkInfo!.previews[i-1]?.link ?? linkInfo!.consumeLink">
            <Image :src="getPreviewImage(currentMedia.path, i)" :alt="`preview of #${i}`" class="h-60 md:h-72 lg:h-80 rounded-md border-2 border-border" />
          </router-link>
        </template>
      </VerticalScroll>
      <template v-if="collection && collection.mediaList.length > 1">
        <Separator class="my-2" label="Related" />
        <SectionHeader :to="{ name: 'collection-details', params: { mediaPath: collection.path } }" class="px-2">
          <LucideLibraryBig />
          {{ collection.displayName }}
        </SectionHeader>
        <VerticalScroll class="p-2">
          <template v-for="relatedMedia in collection.mediaList" :key="relatedMedia.path">
            <router-link :to="{ name: 'media-details', params: { mediaPath: currentMedia.path } }">
              <MediaCard :media="relatedMedia" class="h-60 md:h-72 lg:h-80 rounded-md border-2 border-border" />
            </router-link>
          </template>
        </VerticalScroll>
      </template>
    </template>
  </MainLayout>
</template>
