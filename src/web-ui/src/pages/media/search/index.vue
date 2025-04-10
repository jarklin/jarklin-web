<script setup lang="ts">
import { LucideSearch, LucideSearchX } from "lucide-vue-next";
import {Input} from "@/components/ui/input";
import { computed, ref } from "vue";
import { onStartTyping, templateRef, useTitle, useUrlSearchParams, watchDebounced } from "@vueuse/core";
import {MainLayout} from "@/layouts";
import { useMediaQuery } from "@/composables";
import * as JsSearch from "js-search";
import { MediaCard } from "@/components/composed/mediacard";
import MasonryGrid from "@/components/composed/container/MasonryGrid.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { MediaEntry } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();
const mediaQuery = useMediaQuery();

const urlSearchParams = useUrlSearchParams<{ query?: string }>("hash");
const filterQuery = ref<string>(urlSearchParams.query ?? "");

const inputFieldRef = templateRef("input-field");

const search = computed(() => {
  const s = new JsSearch.Search("path");
  s.addIndex("name");
  s.addIndex("tags");
  s.addDocuments(mediaQuery.data ?? []);
  return s;
});

const matchingMedia = computed(
    () => search.value.search(filterQuery.value) as MediaEntry[],
);

watchDebounced(() => urlSearchParams.query, () => {
  filterQuery.value = urlSearchParams.query ?? "";
  router.push({ query: { query: urlSearchParams.query } });
}, { debounce: 300, maxWait: 5000 });

onStartTyping(() => {
  if (document.activeElement !== inputFieldRef.value) {
    inputFieldRef.value?.$el.focus();
  }
});

useTitle(() => filterQuery.value.length
  ? `Jarklin - Search - '${filterQuery.value}'`
  : "Jarklin - Search"
);
</script>

<template>
  <MainLayout class="flex flex-col gap-2 p-2">
    <div class="w-full max-w-2xl mx-auto relative items-center">
      <Input ref="input-field" v-model.trim="urlSearchParams.query" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 grid place-content-center px-2">
        <LucideSearch class="size-6 text-muted-foreground" />
      </span>
    </div>
    <Alert v-if="filterQuery && !matchingMedia.length" class="w-full max-w-xl mx-auto mt-2">
      <LucideSearchX class="size-4" />
      <AlertTitle>
        Nothing Found
      </AlertTitle>
      <AlertDescription class="text-muted-foreground">
        Your search did not match any media.
      </AlertDescription>
    </Alert>
    <MasonryGrid v-else>
      <template v-for="media in matchingMedia" :key="media.path">
        <router-link :to="{ name: '/media/details/[...mediaPath]', params: { mediaPath: media.path } }">
          <MediaCard :media="media" />
        </router-link>
      </template>
    </MasonryGrid>
  </MainLayout>
</template>
