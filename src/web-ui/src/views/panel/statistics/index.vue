<script setup lang="ts">
import {useMediaQuery, useProblemsQuery} from "@/composables";
import {computed} from "vue";
import humanize from "humanize-plus";
import humanizeDuration from "humanize-duration";
import type {GalleryMediaEntry, VideoMediaEntry} from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideChartBar } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";

type Index = Array<{
  category: string
  stats: Array<{
    label: string
    value: string | number
  }>
}>

const mediaData = useMediaQuery();
const problemsData = useProblemsQuery();

const staticsIndex = computed<Index | null>(() => {
  const galleries = !mediaData.isSuccess ? null : mediaData.data
      .filter(entry => entry.meta.type === "gallery") as GalleryMediaEntry[];
  const videos = !mediaData.isSuccess ? null : mediaData.data
      .filter(entry => entry.meta.type === "video") as VideoMediaEntry[];

  const gallerySizes = galleries === null ? null : galleries.reduce((n, e) => n + e.meta.images.reduce((n2, i) => n2 + i.filesize, 0), 0);
  const videoSizes = videos === null ? null : videos.reduce((n, e) => n + e.meta.filesize, 0);

  return [
    {
      category: "Galleries",
      stats: [
        {
          label: "Total Galleries",
          value: !galleries ? "-" : humanize.intComma(galleries.length),
        },
        {
          label: "Total Images",
          value: !galleries ? "-" : humanize.intComma(
              galleries.reduce((n, e) => n + e.meta.images.length, 0),
          ),
        },
      ],
    },
    {
      category: "Videos",
      stats: [
        {
          label: "Total Videos",
          value: !videos ? "-" : humanize.intComma(videos.length),
        },
        {
          label: "Total Duration",
          value: !videos ? "-" : humanizeDuration(
              videos.reduce((n, e) => n + e.meta.duration, 0)*1000,
              { largest: 2, round: true },
          ),
        },
      ],
    },
    {
      category: "Sizes",
      stats: [
        {
          label: "Total Sizes",
          value: (videoSizes === null || gallerySizes === null) ? "-" : humanize.fileSize(videoSizes + gallerySizes),
        },
        {
          label: "Gallery Sizes",
          value: gallerySizes === null ? "-" : humanize.fileSize(gallerySizes),
        },
        {
          label: "Video Sizes",
          value: videoSizes === null ? "-" : humanize.fileSize(videoSizes),
        },
      ],
    },
    {
      category: "Problems",
      stats: [
        {
          label: "Total Problems",
          value: !problemsData.isSuccess ? "-" : humanize.intComma(problemsData.data.length),
        },
      ],
    },
    {
      category: "Other",
      stats: [
        {
          label: "Total Tags",
          value: !mediaData.isSuccess ? "-" : humanize.intComma(
              Array.from(new Set(mediaData.data.flatMap(e => e.tags))).length),
        },
      ],
    },
  ];
});
</script>

<template>
  <Alert>
    <LucideChartBar class="size-4" />
    <AlertTitle>
      Statistics about your media
    </AlertTitle>
    <AlertDescription class="text-muted-foreground">
      You may be interested in finding out more about the media available to you.
      Here you can (hopefully) see interesting statistics about them.
    </AlertDescription>
  </Alert>
  <div class="grid grid-cols-[auto,1fr] gap-4">
    <template v-for="category in staticsIndex">
      <div class="col-span-2 text-xl font-bold text-primary">{{ category.category }}</div>
      <template v-for="stat in category.stats">
        <div class="ml-2 font-bold">{{ stat.label }}:</div>
        <div>{{ stat.value }}</div>
      </template>
    </template>
  </div>
</template>
