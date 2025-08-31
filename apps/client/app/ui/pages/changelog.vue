<script setup lang="ts">
import {format} from 'date-fns';

const {data: page} = await useAsyncData('changelog', () => queryCollection('changelog').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const typeClasses: Record<string, string> = {
  New: 'text-green-700 from-green-200 to-green-100',
  Feature: 'text-blue-700 from-blue-200 to-blue-100',
  Bugfix: 'text-red-700 from-red-200 to-red-100',
  Fix: 'text-red-700 from-red-200 to-red-100',
  Improvement: 'text-indigo-700 from-indigo-200 to-indigo-100',
  Enhancement: 'text-indigo-700 from-indigo-200 to-indigo-100',
  Breaking: 'text-orange-700 from-orange-200 to-orange-100',
  Security: 'text-purple-700 from-purple-200 to-purple-100',
  Performance: 'text-yellow-700 from-yellow-200 to-yellow-100',
  Documentation: 'text-gray-700 from-gray-200 to-gray-100'
}

function formatDate(date: string): string {
  return format(new Date(date), 'MMMM dd, yyyy');
}
</script>

<template>
  <section class="w-full max-w-5xl px-2 py-6 md:py-12 mt-34 mx-auto text-center">
    <h1 class="text-3xl font-bold">{{ page?.title }}</h1>
    <p class="mt-3 text-lg text-gray-600 md:text-xl">{{ page?.description }}</p>
  </section>

  <section class="px-2 py-12 md:mt-12 mb-34 bg-gradient-to-b from-gray-50 to-white">
    <ul class="relative w-full max-w-5xl mx-auto">
      <span class="absolute bottom-0 left-0 hidden w-1 rounded bg-gray-200/60 top-3 translate-x-2 md:block"
            aria-hidden="true"></span>

      <li
        v-for="(entry, index) in page?.releases"
        :key="index"
        :class="['flex flex-col items-start', index !== 0 ? 'mt-20' : '', 'md:flex-row']"
      >
        <h3 class="flex items-center w-full mb-3 space-x-3 md:w-1/3">
          <span class="z-10 hidden block w-5 h-5 bg-white border-4 border-gray-300 rounded-full md:block"></span>
          <time :datetime="entry.date" class="text-xl font-semibold tracking-tight text-gray-800">
            {{ formatDate(entry.date) }}
          </time>
        </h3>

        <div class="w-full space-y-2 md:w-2/3">
          <div v-for="(item, idx) in entry.changes" :key="idx">
            <UBadge
              :label="item.type"
              variant="soft"
              size="md"
              class="mb-0.5 ml-1 font-medium rounded-full bg-gradient-to-br"
              :class="typeClasses[item.type] || 'bg-gray-200 text-gray-700'"
            />
            <p v-for="(text, idx) in item.texts" :key="idx" class="text-gray-700 text-md">
              • {{ text }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>


<style scoped>

</style>
