<script setup lang="ts">
import VideoPlayer from "@/components/player/VideoPlayer.vue";
import { useMediaPath, useMediaQuery } from "@/composables/";
import {computed} from "vue";
import Page404 from "@/pages/[...path]/index.vue";
import type {VideoMediaEntry} from "@/types";
import {MainLayout} from "@/layouts";
import { useTitle } from "@vueuse/core";

const mediaQuery = useMediaQuery();
const mediaPath = useMediaPath();

const currentMedia = computed(() => {
  if (!mediaQuery.isSuccess) return undefined;
  return mediaQuery.data!
      .find(m => m.type === 'video' && m.path === mediaPath.value) as VideoMediaEntry ?? null;
});

useTitle(() => `Jarklin - Watch - ${currentMedia.value?.name}`);
</script>

<template>
  <MainLayout>
    <Page404 v-if="!currentMedia" />
    <VideoPlayer v-else :media="currentMedia" />
  </MainLayout>
</template>
