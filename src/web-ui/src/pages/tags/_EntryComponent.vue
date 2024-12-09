<script setup lang="ts">
import type {TagTreeEntry} from "@/pages/tags/types";
import TagBadge from "@/components/composed/TagBadge.vue";

defineProps<{
  tagEntries: TagTreeEntry[]
}>();
</script>

<template>
  <template v-for="tagEntry in tagEntries" :key="tagEntry.tag">
    <div class="mt-0.5">
      <TagBadge :tag="tagEntry.tag" />
    </div>
    <div v-if="tagEntry.children.length" class="pl-4">
      <EntryComponent :tag-entries="tagEntry.children" />
    </div>
  </template>
</template>
