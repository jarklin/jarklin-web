<script setup lang="ts">
import {useProblemsQuery} from "@/composables";
import {Separator} from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideCircleCheck, LucideServerCrash } from "lucide-vue-next";

const problemsQuery = useProblemsQuery();
</script>

<template>
  <div v-if="problemsQuery.isPending"></div>
  <Alert v-else-if="!problemsQuery.data!.length">
    <LucideCircleCheck class="size-4" />
    <AlertTitle>
      Nothing to worry about.
    </AlertTitle>
    <AlertDescription class="text-muted-foreground">
      If some media were recognized but could not be processed, this will be displayed here.
      Fortunately for you, no problems were detected.
    </AlertDescription>
  </Alert>
  <template v-else>
    <Alert>
      <LucideServerCrash class="size-4" />
      <AlertTitle>
        Some Media could not be processed
      </AlertTitle>
      <AlertDescription class="text-muted-foreground">
        Some media was recognised but could not be processed.
        This is most likely not your fault and you probably won't be able to change anything.
        <br/>
        See here the details.
      </AlertDescription>
    </Alert>
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
