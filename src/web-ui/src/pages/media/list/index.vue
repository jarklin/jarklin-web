<script setup lang="ts">
import { useMediaQuery } from "@/composables";
import { useTitle, useUrlSearchParams } from "@vueuse/core";
import { computed } from "vue";
import { type Filter, parseFilter } from "@/lib/filters";
import { MainLayout } from "@/layouts";
import { MediaCard } from "@/components/composed/mediacard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideImageOff } from "lucide-vue-next";
import MasonryGrid from "@/components/composed/container/MasonryGrid.vue";

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

useTitle("Jarklin - Media List");
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
    <MasonryGrid v-if="viableMedia.length" class="gap-2">
      <router-link v-for="media in viableMedia" :key="media.path" :to="{ name: '/media/details/[...mediaPath]', params: { mediaPath: media.path } }" class="h-80">
        <MediaCard :media="media" />
      </router-link>
    </MasonryGrid>
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
