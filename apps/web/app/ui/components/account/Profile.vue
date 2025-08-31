<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="">
    <div class="w-full md:w-1/2 mb-6">
      <h1 class="text-lg font-semibold">{{ title }}</h1>
      <div class="text-sm" v-if="description">{{ description }}</div>
    </div>

    <div class="section-content">
      <slot></slot>
    </div>

    <USeparator class="my-8"/>
  </div>
</template>
