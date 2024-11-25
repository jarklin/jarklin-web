<script setup lang="ts">
import {LucideSearch} from "lucide-vue-next";
import {Input} from "@/components/ui/input";
import { computed, ref } from "vue";
import {onStartTyping, useUrlSearchParams, watchDebounced} from "@vueuse/core";
import {MainLayout} from "@/layouts";
import { useMediaQuery } from "@/composables";
import * as JsSearch from "js-search";
import { MediaCard } from "@/components/composed/mediacard";

const mediaQuery = useMediaQuery();

const urlSearchParams = useUrlSearchParams<{ query?: string }>("hash");

const inputQuery = ref<string>(urlSearchParams.query ?? "");
const inputRef = ref();

const filterQuery = ref<string>(urlSearchParams.query ?? "");

const search = computed(() => {
  const s = new JsSearch.Search("path");
  s.addIndex("name");
  s.addIndex("tags");
  s.addDocuments(mediaQuery.data ?? []);
  return s;
});

const matchingMedia = computed(
    () => search.value.search(filterQuery.value) as typeof mediaQuery.data,
);

watchDebounced(inputQuery, () => {
  filterQuery.value = inputQuery.value;
  urlSearchParams.query = inputQuery.value;
}, { debounce: 300, maxWait: 5000 });

onStartTyping(() => {
  if (document.activeElement !== inputRef.value) {
    // todo: set focus to the input-field
  }
});
</script>

<template>
  <MainLayout class="flex flex-col gap-2 p-2">
    <div class="w-full max-w-2xl mx-auto relative items-center">
      <Input v-model.trim="inputQuery" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 grid place-content-center px-2">
        <LucideSearch class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div class="flex flex-wrap gap-2">
      <router-link v-for="media in matchingMedia" :key="media.path" :to="{ name: 'media-details', params: { mediaPath: media.path } }" class="h-80">
        <MediaCard :media="media" />
      </router-link>
    </div>
  </MainLayout>
</template>
