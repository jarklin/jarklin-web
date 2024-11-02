<script setup lang="ts">
import BackgroundQueryIndicator from "@/layouts/common/BackgroundQueryIndicator.vue";
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,auto,1fr,auto]">
    <header class="bg-accent p-1 flex flex-col gap-1 items-center">
      <!-- this element if to make the upper area the same size as the lower one -->
      <div class="invisible pointer-events-none">hidden</div>
    </header>
    <BackgroundQueryIndicator />
    <main>
      <router-view />
    </main>
    <footer class="bg-accent p-1 flex flex-col gap-1 items-center">
      <div>
        <a class="text-primary transition-colors hover:underline hover:text-primary/80" href="https://jarklin.github.io/" target="_blank" rel="noopener noreferrer">
          ©{{ new Date().getFullYear() }} Jarklin
        </a>
      </div>
    </footer>
  </div>
</template>
