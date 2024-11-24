<script setup lang="ts">
import { LucideInfo, LucideLogOut } from "lucide-vue-next";
import {useApiConfigQuery} from "@/composables";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const apiConfig = useApiConfigQuery();
</script>

<template>
  <Alert type="warning">
    <LucideInfo class="size-4" />
    <AlertTitle>
      Settings are not synced
    </AlertTitle>
    <AlertDescription>
      As of now. There exists no system of syncing these settings between devices or browsers.
      This means that everything you configure here will only be applied to this specific browser and device.
    </AlertDescription>
  </Alert>
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
