<script setup lang="ts">
import {useCollections} from "@/composables/useCollections";
import CollectionCard from "@/components/composed/mediacard/CollectionCard.vue";
import {MainLayout} from "@/layouts";
import MasonryGrid from "@/components/composed/container/MasonryGrid.vue";

const collections = useCollections();
</script>

<template>
  <MainLayout class="p-2">
    <MasonryGrid class="gap-2">
      <router-link v-for="collection in collections" :key="collection.path" :to="{ name: 'collection-details', params: { mediaPath: collection.path } }" class="size-80 m-auto">
        <CollectionCard :collection="collection" />
      </router-link>
    </MasonryGrid>
  </MainLayout>
</template>
