<script setup lang="ts">
const {messages, selectMessage} = useMessagingStore()
</script>

<template>
  <div>
    <div v-for="message in messages" :key="message.id" class="border-b border-gray-200">
      <MessagingMessageItem :message="message" @click="selectMessage(message)"/>
    </div>
  </div>
</template>


