<script setup lang="ts">
import { MainLayout } from "@/layouts";
import { useTitle } from "@vueuse/core";

useTitle("Jarklin - Not Found");
</script>

<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>
