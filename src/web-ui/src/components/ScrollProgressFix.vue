<!--
on mobile. if the user flips the phone the height of the document changes
but where you are shouldn't change (it does, because the actual height of the document may/will change)
that's the purpose of this component.
if the orientation changes it calculated where the user currently is and scrolls to that position after a short delay
-->

<script setup lang="ts">
import { useEventListener } from "@vueuse/core";

function getPageHeight() {
  return Math.max(
      document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,
      document.documentElement.scrollHeight, document.documentElement.offsetHeight,
  );
}

useEventListener("orientationchange", () => {
  const startOffsetY = window.scrollY;
  const startPageHeight = getPageHeight();
  const percentageScrolled = startOffsetY / startPageHeight;
  setTimeout(() => {
    const pageHeight = getPageHeight();
    const scrollOffsetY = percentageScrolled * pageHeight;
    document.documentElement.scrollTo({ left: 0, top: scrollOffsetY, behavior: "instant" });
  }, 100);
});
</script>

<template>

</template>
