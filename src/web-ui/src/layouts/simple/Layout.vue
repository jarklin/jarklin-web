<script setup lang="ts">
import BackgroundQueryIndicator from "@/layouts/common/BackgroundQueryIndicator.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,auto,1fr,auto]">
    <Header />
    <BackgroundQueryIndicator />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
