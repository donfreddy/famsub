<script setup lang="ts">
import {motion} from "motion-v"

</script>

<template>
  <motion.div
    class="flex items-center shrink-0"
    :animate="{
      x: ['0%', '-100%'],
      transition: {
        duration: 30,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    }"
  >
    <slot/>
  </motion.div>

  <motion.div
    class="flex items-center shrink-0"
    :animate="{
      x: ['0%', '-100%'],
      transition: {
        duration: 30,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    }"
  >
    <slot/>
  </motion.div>
</template>
