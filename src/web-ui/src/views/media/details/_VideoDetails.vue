<script setup lang="ts">
import humanizeDuration from "humanize-duration";
import { height2resolution } from "@/lib";
import humanize from "humanize-plus";
import { Badge } from "@/components/ui/badge";
import type { VideoMediaEntry } from "@/types";

defineProps<{
  media: VideoMediaEntry
}>();
</script>

<template>
  <label>Duration</label>
  <span>
    {{ humanizeDuration(media.meta.duration*1000, { largest: 2, round: true }) }}
  </span>
  <label>Dimensions</label>
  <span>
    {{ media.meta.width }}x{{ media.meta.height }}
  </span>
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
</template>
