<script setup lang="ts">
import {LucideFolderClosed, LucideLibraryBig, LucideTag} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center p-2">
    <router-link :to="{ name: 'explorer', params: { mediaPath: '' } }">
      <Button variant="secondary" size="lg">
        <LucideFolderClosed class="inline-block" /> Explorer
      </Button>
    </router-link>
    <router-link :to="{ name: 'tags' }">
      <Button variant="secondary" size="lg">
        <LucideTag class="inline-block" /> Tags
      </Button>
    </router-link>
    <router-link :to="{ name: 'collections' }">
      <Button variant="secondary" size="lg">
        <LucideLibraryBig class="inline-block" /> Collections
      </Button>
    </router-link>
  </div>
  <Separator />
</template>
