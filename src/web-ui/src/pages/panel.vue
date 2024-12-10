<script setup lang="ts">
import {Separator} from "@/components/ui/separator";
import {MainLayout} from "@/layouts";
import type { RouteLocationRaw } from "vue-router";

interface SubRoute {
  name: string
  location: RouteLocationRaw
}

const subRoutes: SubRoute[] = [
  {
    name: "Settings",
    location: { name: "/panel/settings/" },
  },
  {
    name: "Problems",
    location: { name: "/panel/problems/" },
  },
  {
    name: "Statistics",
    location: { name: "/panel/statistics/" },
  },
];
</script>

<template>
  <MainLayout class="max-w-screen-lg mx-auto p-4 flex flex-col gap-y-4">
    <div class="justify-center flex flex-nowrap gap-x-2 md:gap-x-4">
      <template v-for="(route, index) in subRoutes">
        <Separator v-if="index !== 0" orientation="vertical" class="h-4 my-auto" />
        <router-link :to="route.location" class="group p-1 font-bold" active-class="[&>span]:max-w-full">
          {{ route.name }}
          <span class="block mx-auto max-w-0 group-hover:max-w-full transition-[max-width] h-px bg-primary" />
        </router-link>
      </template>
    </div>
    <router-view />
  </MainLayout>
</template>
