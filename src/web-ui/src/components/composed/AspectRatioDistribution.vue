<script setup lang="ts">
import { type LucideIcon, LucideRectangleHorizontal, LucideRectangleVertical, LucideSquare } from "lucide-vue-next";
import { computed } from "vue";

const { values } = defineProps<{
  values: number[]
}>();

const icons = new Map<number, LucideIcon>([
  [9/16, LucideRectangleVertical],
  [1/1, LucideSquare],
  [16/9, LucideRectangleHorizontal],
]);

const minValue = computed(() => Math.min(...icons.keys(), ...values));
const maxValue = computed(() => Math.max(...icons.keys(), ...values));
const minMaxDiff = computed(() => maxValue.value - minValue.value);

function valueToPercent(value: number): number {
  return (value - minValue.value) / minMaxDiff.value;
}
</script>

<template>
  <div class="size-full px-4 bg-secondary rounded-md">
    <div class="size-full relative">
      <template v-for="[value, icon] in icons.entries()" :key="value">
        <component
            :is="icon"
            class="absolute -translate-x-1/2"
            :style="{ left: `${valueToPercent(value)*100}%` }"
        />
      </template>
      <template v-for="value in values" :key="value">
        <div
            class="absolute -translate-x-1/2 w-0.5 h-full"
            :style="{ left: `${valueToPercent(value)*100}%`, backgroundColor: `hsl(var(--primary) / ${1 / values.length})` }"
        />
      </template>
    </div>
  </div>
</template>
