<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="h-full grid place-content-center text-center gap-2">
    <h1 class="text-4xl">404 Page Not Found</h1>
    <p>The requested URL was not found. If you entered the URL manually please check your spelling and try again.</p>
    <router-link :to="{ name: '/' }" class="w-fit mx-auto">
      <Button variant="link" size="lg" class="text-2xl">
        Homepage
      </Button>
    </router-link>
  </div>
</template>
