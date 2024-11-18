<script setup lang="ts">
defineProps<{}>();
</script>

<template>
  <h1 class="text-2xl font-bold [&>svg]:size-7 [&>svg]:-mt-1 [&>svg]:inline-block">
    <slot />
  </h1>
</template>
