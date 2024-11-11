<script setup lang="ts">
import {useProblemsQuery} from "@/composables";
import {Separator} from "@/components/ui/separator";

const problemsQuery = useProblemsQuery();
</script>

<template>
  <div v-if="problemsQuery.isPending"></div>
  <p v-else-if="!problemsQuery.data!.length">
    If some Media could be detected but not processed, it would be displayed here.
    Lucky for you no problems were detected.
  </p>
  <template v-else>
    <p>Some Media could not be processed. See here the details.</p>
    <Separator :label="`${problemsQuery.data!.length} Problem(s)`" class="my-2" />
    <div class="grow flex flex-col gap-y-2">
      <div v-for="problem in problemsQuery.data" class="group font-mono leading-none p-2 rounded-md text-sm flex flex-col gap-y-1 border border-input">
        <p class="text-primary">{{ problem.file }}</p>
        <Separator />
        <details>
          <summary class="cursor-pointer">{{ problem.type }}: {{ problem.description }}</summary>
          <pre class="text-sm mt-1 border border-input bg-accent p-1 rounded-md overflow-x-scroll">{{ problem.traceback }}</pre>
        </details>
      </div>
    </div>
  </template>
</template>
