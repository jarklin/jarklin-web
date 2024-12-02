<script setup lang="ts">
import { useMediaPath, useMediaQuery } from "@/composables";
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import Page404 from "@/views/404.vue";
import ScrollProgress from "@/components/ScrollProgress.vue";
import PreviewedImage from "@/components/composed/PreviewedImage.vue";
import {LucideCircleArrowUp, LucideExpand, LucideShrink, LucideSquareArrowLeft} from "lucide-vue-next";
import {useFullscreen} from "@vueuse/core";
import {useRouter} from "vue-router";
import {cn} from "@/lib";
import type {GalleryMediaEntry} from "@/types";
import {MainLayout} from "@/layouts";
import ScrollToMe from "@/assets/ScrollToMe.vue";

const mediaQuery = useMediaQuery();
const mediaPath = useMediaPath();

const currentMedia = computed(() => {
  if (!mediaQuery.isSuccess) return undefined;
  return mediaQuery.data!
      .find(m => m.type === 'gallery' && m.path === mediaPath.value) as GalleryMediaEntry ?? null;
});

const fullscreen = reactive(useFullscreen());
const router = useRouter();

onMounted(() => {
  try {
    fullscreen.enter();
  } catch (error) {}
});
onUnmounted(() => {
  if (fullscreen.isFullscreen) fullscreen.exit();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const showMenu = ref(false);
</script>

<template>
  <MainLayout>
    <Page404 v-if="!currentMedia" />
    <template v-else>
      <ScrollProgress />
      <div v-touch:tap="() => { showMenu = !showMenu }">
        <template v-for="image in currentMedia.meta.images" :key="image.filename">
          <ScrollToMe :if="router.currentRoute.value.hash === `#${image.filename}`" />
          <PreviewedImage :media="currentMedia" :image="image" class="w-full max-w-screen-lg mx-auto" />
        </template>
      </div>
      <div :class="cn('sticky bg-accent -bottom-full transition-[bottom]', showMenu ? '-bottom-0 inset-x-0' : '')">
        <div class="max-w-screen-lg mx-auto p-1 flex gap-x-2 items-stretch content-baseline">
          <button @click="router.back" title="Go back to the last page">
            <LucideSquareArrowLeft class="size-8" />
          </button>
          <div class="grow" />
          <button v-if="fullscreen.isSupported" @click="fullscreen.toggle" title="Toggle Fullscreen">
            <component :is="fullscreen.isFullscreen ? LucideShrink : LucideExpand" class="size-8" />
          </button>
          <button @click="scrollToTop" title="Scroll to top">
            <LucideCircleArrowUp class="size-8" />
          </button>
        </div>
      </div>
    </template>
  </MainLayout>
</template>
