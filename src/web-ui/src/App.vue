<script setup lang="ts">
import ScrollProgressFix from "@/components/ScrollProgressFix.vue";
import { SimpleLayout } from "@/layouts";
import { useMediaQuery } from "@/composables";
import { Spinner } from "@/components/ui/spinner";
import { provide, watch } from "vue";
import { KEY_MEDIA_DATA } from "@/keys.ts";
import { AxiosError, HttpStatusCode } from "axios";
import { useRouter } from "vue-router";


const router = useRouter();
const mediaQuery = useMediaQuery();

provide(KEY_MEDIA_DATA, mediaQuery.data);

watch(() => mediaQuery.error, (err) => {
  if (err instanceof AxiosError && err.status === HttpStatusCode.Unauthorized && router.currentRoute.value.name !== '/auth/login/') {
    router.push({ name: '/auth/login/', query: { redirect: router.currentRoute.value.fullPath } });
    return;
  }
  throw err;
});
</script>

<template>
  <ScrollProgressFix />
  <SimpleLayout v-if="mediaQuery.isFetching" class="grid place-items-center">
    <Spinner class="size-10" />
  </SimpleLayout>
  <router-view v-else-if="mediaQuery.isSuccess" />
</template>
