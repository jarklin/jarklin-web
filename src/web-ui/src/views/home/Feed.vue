<script setup lang="ts">
import {VerticalScroll} from "@/components/composed/container";
import {useMediaQuery} from "@/composables";
import {computed} from "vue";
import { type Filter } from "@/lib/filters";
import {MediaCard} from "@/components/composed/mediacard";

const { filter } = defineProps<{
  filter: Filter
}>();

const mediaQuery = useMediaQuery();

const viableMedia = computed(() => {
  if (!mediaQuery.isSuccess) return [];
  return filter(mediaQuery.data);
})
</script>

<template>
  <VerticalScroll class="py-2">
    <router-link v-for="media in viableMedia" :key="media.path" class="h-60" :to="{ name: 'media-details', params: { mediaPath: media.path } }">
      <MediaCard :media="media" />
    </router-link>
  </VerticalScroll>
</template>
