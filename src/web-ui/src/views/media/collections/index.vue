<script setup lang="ts">
import {useCollections} from "@/composables/useCollections";
import {LucideLibraryBig} from "lucide-vue-next";
import CollectionCard from "@/components/composed/mediacard/CollectionCard.vue";
import {MainLayout} from "@/layouts";
import SectionHeader from "@/components/composed/SectionHeader.vue";
import {Separator} from "@/components/ui/separator";

const collections = useCollections();
</script>

<template>
  <MainLayout class="px-2">
    <SectionHeader>
      <LucideLibraryBig />
      Collections
    </SectionHeader>
    <Separator class="my-1" />
    <div class="flex flex-wrap gap-2">
      <router-link v-for="collection in collections" :key="collection.path" :to="{ name: 'collection-details', params: { mediaPath: collection.path } }" class="size-80">
        <CollectionCard :collection="collection" />
      </router-link>
    </div>
  </MainLayout>
</template>
