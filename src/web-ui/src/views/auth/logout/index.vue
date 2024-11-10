<script setup lang="ts">
import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {LucideAlertCircle, LucideCheckCircle} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {useRouter} from "vue-router";

const router = useRouter();
const queryClient = useQueryClient();

const { mutate: doLogout, isSuccess, isPending, isError, error } = useMutation({
  mutationKey: ['auth', 'logout'],
  mutationFn: () => axios.post("/auth/logout"),
  onSuccess: () => {
    queryClient.removeQueries();
    router.push("/");
  },
});
doLogout();
</script>

<template>
  <div class="h-full grid place-content-center p-2">
    <Alert v-if="isSuccess">
      <LucideCheckCircle class="size-4" />
      <AlertTitle>Logout Successful</AlertTitle>
      <AlertDescription>
        You should be redirected shortly.
      </AlertDescription>
    </Alert>
    <Spinner v-if="isPending" />
    <Alert v-if="isError" variant="destructive">
      <LucideAlertCircle class="size-4" />
      <AlertTitle>Error during logout</AlertTitle>
      <AlertDescription>
        <p>{{ error }}</p>
        <div class="flex gap-2 justify-evenly">
          <router-link :to="{ name: 'home' }">
            <Button size="sm" variant="secondary">
              Home
            </Button>
          </router-link>
          <Button variant="destructive" size="sm" @click="doLogout">Retry</Button>
        </div>
      </AlertDescription>
    </Alert>
  </div>
</template>
