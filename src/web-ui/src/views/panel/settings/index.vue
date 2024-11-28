<script setup lang="ts">
import { LucideInfo, LucideLogOut } from "lucide-vue-next";
import {useApiConfigQuery} from "@/composables";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useWebSettings } from "@/composables/useWebSettings.ts";
import { Setting, SettingDescription, SettingTitle } from "@/components/ui/setting";
import { Checkbox } from "@/components/ui/checkbox";

const apiConfig = useApiConfigQuery();
const webSettings = useWebSettings();
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
  <Separator label="Optimization" />
  <Setting>
    <Checkbox v-model:checked="webSettings.optimizedMedia" />
    <SettingTitle>
      JIT Media Optimization
    </SettingTitle>
    <SettingDescription>
      The Server allows just-in-time optimization of supported media.
      This reduces the required amount of data that has to be downloaded in exchange for a small decrease in quality of the media.
    </SettingDescription>
  </Setting>
  <div class="grow" />
  <template v-if="apiConfig.data?.requires_auth">
    <Separator />
    <div class="grid place-content-center">
      <router-link :to="{ name: 'logout' }">
        <Button>
          <LucideLogOut class="inline-block h-5" /> Logout
        </Button>
      </router-link>
    </div>
  </template>
</template>
