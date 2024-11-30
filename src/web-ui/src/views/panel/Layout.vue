<script setup lang="ts">
import {Separator} from "@/components/ui/separator";
import {formatRouteName} from "@/lib";
import {useRouter} from "vue-router";
import {MainLayout} from "@/layouts";

const router = useRouter();

const subRoutes = router.getRoutes()
  .filter(route => route.path.startsWith("/panel/") && !!route.name);
</script>

<template>
  <MainLayout class="max-w-screen-lg mx-auto p-4 flex flex-col gap-y-4">
    <div class="justify-center flex flex-nowrap gap-x-2 md:gap-x-4">
      <template v-for="(route, index) in subRoutes">
        <Separator v-if="index !== 0" orientation="vertical" class="h-4 my-auto" />
        <router-link :to="{ name: route.name }" class="group p-1 font-bold" active-class="[&>span]:max-w-full">
          {{ formatRouteName(route.name as string) }}
          <span class="block mx-auto max-w-0 group-hover:max-w-full transition-[max-width] h-px bg-primary" />
        </router-link>
      </template>
    </div>
    <router-view />
  </MainLayout>
</template>
