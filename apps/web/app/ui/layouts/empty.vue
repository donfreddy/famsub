<script setup lang="ts">
import {SpeedInsights} from "@vercel/speed-insights/nuxt"
</script>

<template>
  <main>
    <slot/>
    <SpeedInsights/>
  </main>
</template>