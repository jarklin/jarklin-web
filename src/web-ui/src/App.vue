<script setup lang="ts">
import {usePageTitle} from "@/composables";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

usePageTitle();
</script>

<template>
  <ErrorBoundary>
    <router-view />
  </ErrorBoundary>
</template>
