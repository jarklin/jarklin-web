<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {MainLayout} from "@/layouts";
import { homepageElements } from "./home/elements.ts";
import { useTitle } from "@vueuse/core";

useTitle("Jarklin - Home");
</script>

<template>
  <MainLayout class="p-2 flex flex-col gap-2">
    <div class="grid gap-2 justify-center" :style="{ gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))' }">
      <router-link v-for="element in homepageElements" :key="element.displayName" :to="element.location">
        <Button variant="secondary" size="lg" class="w-full px-2">
          <component v-if="element.icon" :is="element.icon" class="inline-block" />
          <span class="grow text-left whitespace-normal line-clamp-2">
            {{ element.displayName }}
          </span>
        </Button>
      </router-link>
    </div>
    <template v-for="element in homepageElements" :key="element.displayName">
      <component v-if="element.component" :is="element.component" v-bind="element.props" :element="element" />
    </template>
  </MainLayout>
</template>
