<template>
  <div class="h-screen flex items-center justify-center overlay">
    <div class="gradient"/>

    <UButton
        icon="i-lucide-chevron-left"
        to="/"
        size="xl"
        color="neutral"
        variant="subtle"
        class="absolute left-4 top-4 md:left-8 md:top-8 rounded-full"
    />

    <slot/>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'dark:bg-zing-950'
  }
})
</script>

<style scoped>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgb(249, 115, 22, 0.25) 0, #FFF 100%);
}

.dark {
  .gradient {
    background: radial-gradient(50% 50% at 50% 50%, rgb(251, 146, 60, 0.1) 0, #09090b 100%);
  }
}

.overlay {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, #e4e4e7 0.5px, transparent 0.5px),
  linear-gradient(to bottom, #e4e4e7 0.5px, transparent 0.5px);
}

.dark {
  .overlay {
    background-image: linear-gradient(to right, #18181b 0.5px, transparent 0.5px),
    linear-gradient(to bottom, #18181b 0.5px, transparent 0.5px);
  }
}
</style>