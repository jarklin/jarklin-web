<script setup lang="ts">
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import { useTitle, useUrlSearchParams } from "@vueuse/core";
import axios, {AxiosError, HttpStatusCode} from "axios";
import jarklinIconSrc from "@/assets/jarklin-special.svg";
import {useRouter} from "vue-router";
import {SimpleLayout} from "@/layouts";  // special-logo. shorter and not rounded

const router = useRouter();

const queryClient = useQueryClient();
const searchParams = useUrlSearchParams<{redirect?: string}>("hash");

const { mutate: doLogin, isPending, isError, error } = useMutation({
  mutationKey: ['auth', 'login'],
  mutationFn: (formData: FormData) => axios.post("/auth/login", formData),
  onSuccess: () => {
    queryClient.removeQueries();
    router.push(searchParams.redirect ?? "/");
  },
});

function handleSubmit(event: Event) {
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  doLogin(formData);
}

useTitle("Jarklin - Login");
</script>

<template>
  <SimpleLayout class="grid place-content-center text-xl gap-2 text-center p-2">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-1 max-w-[90vw]">
      <img class="w-full rounded-sm" :src="jarklinIconSrc" alt=""/>
      <div v-if="isError && (error instanceof AxiosError && error.response?.status == HttpStatusCode.Unauthorized)" class="px-1 bg-white text-red-500 text-center rounded-sm">
        Bad Credentials Provided
      </div>
      <div v-else-if="isError" class="!bg-white text-red-500 text-center rounded-sm">
        <p class="text-xl">Login Failed for some Reason</p>
        <p class="opacity-50 text-xs">({{ (error as Error).name }}: {{ (error as Error).message }})</p>
      </div>
      <input
        required type="text" name="username"
        class="rounded-sm px-1 py-px !bg-white text-black disabled:cursor-not-allowed disabled:text-black/50"
        placeholder="Username"
        :disabled="isPending"
        enterKeyHint="next"
      />
      <input
        required type="password" name="password"
        class="rounded-sm px-1 py-px !bg-white text-black disabled:cursor-not-allowed disabled:text-black/50"
        placeholder="Password"
        :disabled="isPending"
        enterKeyHint="done"
      />
      <input
        type="submit"
        class="rounded-t-sm rounded-b-lg !bg-white text-black hover:cursor-pointer disabled:cursor-not-allowed disabled:text-black/50"
        :disabled="isPending"
        value="Login"
      />
    </form>
  </SimpleLayout>
</template>
