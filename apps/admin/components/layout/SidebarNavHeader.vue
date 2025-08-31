<script setup lang="ts">
import { useSidebar } from '~/components/ui/sidebar'

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <NuxtLink to="/" class="mb-2 flex items-center self-center gap-2 py-2 font-medium">
        <svg
          class="w-6 text-primary" viewBox="0 0 24 24" stroke-linejoin="round" stroke-width="2"
          stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" fill="none"
        >
          <rect x="3" y="1" width="7" height="12" />
          <rect x="3" y="17" width="7" height="6" />
          <rect x="14" y="1" width="7" height="6" />
          <rect x="14" y="11" width="7" height="12" />
        </svg>
        <span class="text-xl font-bold tracking-wide">Famsub</span>
      </NuxtLink>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<style scoped>

</style>
