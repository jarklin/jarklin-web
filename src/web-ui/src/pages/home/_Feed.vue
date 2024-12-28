<script setup lang="ts">
import {HorizontalScroll} from "@/components/composed/container";
import { computed, inject } from "vue";
import { mergeFilters, parseFilter, filters } from "@/lib/filters";
import {MediaCard} from "@/components/composed/mediacard";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { type HomepageElement, MAX_ENTRIES } from "@/pages/home/elements";
import {Separator} from "@/components/ui/separator";
import { KEY_MEDIA_DATA } from "@/keys.ts";

const { filterDefinition } = defineProps<{
  element: HomepageElement
  filterDefinition: string
}>();

const mediaData = inject(KEY_MEDIA_DATA)!;

const filter = computed(() => mergeFilters(parseFilter(filterDefinition), filters.limitedTo(MAX_ENTRIES)));

const viableMedia = computed(() => {
  return filter.value(mediaData);
});
</script>

<template>
  <template v-if="viableMedia.length">
    <Separator />
    <SectionHeader :to="element.location">
      <component v-if="element.icon" :is="element.icon" />
      {{ element.displayName }}
    </SectionHeader>
    <HorizontalScroll class="py-2">
      <template v-for="media in viableMedia" :key="media.path">
        <router-link class="h-60" :to="{ name: '/media/details/[...mediaPath]', params: { mediaPath: media.path } }">
          <MediaCard :media="media" />
        </router-link>
      </template>
    </HorizontalScroll>
  </template>
</template>
