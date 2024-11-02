<script setup lang="ts">
import jarklinLogoSrc from "@/assets/jarklin.svg";
import {LucideArrowLeft} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import router from "@/router";
import {computed} from "vue";

const historyAvailable = computed(() => window.history.length > 1);
</script>

<template>
  <header class="bg-accent p-1 flex gap-2 items-stretch content-baseline">
    <Button variant="ghost" size="icon" @click="router.back" :disabled="!historyAvailable">
      <LucideArrowLeft class="size-8" />
    </Button>
    <router-link :to="{ name: 'home' }" class="p-0.5">
      <img class="size-8" :src="jarklinLogoSrc" alt="logo" />
    </router-link>
    <div class="grow" />
  </header>
</template>
