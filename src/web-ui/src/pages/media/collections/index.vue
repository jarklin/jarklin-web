<script setup lang="ts">
import {useCollections} from "@/composables/";
import CollectionCard from "@/components/composed/mediacard/CollectionCard.vue";
import {MainLayout} from "@/layouts";
import MasonryGrid from "@/components/composed/container/MasonryGrid.vue";

const collections = useCollections();
</script>

<template>
  <MainLayout class="p-2">
    <MasonryGrid class="gap-2">
      <template v-for="collection in collections" :key="collection.path">
        <router-link :to="{ name: '/media/collection/[...mediaPath]', params: { mediaPath: collection.path } }" class="h-60">
          <CollectionCard :collection="collection" />
        </router-link>
      </template>
    </MasonryGrid>
  </MainLayout>
</template>
