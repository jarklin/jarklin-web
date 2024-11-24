<script setup lang="ts">
import {useCollections} from "@/composables/useCollections";
import CollectionCard from "@/components/composed/mediacard/CollectionCard.vue";
import {MainLayout} from "@/layouts";

const collections = useCollections();
</script>

<template>
  <MainLayout class="p-2">
    <div class="flex flex-wrap gap-2">
      <router-link v-for="collection in collections" :key="collection.path" :to="{ name: 'collection-details', params: { mediaPath: collection.path } }" class="size-80">
        <CollectionCard :collection="collection" />
      </router-link>
    </div>
  </MainLayout>
</template>
