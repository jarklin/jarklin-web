<script setup lang="ts">
import type {HTMLAttributes} from "vue";
import type {Collection} from "@/types";
import InternalCard from "@/components/composed/mediacard/_InternalCard.vue";
import {LucideLibrarySquare} from "lucide-vue-next";

defineProps<{
  class?: HTMLAttributes['class']
  collection: Collection
}>();
</script>

<template>
  <InternalCard
      :image-src="collection.previewUrl"
      :icon="LucideLibrarySquare"
      :name="collection.displayName"
      aspect-ratio="1"
  />
</template>
