<script setup lang="ts">
import {motion} from "motion-v"

defineProps({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  bgGradient: {
    type: Boolean,
    default: false
  },
  bgGrid: {
    type: Boolean,
    default: false
  },
  spacing: {
    type: String,
    default: 'py-20 sm:py-32'
  },
  titleCenter: {
    type: Boolean,
    default: true
  },
  titleMaxWidth: {
    type: String,
    default: 'max-w-2xl'
  },
  titleSpacing: {
    type: String,
    default: 'mb-20'
  },
  contentMaxWidth: {
    type: String,
    default: 'max-w-7xl'
  },
  overflow: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section
      :id="id"
      :class="[
      'relative dark:bg-transparent',
      spacing,
      overflow,
      bgGradient ? 'before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:from-75% before:via-white/10 dark:before:via-transparent before:to-88% before:to-white dark:before:to-zinc-900 before:z-10' : ''
    ]"
  >
    <!-- Background grid pattern for testimonials section -->
    <div
        v-if="bgGrid"
        class="absolute inset-0 -z-10 landing-grid [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"
    />

    <div :class="['relative z-0 px-4 sm:px-6 lg:px-8 mx-auto', contentMaxWidth]">
      <!-- Title area -->
      <div v-if="title || description"
           :class="[titleCenter ? 'mx-auto' : '', titleMaxWidth, titleCenter ? 'md:text-center' : '']">
        <motion.div
            v-if="title || description"
            :initial="{ opacity: 0, y: 20 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.3 }"
            :class="['flex flex-col', titleCenter ? 'items-center justify-center space-y-4 text-center' : '', titleSpacing]"
        >
          <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{{ title }}</h2>
          <p v-if="description" class="max-w-[800px] text-zinc-500 dark:text-zinc-400 md:text-lg">
            {{ description }}
          </p>
        </motion.div>
      </div>

      <!-- Main content -->
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
/* Add any global section styles here */
</style>