<template>
  <Navbar/>
  <main class="">
    <UContainer>
      <slot/>
    </UContainer>
    <SpeedInsights/>
  </main>
  <Footer/>
</template>
<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>