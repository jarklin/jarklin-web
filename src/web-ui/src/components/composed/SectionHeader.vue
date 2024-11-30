<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { LucideChevronRight } from "lucide-vue-next";

defineProps<{
  to?: RouteLocationRaw
}>();
</script>

<template>
  <h1 class="text-2xl font-bold flex items-center gap-x-2">
    <router-link v-if="to" :to="to" class="w-fit flex items-center gap-x-2 group">
      <slot />
      <LucideChevronRight class="text-muted-foreground transition-colors group-hover:text-primary" />
    </router-link>
    <slot v-else />
  </h1>
</template>
