<script setup lang="ts">
import {LucideFolderClosed, type LucideIcon, LucideLibraryBig, LucideTag} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import type {RouteLocationRaw} from "vue-router";

interface HomepageElement {
  displayName: string
  location: RouteLocationRaw
  icon?: LucideIcon
  component?: string
}

const homepageElements: HomepageElement[] = [
  {
    displayName: "Explorer",
    icon: LucideFolderClosed,
    location: { name: 'explorer', params: { mediaPath: '' } },
  },
  {
    displayName: "Tags",
    icon: LucideTag,
    location: { name: 'tags' },
  },
  {
    displayName: "Collections",
    icon: LucideLibraryBig,
    location: { name: 'collections' },
  },
]
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center p-2">
    <router-link v-for="element in homepageElements" :key="element.displayName" :to="element.location">
      <Button variant="secondary" size="lg">
        <component v-if="element.icon" :is="element.icon" class="inline-block" />
        {{ element.displayName }}
      </Button>
    </router-link>
  </div>
  <template v-for="element in homepageElements" :key="element.displayName">
    <template v-if="element.component">
      <Separator />
      <h1>{{ element.displayName }}</h1>
      <component :is="element.component" />
    </template>
  </template>
</template>
