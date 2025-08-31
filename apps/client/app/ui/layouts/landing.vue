<template>
  <LandingNavbar/>
  <main class="">
      <slot/>
    <SpeedInsights/>
  </main>
  <LandingFooter/>
</template>
<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>