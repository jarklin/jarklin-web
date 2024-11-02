<script setup lang="ts">
import {useRoute} from "vue-router";
import {watch} from "vue";
import {toTitleCase} from "@/lib/utils";

const route = useRoute();

watch(() => route.name as string, (newName) => {
  if (newName) {
    document.title = `Jarklin - ${toTitleCase(newName)}`;
  } else {
    document.title = `Jarklin`;
  }
})
</script>

<template>
  <router-view />
</template>
