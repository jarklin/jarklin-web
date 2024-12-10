<script setup lang="ts">
import {usePageTitle} from "@/composables";
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import ScrollProgressFix from "@/components/ScrollProgressFix.vue";

usePageTitle();
</script>

<template>
  <ScrollProgressFix />
  <ErrorBoundary>
    <router-view />
  </ErrorBoundary>
</template>
