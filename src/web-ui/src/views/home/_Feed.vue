<script setup lang="ts">
import {VerticalScroll} from "@/components/composed/container";
import {useMediaQuery} from "@/composables";
import {computed} from "vue";
import { parseFilter } from "@/lib/filters";
import {MediaCard} from "@/components/composed/mediacard";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import type {HomepageElement} from "@/views/home/elements";
import {Separator} from "@/components/ui/separator";

const { filterDefinition } = defineProps<{
  element: HomepageElement
  filterDefinition: string
}>();

const mediaQuery = useMediaQuery();

const filter = computed(() => parseFilter(filterDefinition));

const viableMedia = computed(() => {
  if (!mediaQuery.isSuccess) return [];
  return filter.value(mediaQuery.data);
});
</script>

<template>
  <template v-if="viableMedia.length">
    <Separator />
    <SectionHeader>
      <component v-if="element.icon" :is="element.icon" />
      {{ element.displayName }}
    </SectionHeader>
    <VerticalScroll class="py-2">
      <router-link v-for="media in viableMedia" :key="media.path" class="h-60" :to="{ name: 'media-details', params: { mediaPath: media.path } }">
        <MediaCard :media="media" />
      </router-link>
    </VerticalScroll>
  </template>
</template>
