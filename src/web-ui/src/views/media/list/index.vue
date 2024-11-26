<script setup lang="ts">
import { useMediaQuery } from "@/composables";
import { useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";
import { type Filter, parseFilter } from "@/lib/filters";
import { MainLayout } from "@/layouts";
import { MediaCard } from "@/components/composed/mediacard";

const mediaQuery = useMediaQuery();

const queryParams = useUrlSearchParams<{
  tag?: string
  filterDefinition?: string
}>("hash");

const filter = computed<Filter | undefined>(() => queryParams.filterDefinition === undefined ? undefined : parseFilter(queryParams.filterDefinition));

const viableMedia = computed(() => {
  if (!mediaQuery.isSuccess) return [];
  let elements = mediaQuery.data;
  if (queryParams.tag) elements = elements.filter((m => m.tags.includes(queryParams.tag!)))
  if (filter.value) elements = filter.value(elements)
  return elements;
});
</script>

<template>
  <MainLayout class="p-2">
<!-- somehow buggy. wont trigger re-filtering-->
<!--    <template v-if="queryParams.tag || filter">-->
<!--      <div class="flex flex-wrap gap-2">-->
<!--        <Badge variant="secondary" v-if="queryParams.tag">-->
<!--          {{ queryParams.tag }}-->
<!--          <router-link :to="{ ...$route, query: { ...$route.query, tag: undefined } }">-->
<!--            <LucideCircleX class="size-4 ml-1" />-->
<!--          </router-link>-->
<!--        </Badge>-->
<!--        <Badge variant="secondary" v-if="queryParams.filterDefinition">-->
<!--          {{ queryParams.filterDefinition.replace("|", " ↣ ") }}-->
<!--          <router-link :to="{ ...$route, query: { ...$route.query, filterDefinition: undefined } }">-->
<!--            <LucideCircleX class="size-4 ml-1" />-->
<!--          </router-link>-->
<!--        </Badge>-->
<!--      </div>-->
<!--      <Separator class="my-2" />-->
<!--    </template>-->
    <div class="flex flex-wrap gap-2">
      <router-link v-for="media in viableMedia" :key="media.path" :to="{ name: 'media-details', params: { mediaPath: media.path } }" class="h-80">
        <MediaCard :media="media" />
      </router-link>
    </div>
  </MainLayout>
</template>
