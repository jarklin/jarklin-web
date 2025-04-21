<script setup lang="ts">
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideAlertCircle } from "lucide-vue-next";
import { SimpleLayout } from "@/layouts";
import { Button } from "@/components/ui/button";
import App from "@/App.vue";
</script>

<template>
  <ErrorBoundary>
    <template #default>
      <App />
    </template>
    <template #fallback="{ error, resetBoundary }">
      <SimpleLayout class="grid place-items-center p-4">
        <Alert variant="destructive" class="max-w-screen-md">
          <LucideAlertCircle class="size-4" />
          <AlertTitle>
            Something went horribly wrong
          </AlertTitle>
          <AlertDescription>
            {{ error.name }}: {{ error.message }}
          </AlertDescription>
          <div>
            <Button variant="secondary" size="sm" @click="resetBoundary" class="float-right">
              Try Again
            </Button>
          </div>
        </Alert>
      </SimpleLayout>
    </template>
  </ErrorBoundary>
</template>
