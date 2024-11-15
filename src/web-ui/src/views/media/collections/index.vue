<script setup lang="ts">
import {useCollections} from "@/composables/useCollections";
import {LucideLibraryBig} from "lucide-vue-next";
import CollectionCard from "@/components/composed/mediacard/CollectionCard.vue";

const collections = useCollections();
</script>

<template>
  <h1 class="text-2xl">
    <LucideLibraryBig class="inline-block" />
    Collections
  </h1>
  <div class="flex flex-wrap gap-2">
    <router-link v-for="collection in collections" :key="collection.path" :to="{ name: 'collection-details', params: { mediaPath: collection.path } }" class="size-80">
      <CollectionCard :collection="collection" />
    </router-link>
  </div>
</template>
