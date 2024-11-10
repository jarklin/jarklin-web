<script setup lang="ts">
import VideoPlayer from "@/components/player/VideoPlayer.vue";
import {useMediaPath} from "@/composables/useMediaPath";
import {useMediaQuery, type VideoMediaEntry} from "@/composables";
import {computed} from "vue";
import Page404 from "@/views/404.vue";

const mediaQuery = useMediaQuery();
const mediaPath = useMediaPath();

const currentMedia = computed(() => {
  if (!mediaQuery.isSuccess) return undefined;
  return mediaQuery.data!
      .find(m => m.type === 'video' && m.path === mediaPath.value) as VideoMediaEntry ?? null;
})
</script>

<template>
  <Page404 v-if="!currentMedia" />
  <VideoPlayer v-else :media="currentMedia" />
</template>
