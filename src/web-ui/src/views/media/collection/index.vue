<script setup lang="ts">
import { useCollections, useMediaPath } from "@/composables/";
import { computed } from "vue";
import { MainLayout } from "@/layouts";
import { MediaCard } from "@/components/composed/mediacard";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import TagBadge from "@/components/composed/TagBadge.vue";
import Page404 from "@/views/404.vue";
import KvGrid from "@/components/composed/KvGrid.vue";

const collections = useCollections();
const mediaPath = useMediaPath();

const currentCollection = computed(() => {
  return collections.value.find(c => c.path === mediaPath.value);
})
</script>

<template>
  <MainLayout class="flex flex-col gap-2 p-2">
    <Page404 v-if="currentCollection === undefined" />
    <template v-else>
      <SectionHeader>
        Collection: {{ currentCollection?.displayName }}
      </SectionHeader>
      <KvGrid>
        <label>Path</label>
        <div>{{ currentCollection.path }}</div>
        <label>Elements</label>
        <div>{{ currentCollection.mediaList.length }}</div>
        <label>Tags</label>
        <div class="flex flex-wrap gap-2">
          <TagBadge v-for="tag in currentCollection?.tags" :key="tag" :tag="tag" />
        </div>
      </KvGrid>
      <Separator />
      <div class="flex flex-wrap gap-2">
        <template v-for="media in currentCollection?.mediaList" :key="media.path">
          <router-link :to="{ name: 'media-details', params: { mediaPath: media.path } }" class="h-80">
            <MediaCard :media="media" />
          </router-link>
        </template>
      </div>
    </template>
  </MainLayout>
</template>
