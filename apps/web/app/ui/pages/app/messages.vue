<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

const links = [
  {label: "Home", to: "/app"},
  {label: "Messages", to: "/app/messages"}
];

const items = ref([
  {
    label: 'Messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    slot: 'messaging'
  },
  {
    label: 'Notifications',
    icon: 'i-heroicons-bell',
    slot: 'notification'
  }
])

const {messages, selectMessage} = useMessagingStore()
const {selectedMessage} = storeToRefs(useMessagingStore());
</script>


<template>
  <div class="pt-20">
    <UBreadcrumb :items="links"/>

    <div class="min-h-screen mx-auto py-8">
      <UTabs orientation="horizontal" variant="link" :items="items" class="w-full">

        <template #messaging>
          <div class="flex w-full border border-gray-200 mx-auto rounded-lg mt-6">
            <div :class="selectedMessage ? 'w-1/3' : 'w-full'" class="max-h-[70vh] overflow-y-auto transition-all duration-300">
              <MessagingMessageList @selectMessage="selectMessage" />
            </div>

            <div v-if="selectedMessage" class="w-2/3 border-l border-gray-200 transition-all duration-300">
              <MessagingChatBox :selectedMessage="selectedMessage" />
            </div>
          </div>
        </template>

        <template #notification>
          <div class="flex items-center justify-center h-96">
            <div class="text-center">
              <i class="i-heroicons-bell text-9xl text-gray-300"></i>
              <h2 class="text-2xl font-semibold mt-4">Notifications</h2>
              <p class="text-gray-500">You have no notifications</p>
            </div>
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>