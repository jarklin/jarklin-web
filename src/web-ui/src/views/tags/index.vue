<script setup lang="ts">
import {useMediaQuery} from "@/composables";
import {computed} from "vue";
import type {TagTreeEntry} from "@/views/tags/types";
import EntryComponent from "@/views/tags/EntryComponent.vue";
import {MainLayout} from "@/layouts";

const mediaQuery = useMediaQuery();

const allTags = computed(() => Array.from(new Set(mediaQuery.data?.flatMap(e => e.tags))));

const tagTree = computed(() => {
  if (!allTags.value) return [];
  const entries: TagTreeEntry[] = [];

  for (const tag of allTags.value) {
    let currentEntries: TagTreeEntry[] = entries;
    const parts = tag.split("/");
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      let entry = currentEntries.find(e => e.part === part);
      if (entry === undefined) {
        entry = <TagTreeEntry>{
          part: part,
          tag: parts.slice(0, i+1).join("/"),
          children: []
        };
        const newIndex = currentEntries.findIndex(e => e.part.localeCompare(part) >= 0);
        currentEntries.splice(newIndex === -1 ? currentEntries.length : newIndex, 0, entry);
      }
      currentEntries = entry.children;
    }
  }

  return entries;
});
</script>

<template>
  <MainLayout class="p-2">
    <EntryComponent :tag-entries="tagTree" />
  </MainLayout>
</template>
