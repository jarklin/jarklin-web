<script setup lang="ts">
import {LucideLogOut} from "lucide-vue-next";
import {useApiConfigQuery} from "@/composables";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";

const apiConfig = useApiConfigQuery();
</script>

<template>
  <div class="grow" />
  <template v-if="apiConfig.data?.requires_auth">
    <Separator />
    <router-link :to="{ name: 'logout' }" class="mx-auto">
      <Button>
        <LucideLogOut class="inline-block h-5" /> Logout
      </Button>
    </router-link>
  </template>
</template>
