<script setup lang="ts">
import jarklinLogoSrc from "@/assets/jarklin.svg";
import {LucideArrowLeft, LucideScanSearch, LucideSettings} from "lucide-vue-next";
import {useRouter} from "vue-router";
import { useTitle } from "@vueuse/core";

const router = useRouter();
</script>

<template>
  <header class="bg-accent p-1 flex gap-x-2 content-baseline">
    <button class="disabled:pointer-events-none disabled:opacity-50" @click="router.back">
      <LucideArrowLeft class="size-8 rounded-md" />
    </button>
    <router-link :to="{ name: '/' }">
      <img class="size-8 rounded-md" :src="jarklinLogoSrc" alt="logo" />
    </router-link>
    <div class="grow" />
    <router-link :to="{ name: '/media/search/' }">
      <LucideScanSearch class="size-8 rounded-md" />
    </router-link>
    <router-link :to="{ name: '/panel/' }">
      <LucideSettings class="size-8 rounded-md" />
    </router-link>
  </header>
</template>
