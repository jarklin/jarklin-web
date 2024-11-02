<script setup lang="ts">
import {useIsFetching, useIsMutating} from "@tanstack/vue-query";

const isFetching = useIsFetching();
const isMutating = useIsMutating();
</script>

<template>
  <div v-if="!(isFetching || isMutating)" class="h-px" />
  <div v-else class="h-px overflow-hidden">
    <div class="h-px bg-primary w-1/3 animate-anything-is-loading" />
  </div>
</template>
