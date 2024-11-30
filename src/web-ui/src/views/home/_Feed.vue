<script setup lang="ts">
import {HorizontalScroll} from "@/components/composed/container";
import {useMediaQuery} from "@/composables";
import {computed} from "vue";
import { mergeFilters, parseFilter, filters } from "@/lib/filters";
import {MediaCard} from "@/components/composed/mediacard";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { type HomepageElement, MAX_ENTRIES } from "@/views/home/elements";
import {Separator} from "@/components/ui/separator";

const { filterDefinition } = defineProps<{
  element: HomepageElement
  filterDefinition: string
}>();

const mediaQuery = useMediaQuery();

const filter = computed(() => mergeFilters(parseFilter(filterDefinition), filters.limitedTo(MAX_ENTRIES)));

const viableMedia = computed(() => {
  if (!mediaQuery.isSuccess) return [];
  return filter.value(mediaQuery.data);
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
        <router-link class="h-60" :to="{ name: 'media-details', params: { mediaPath: media.path } }">
          <MediaCard :media="media" />
        </router-link>
      </template>
    </HorizontalScroll>
  </template>
</template>
