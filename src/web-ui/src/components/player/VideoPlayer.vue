<script setup lang="ts">
import "vidstack/bundle";
import "vidstack/vue";
import {getSource} from "@/lib";
import {useUrlSearchParams} from "@vueuse/core";
import type {VideoMediaEntry} from "@/types";

defineProps<{
  media: VideoMediaEntry
}>();

const urlParams = useUrlSearchParams<{
  initialTime?: string
}>("hash");

const initialTime = parseFloat(urlParams.initialTime ?? "0");
// urlParams.initialTime = undefined;  // auto-reset
</script>

<template>
  <media-player
      class="size-full bg-black"
      autoplay
      :title="media.name"
      :src="getSource(media.path)"
      :duration="media.meta.duration"
      :current-time="initialTime"
      view-type="video"
      stream-type="on-demand"
      load="eager"
      key-target="document"
  >
    <media-provider />
    <media-video-layout
        :thumbnails="getSource(media.path, 'storyboard.vtt')"
        :data-no-scrub-gesture="false"
    />
  </media-player>
</template>
