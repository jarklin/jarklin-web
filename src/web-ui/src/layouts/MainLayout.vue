<script setup lang="ts">
import BackgroundQueryIndicator from "@/layouts/common/BackgroundQueryIndicator.vue";
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,auto,1fr,auto]">
    <header>

    </header>
    <BackgroundQueryIndicator />
    <main>
      <router-view />
    </main>
    <footer>

    </footer>
  </div>
</template>
