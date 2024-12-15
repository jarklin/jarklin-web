<script setup lang="ts">
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import ScrollProgressFix from "@/components/ScrollProgressFix.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideAlertCircle } from "lucide-vue-next";
import { MainLayout } from "@/layouts";
import { Button } from "@/components/ui/button";
</script>

<template>
  <ScrollProgressFix />
  <ErrorBoundary>
    <router-view />
    <template #fallback="{ error, resetBoundary }">
      <MainLayout class="grid place-items-center p-4">
        <Alert variant="destructive" class="max-w-screen-md">
          <LucideAlertCircle class="size-4" />
          <AlertTitle>
            Something went wrong
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
      </MainLayout>
    </template>
  </ErrorBoundary>
</template>
