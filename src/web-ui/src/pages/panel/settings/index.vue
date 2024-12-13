<script setup lang="ts">
import { LucideInfo, LucideLogOut, LucideMonitorCheck, LucideMonitorX, LucideSmartphone } from "lucide-vue-next";
import { useApiConfigQuery, useWebSettings } from "@/composables";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Setting, SettingDescription, SettingTitle } from "@/components/ui/setting";
import { Switch } from "@/components/ui/switch";
import { useTitle } from "@vueuse/core";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const apiConfig = useApiConfigQuery();
const webSettings = useWebSettings();

useTitle("Jarklin - Settings");
</script>

<template>
  <Alert type="warning">
    <LucideInfo class="size-4" />
    <AlertTitle>
      Settings are not synced
    </AlertTitle>
    <AlertDescription class="text-muted-foreground">
      As of now. There exists no system of syncing these settings between devices or browsers.
      This means that everything you configure here will only be applied to this specific browser and device.
    </AlertDescription>
  </Alert>
  <Separator label="Optimization" />
  <Setting>
    <Switch v-model:checked="webSettings.optimizedMedia" />
    <SettingTitle>
      JIT Media Optimization
    </SettingTitle>
    <SettingDescription class="text-muted-foreground">
      The Server allows just-in-time optimization of supported media.
      This reduces the required amount of data that has to be downloaded in exchange for a small decrease in quality of the media.
    </SettingDescription>
  </Setting>
  <Separator label="Media Details" />
  <Setting>
    <Switch v-model:checked="webSettings.animatedPreview" />
    <SettingTitle>
      Animated Preview
    </SettingTitle>
    <SettingDescription class="text-muted-foreground">
      When seeing the details of a media, an animated preview is shown in the background.
      Either this irritates you or the site takes longer to load.
      Here you can disable it and get a static preview image instead.
    </SettingDescription>
  </Setting>
  <Separator label="Manga Reader" />
  <Setting>
    <ToggleGroup type="single" variant="outline" size="sm" class="flex-col" v-model:model-value="webSettings.mangaAutoFullscreen">
      <ToggleGroupItem value="on">
        <LucideMonitorCheck />
      </ToggleGroupItem>
      <ToggleGroupItem value="mobile">
        <LucideSmartphone />
      </ToggleGroupItem>
      <ToggleGroupItem value="off">
        <LucideMonitorX />
      </ToggleGroupItem>
    </ToggleGroup>
    <SettingTitle>
      Auto Fullscreen
    </SettingTitle>
    <SettingDescription class="text-muted-foreground">
      <p>
        Whether to automatically open fullscreen when beginning to read in manga-mode.
      </p>
      <Separator class="my-0.5" />
      <p>
        <template v-if="webSettings.mangaAutoFullscreen === 'on'">
          The window will go into fullscreen when you begin to read in manga-mode.
        </template>
        <template v-else-if="webSettings.mangaAutoFullscreen === 'mobile'">
          On Mobile, the window will go into fullscreen when you begin to read in manga-mode.
        </template>
        <template v-else-if="webSettings.mangaAutoFullscreen === 'off'">
          The window won't go automatically into fullscreen.
        </template>
      </p>
    </SettingDescription>
  </Setting>
  <div class="grow" />
  <template v-if="apiConfig.data?.requires_auth">
    <Separator />
    <div class="grid place-content-center">
      <router-link :to="{ name: '/auth/logout/' }">
        <Button>
          <LucideLogOut class="inline-block h-5" /> Logout
        </Button>
      </router-link>
    </div>
  </template>
</template>
