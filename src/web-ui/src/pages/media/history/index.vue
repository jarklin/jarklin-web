<script setup lang="ts">
import { useMediaQuery } from "@/composables";
import { useTitle, useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";
import { type Filter, parseFilter } from "@/lib/filters";
import { MainLayout } from "@/layouts";
import { MediaCard } from "@/components/composed/mediacard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideCircleDot, LucideImageOff } from "lucide-vue-next";
import type { MediaEntry } from "@/types";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { HorizontalScroll } from "@/components/composed/container";

const mediaQuery = useMediaQuery();

const queryParams = useUrlSearchParams<{
  tag?: string
  filterDefinition?: string
  historyAttribute?: KeyOfType<MediaEntry, number>
}>("hash");

const filter = computed<Filter | undefined>(() => queryParams.filterDefinition === undefined ? undefined : parseFilter(queryParams.filterDefinition));

const viableMedia = computed(() => {
  if (!mediaQuery.isSuccess) return [];
  let elements = mediaQuery.data;
  if (queryParams.tag) elements = elements.filter((m => m.tags.includes(queryParams.tag!)))
  if (filter.value) elements = filter.value(elements)
  return elements;
});

const groupedMedia = computed(() => {
  const groups: Map<number, MediaEntry[]> = new Map();

  for (const media of viableMedia.value) {
    const cdate = new Date(media[queryParams.historyAttribute ?? 'creation_time'] * 1000);
    const key = new Date(cdate.getFullYear(), cdate.getMonth(), cdate.getDate()).getTime();
    if (groups.has(key)) groups.get(key)!.push(media);
    else groups.set(key, [media]);
  }

  return new Map([...groups.entries()].sort(([a], [b]) => b - a));
});

useTitle("Jarklin - Media List");
</script>

<template>
  <MainLayout class="py-2 space-y-2">
    <template v-if="viableMedia.length" v-for="[groupKey, groupMedia] in groupedMedia.entries()">
      <div class="relative pl-8">
        <LucideCircleDot class="absolute top-1.5 left-4 -translate-x-1/2 size-5 text-primary" />
        <div class="absolute top-8 left-4 -translate-x-1/2 w-0.5 h-[calc(100%-1.5rem)] bg-secondary" />
        <SectionHeader>{{ new Date(groupKey).toDateString() }}</SectionHeader>
        <HorizontalScroll class="gap-2">
          <router-link v-for="media in groupMedia" :key="media.path" :to="{ name: '/media/details/[...mediaPath]', params: { mediaPath: media.path } }" class="h-60">
            <MediaCard :media="media" />
          </router-link>
        </HorizontalScroll>
      </div>
    </template>
    <div v-else class="grid place-content-center h-full">
      <Alert class="max-w-md">
        <LucideImageOff class="size-4" />
        <AlertTitle>
          Nothing Found
        </AlertTitle>
        <AlertDescription>
          Either there is no media or you have activated certain filters that do not deliver any results.
        </AlertDescription>
      </Alert>
    </div>
  </MainLayout>
</template>
