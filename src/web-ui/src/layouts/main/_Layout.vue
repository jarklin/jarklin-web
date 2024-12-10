<script setup lang="ts">
import BackgroundQueryIndicator from "@/layouts/common/_BackgroundQueryIndicator.vue";
import Header from "./_Header.vue";
import Footer from "./_Footer.vue";
import type {HTMLAttributes} from "vue";
import {cn} from "@/lib";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,auto,1fr,auto]">
    <Header />
    <BackgroundQueryIndicator />
    <main :class="cn('w-screen', props.class)">
      <router-view v-if="!$slots.default" />
      <slot v-else />
    </main>
    <Footer />
  </div>
</template>
