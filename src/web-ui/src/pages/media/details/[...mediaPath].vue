<script setup lang="ts">
import {useMediaQuery, useMediaPath, useCollections} from "@/composables";
import {computed} from "vue";
import Page404 from "@/pages/[...path]/index.vue";
import {getAnimatedPreview, getPreviewImage} from "@/lib";
import {HorizontalScroll} from "@/components/composed/container";
import {Separator} from "@/components/ui/separator";
import {Spinner} from "@/components/ui/spinner";
import {Image} from "@/components/ui/image";
import TagBadge from "@/components/composed/TagBadge.vue";
import {MainLayout} from "@/layouts";
import { usePreferredReducedMotion, useTitle } from "@vueuse/core";
import { getLinkInfo } from "@/pages/media/details/getLinkInfo";
import { MediaCard } from "@/components/composed/mediacard";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { LucideLibraryBig } from "lucide-vue-next";
import KvGrid from "@/components/composed/KvGrid.vue";
import GalleryDetails from "./_GalleryDetails.vue";
import VideoDetails from "./_VideoDetails.vue";

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

useTitle(() => `Jarklin - Media Details - ${currentMedia.value?.name}`);
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
            <KvGrid>
              <label>Path</label>
              <span>{{ currentMedia.path }}</span>
              <label>Tags</label>
              <span class="flex flex-wrap gap-1">
                <TagBadge v-for="tag in currentMedia.tags" :key="tag" :tag="tag" />
              </span>
              <VideoDetails v-if="currentMedia.type === 'video'" :media="currentMedia" />
              <GalleryDetails v-if="currentMedia.type === 'gallery'" :media="currentMedia" />
            </KvGrid>
          </div>
        </div>
      </div>
      <Separator class="my-2" :label="currentMedia.type === 'video' ? (currentMedia.meta.chapters.length ? 'Chapters' : 'Scenes') : 'Images'" />
      <HorizontalScroll class="p-2">
        <template v-for="i in currentMedia.meta.n_previews" :key="i">
          <router-link :to="linkInfo!.previews[i-1]?.link ?? linkInfo!.consumeLink">
            <Image :src="getPreviewImage(currentMedia.path, i)" :alt="`preview of #${i}`" class="h-60 md:h-72 lg:h-80 rounded-md border-2 border-border" />
          </router-link>
        </template>
      </HorizontalScroll>
      <template v-if="collection && collection.mediaList.length > 1">
        <Separator class="my-2" label="Related" />
        <SectionHeader :to="{ name: '/media/collection/[...mediaPath]', params: { mediaPath: collection.path } }" class="px-2">
          <LucideLibraryBig />
          {{ collection.displayName }}
        </SectionHeader>
        <HorizontalScroll class="p-2">
          <template v-for="relatedMedia in collection.mediaList" :key="relatedMedia.path">
            <router-link :to="{ name: '/media/details/[...mediaPath]', params: { mediaPath: currentMedia.path } }">
              <MediaCard :media="relatedMedia" class="h-60 md:h-72 lg:h-80 rounded-md border-2 border-border" />
            </router-link>
          </template>
        </HorizontalScroll>
      </template>
    </template>
  </MainLayout>
</template>
