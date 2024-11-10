<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import { homepageElements } from "@/views/home/elements";
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
      <h1 class="text-2xl px-4"><component v-if="element.icon" :is="element.icon" class="inline-block" />  {{ element.displayName }}</h1>
      <component :is="element.component" v-bind="element.props" />
    </template>
  </template>
</template>
