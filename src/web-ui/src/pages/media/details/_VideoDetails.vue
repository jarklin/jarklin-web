<script setup lang="ts">
import humanizeDuration from "humanize-duration";
import { height2resolution } from "@/lib";
import * as humanize from "humanize-plus";
import { Badge } from "@/components/ui/badge";
import type { VideoMediaEntry } from "@/types";
import { useWebSettings } from "@/composables";
import { computed } from "vue";
import {
  LucideBookmark, LucideBookmarkX,
  LucideCaptions, LucideCaptionsOff,
  type LucideIcon,
  LucideVideo,
  LucideVideoOff,
  LucideVolume2,
  LucideVolumeX
} from "lucide-vue-next";

const { media } = defineProps<{
  media: VideoMediaEntry
}>();

const extendedMediaDetails = useWebSettings("extendedMediaDetails");

const features = computed<[LucideIcon, string, boolean][]>(() => [
    media.meta.video_streams.length
      ? [ LucideVideo, "Video", true ] : [ LucideVideoOff, "Video", false ],
    media.meta.audio_streams.length
      ? [ LucideVolume2, "Audio", true ] : [ LucideVolumeX, "Audio", false ],
    media.meta.subtitles.length
      ? [ LucideCaptions, "Subtitles", true ] : [ LucideCaptionsOff, "Subtitles", false ],
    media.meta.chapters.length
      ? [ LucideBookmark, "Chapters", true ] : [ LucideBookmarkX, "Chapters", false ],
]);
</script>

<template>
  <label>Duration</label>
  <span>
    {{ humanizeDuration(media.meta.duration*1000, { largest: 2, round: true }) }}
  </span>
  <template v-if="extendedMediaDetails">
    <label>Dimensions</label>
    <span>
      {{ media.meta.width }}x{{ media.meta.height }}
    </span>
  </template>
  <label>Resolution</label>
  <span>
    <Badge variant="secondary">
      {{ height2resolution(Math.min(media.meta.width, media.meta.height)) }}
    </Badge>
  </span>
  <label>Filesize</label>
  <span>
    {{ humanize.fileSize(media.meta.filesize) }}
  </span>
  <label>Filetype</label>
  <span>
    <Badge variant="secondary">{{ media.ext }}</Badge>
  </span>
  <template v-if="extendedMediaDetails">
    <label>Features</label>
    <span class="flex flex-wrap gap-1">
      <template v-for="[icon, label, has] in features">
        <Badge variant="secondary">
          <component :is="icon" class="size-4" />
          <span :class="has ? '' : 'decoration-from-font line-through'">
            {{ label }}
          </span>
        </Badge>
      </template>
    </span>
    <template v-if="media.meta.audio_streams.length">
      <label>Audio</label>
      <span class="flex flex-wrap gap-1">
        <template v-for="audio_stream in media.meta.audio_streams">
          <Badge variant="secondary">{{ audio_stream.language }}</Badge>
        </template>
      </span>
    </template>
    <template v-if="media.meta.subtitles.length">
      <label>Subtitles</label>
      <span class="flex flex-wrap gap-1">
        <template v-for="subtitle in media.meta.subtitles">
          <Badge variant="secondary">{{ subtitle.language }}</Badge>
        </template>
      </span>
    </template>
    <template v-if="media.meta.chapters.length">
      <label>Chapters</label>
      <span>
        {{ media.meta.chapters.length }}
      </span>
    </template>
  </template>
</template>
