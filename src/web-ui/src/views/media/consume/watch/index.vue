<script setup lang="ts">
import VideoPlayer from "@/components/player/VideoPlayer.vue";
import { useMediaPath, useMediaQuery } from "@/composables/";
import {computed} from "vue";
import Page404 from "@/views/404.vue";
import type {VideoMediaEntry} from "@/types";
import {MainLayout} from "@/layouts";

const mediaQuery = useMediaQuery();
const mediaPath = useMediaPath();

const currentMedia = computed(() => {
  if (!mediaQuery.isSuccess) return undefined;
  return mediaQuery.data!
      .find(m => m.type === 'video' && m.path === mediaPath.value) as VideoMediaEntry ?? null;
});
</script>

<template>
  <MainLayout>
    <Page404 v-if="!currentMedia" />
    <VideoPlayer v-else :media="currentMedia" />
  </MainLayout>
</template>
