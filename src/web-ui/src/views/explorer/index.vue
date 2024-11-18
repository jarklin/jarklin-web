<script setup lang="ts">
import {useRoute} from "vue-router";
import {useMediaQuery} from "@/composables";
import {computed} from "vue";
import {getAllParentPaths, getBasename, getParentPath} from "@/lib";
import {LucideFolder, LucideFolderUp} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {MediaCard} from "@/components/composed/mediacard";
import {useMediaPath} from "@/composables/useMediaPath";
import {MainLayout} from "@/layouts";
import {Separator} from "@/components/ui/separator";

const route = useRoute();

const mediaQuery = useMediaQuery();

const currentLocation = useMediaPath();

const subDirectories = computed(() => {
  if (!mediaQuery.isSuccess) return;
  const pathNames = Array.from(new Set(mediaQuery.data.flatMap(entry => getAllParentPaths(entry.path))));
  return pathNames
      .filter(path => !!path.length)
      .map(path => ({
        name: getBasename(path),
        path: path,
        parent: getParentPath(path),
      }))
      .filter(entry => entry.parent === currentLocation.value);
});

const localMedia = computed(() => {
  if (!mediaQuery.isSuccess) return;
  return mediaQuery.data
      .filter(entry => getParentPath(entry.path) === currentLocation.value);
});
</script>

<template>
  <MainLayout class="p-2">
    <div class="flex flex-wrap gap-x-2 gap-y-1 items-baseline">
      <router-link v-if="!!currentLocation.length" :to="{ name: route.name, params: { mediaPath: getParentPath(currentLocation) } }">
        <Button size="icon">
          <LucideFolderUp />
        </Button>
      </router-link>
      <Button v-else disabled size="icon" class="">
        <LucideFolderUp />
      </Button>

      <router-link v-for="directory in subDirectories" :key="directory.path" :to="{ name: route.name, params: { mediaPath: directory.path } }">
        <Button size="icon">
          <LucideFolder />
          {{ directory.name }}
        </Button>
      </router-link>
    </div>
    <Separator class="my-1" />
    <div class="flex flex-wrap gap-4">
      <router-link v-for="media in localMedia" :key="media.path" :to="{ name: 'media-details', params: { mediaPath: media.path } }" class="h-80">
        <MediaCard :media="media" />
      </router-link>
    </div>
  </MainLayout>
</template>
