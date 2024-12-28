<script setup lang="ts">
import { computed, inject } from "vue";
import type {TagTreeEntry} from "@/pages/tags/types";
import EntryComponent from "@/pages/tags/_EntryComponent.vue";
import {MainLayout} from "@/layouts";
import { useTitle } from "@vueuse/core";
import { KEY_MEDIA_DATA } from "@/keys.ts";

const mediaData = inject(KEY_MEDIA_DATA)!;

const allTags = computed(() => Array.from(new Set(mediaData.flatMap(e => e.tags))));

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

useTitle("Jarklin - Tags");
</script>

<template>
  <MainLayout class="p-2">
    <EntryComponent :tag-entries="tagTree" />
  </MainLayout>
</template>
