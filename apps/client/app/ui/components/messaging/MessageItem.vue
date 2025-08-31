<script setup lang="ts">
import type {Message} from "~~";

const props = defineProps<{
  message: Message
}>()

const {selectedMessage} = storeToRefs(useMessagingStore());
</script>

<template>
  <div class="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-all duration-150"
       :class="{'bg-gray-50': selectedMessage?.id === message.id}">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center">
        <UAvatar :src="message.avatar" alt="Avatar" size="3xl" class="mr-3"/>
        <div class="flex flex-col">
          <div class="inline-flex items-center">
            <h3 class="font-semibold">{{ message.name }}</h3>
            <span class="text-gray-300 ml-2">- Spotify</span>
          </div>
          <div class="inline-flex items-center text-sm justify-center">
            <p class="truncate">{{ message.preview }}</p>
            <UChip size="xs" color="neutral" class="mx-2"/>
            <span>2 heures</span>
          </div>
        </div>
      </div>
      <UIcon
          v-if="selectedMessage?.id === message.id"
          name="i-uil-angle-right-b" size="xl"/>
    </div>
  </div>
</template>