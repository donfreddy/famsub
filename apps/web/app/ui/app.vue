<script setup>
import {VueQueryDevtools} from '@tanstack/vue-query-devtools'

// usePwaInstall()
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)"/>

    <NuxtLayout>
      <NuxtPage/>
      <VueQueryDevtools/>
    </NuxtLayout>
  </UApp>
</template>
