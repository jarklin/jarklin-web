<script setup lang="ts">
import type { HomepageElement } from "@/pages/home/elements.ts";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import { useCollections } from "@/composables/";
import { HorizontalScroll } from "@/components/composed/container";
import CollectionCard from "@/components/composed/mediacard/CollectionCard.vue";

defineProps<{
  element: HomepageElement
}>();

const collections = useCollections();
</script>

<template>
  <template v-if="collections.length">
    <Separator />
    <SectionHeader :to="element.location">
      <component v-if="element.icon" :is="element.icon" />
      Random Collections
    </SectionHeader>
    <HorizontalScroll class="py-2">
      <template v-for="collection in collections" :key="collection.path">
        <router-link :to="{ name: '/media/collection/[...mediaPath]', params: { mediaPath: collection.path } }" class="size-60">
          <CollectionCard :collection="collection" />
        </router-link>
      </template>
    </HorizontalScroll>
  </template>
</template>
