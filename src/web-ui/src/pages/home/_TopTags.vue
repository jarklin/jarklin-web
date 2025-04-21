<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { type HomepageElement, MAX_ENTRIES } from "@/pages/home/elements.ts";
import { computed, inject } from "vue";
import TagBadge from "@/components/composed/TagBadge.vue";
import { KEY_MEDIA_DATA } from "@/keys.ts";

defineProps<{
  element: HomepageElement
}>();

const mediaData = inject(KEY_MEDIA_DATA)!;

const topTags = computed(() =>
        Array.from(
            new Set(mediaData.flatMap(m => m.tags))
        )
        .map(tag => ({ tag, count: mediaData.filter(m => m.tags.includes(tag)).length }))
        .sort((a, b) => b.count - a.count)
        .map(({ tag }) => tag)
        .slice(0, MAX_ENTRIES)
);
</script>

<template>
  <template v-if="topTags.length">
    <Separator />
    <SectionHeader :to="element.location">
      <component v-if="element.icon" :is="element.icon" />
      Top Tags
    </SectionHeader>
    <div class="flex flex-wrap gap-2">
      <TagBadge v-for="tag in topTags" :key="tag" :tag="tag" />
    </div>
  </template>
</template>
