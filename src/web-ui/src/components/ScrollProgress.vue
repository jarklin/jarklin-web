<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

const progress = ref(0.0);

function updateProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.value = winScroll / height;
}

onMounted(() => window.addEventListener("scroll", updateProgress));
onUnmounted(() => window.removeEventListener("scroll", updateProgress));
</script>

<template>
  <div role="progressbar" class="sticky top-0">
    <div class="bg-primary h-1" :style="{ width: `${progress * 100}%` }" />
  </div>
</template>
