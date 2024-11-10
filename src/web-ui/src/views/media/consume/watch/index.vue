<script setup lang="ts">
import VideoPlayer from "@/components/player/VideoPlayer.vue";
import {useMediaPath} from "@/composables/useMediaPath";
import {useMediaQuery, type VideoMediaEntry} from "@/composables";
import {computed} from "vue";

const mediaQuery = useMediaQuery();
const mediaPath = useMediaPath();

const currentMedia = computed(() => {
  if (!mediaQuery.isSuccess) return undefined;
  return mediaQuery.data!
      .find(m => m.type === 'video' && m.path === mediaPath.value) ?? null;
})
</script>

<template>
  <VideoPlayer v-if="currentMedia" :media="currentMedia as VideoMediaEntry" />
</template>
