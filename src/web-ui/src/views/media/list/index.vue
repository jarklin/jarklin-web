<script setup lang="ts">
import { useMediaQuery } from "@/composables";
import { useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";
import { type Filter, parseFilter } from "@/lib/filters";
import { MainLayout } from "@/layouts";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { Separator } from "@/components/ui/separator";
import { LucideTableProperties } from "lucide-vue-next";
import { MediaCard } from "@/components/composed/mediacard";

const mediaQuery = useMediaQuery();

const queryParams = useUrlSearchParams<{
  filterDefinition?: string
}>("hash");

const filter = computed<Filter>(() => queryParams.filterDefinition === undefined ? ((_) => _) : parseFilter(queryParams.filterDefinition));

const viableMedia = computed(() => {
  if (!mediaQuery.isSuccess) return [];
  return filter.value(mediaQuery.data);
})
</script>

<template>
  <MainLayout class="px-2">
    <SectionHeader>
      <LucideTableProperties />
      Media List
    </SectionHeader>
    <Separator class="my-1" />
    <div class="flex flex-wrap gap-2">
      <router-link v-for="media in viableMedia" :key="media.path" :to="{ name: 'media-details', params: { mediaPath: media.path } }" class="h-80">
        <MediaCard :media="media" />
      </router-link>
    </div>
  </MainLayout>
</template>
