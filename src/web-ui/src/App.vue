<script setup lang="ts">
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import ScrollProgressFix from "@/components/ScrollProgressFix.vue";
</script>

<template>
  <ScrollProgressFix />
  <ErrorBoundary>
    <router-view />
  </ErrorBoundary>
</template>
