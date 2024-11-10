<script setup lang="ts">
import {LucideSearch} from "lucide-vue-next";
import {Input} from "@/components/ui/input";
import {ref} from "vue";
import {onStartTyping, useUrlSearchParams, watchDebounced} from "@vueuse/core";

const urlSearchParams = useUrlSearchParams<{ query?: string }>("hash");

const inputQuery = ref<string>(urlSearchParams.query ?? "");
const inputRef = ref();

const filterQuery = ref<string>(urlSearchParams.query ?? "");

watchDebounced(inputQuery, () => {
  filterQuery.value = inputQuery.value;
  urlSearchParams.query = inputQuery.value;
}, { debounce: 300, maxWait: 5000 });

onStartTyping(() => {
  if (document.activeElement !== inputRef.value) {
    // todo: set focus to the input-field
  }
});
</script>

<template>
  <div class="max-w-screen-2xl mx-auto p-2">
    <div class="max-w-2xl mx-auto relative items-center">
      <Input v-model.trim="inputQuery" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 grid place-content-center px-2">
        <LucideSearch class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div>
      {{ filterQuery }}
    </div>
  </div>
</template>
