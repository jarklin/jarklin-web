<script setup lang="ts">
import {Badge} from "@/components/ui/badge";

defineProps<{
  tag: string
}>();
</script>

<template>
  <router-link :to="{ name: 'media-list', query: { tag } }">
    <Badge variant="default">
      {{ tag }}
    </Badge>
  </router-link>
</template>
