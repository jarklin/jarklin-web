<script setup lang="ts">
import VideoPlayer from "@/components/player/VideoPlayer.vue";
import { useMediaPath } from "@/composables/";
import { computed, inject } from "vue";
import Page404 from "@/pages/[...path]/index.vue";
import type {VideoMediaEntry} from "@/types";
import {MainLayout} from "@/layouts";
import { useTitle } from "@vueuse/core";
import { KEY_MEDIA_DATA } from "@/keys.ts";

const mediaData = inject(KEY_MEDIA_DATA)!;
const mediaPath = useMediaPath();

const currentMedia = computed(() => {
  return mediaData.find(m => m.type === 'video' && m.path === mediaPath.value) as VideoMediaEntry ?? null;
});

useTitle(() => `Jarklin - Watch - ${currentMedia.value?.name}`);
</script>

<template>
  <MainLayout>
    <Page404 v-if="!currentMedia" />
    <VideoPlayer v-else :media="currentMedia" />
  </MainLayout>
</template>
