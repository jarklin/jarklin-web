<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import { homepageElements } from "@/views/home/elements";
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2 justify-center p-2">
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
    <div v-if="element.component" class="p-2">
      <Separator />
      <h1 class="text-2xl">
        <component v-if="element.icon" :is="element.icon" class="inline-block" />
        {{ element.displayName }}
      </h1>
      <component :is="element.component" v-bind="element.props" />
    </div>
  </template>
</template>
