<script setup lang="ts">
import {ref, nextTick} from "vue";
import type {Message} from "~~";

const props = defineProps<{
  selectedMessage: Message
}>();

const {sendMessage} = useMessagingStore();

const emit = defineEmits<(e: 'sendMessage', message: string) => void>();

const newMessage = ref('');
const messageTextarea = ref<HTMLTextAreaElement | null>(null);
const showEmojiPicker = ref(false);

// Common emojis for the simple picker
const commonEmojis = [
  "😊", "😂", "❤️", "👍", "😍",
  "🙏", "😭", "🤔", "🔥", "✨",
  "🥰", "😎", "🤣", "👏", "🎉"
];

// Adjust textarea height dynamically
const adjustTextareaHeight = () => {
  nextTick(() => {
    const textarea = messageTextarea.value;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  });
};

// Send message function
const sendMessage2 = () => {
  if (!newMessage.value.trim()) return;

  sendMessage(newMessage.value);
  newMessage.value = '';

  // Reset textarea height
  nextTick(() => {
    const textarea = messageTextarea.value;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  });

  // Hide emoji picker if it's open
  showEmojiPicker.value = false;
};

// Handle key presses in the textarea
const handleKeydown = (e: KeyboardEvent) => {
  // If Enter is pressed without Shift, send the message
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // Prevent default Enter behavior
    sendMessage2();
  }
  // If Shift+Enter is pressed, allow normal behavior (new line)
};

// Watch for input to adjust height
const onInput = () => {
  adjustTextareaHeight();
};

// Add emoji to the message
const addEmoji = (emoji: string) => {
  newMessage.value += emoji;
  // Focus back on textarea
  nextTick(() => {
    if (messageTextarea.value) {
      messageTextarea.value.focus();
      adjustTextareaHeight();
    }
  });
};

// Toggle emoji picker
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// Close emoji picker when clicking outside
const closeEmojiPicker = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (showEmojiPicker.value && !target.closest('.emoji-container')) {
    showEmojiPicker.value = false;
  }
};

// Add click event listener to document
onMounted(() => {
  document.addEventListener('click', closeEmojiPicker);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', closeEmojiPicker);
});

const chatContainer = ref<HTMLElement | null>(null);

// Watch for changes in the chats array
watch(() => props.selectedMessage.chats.length, async () => {
  // Wait for the DOM to update
  await nextTick();

  // Get the chat container element
  if (chatContainer.value) {
    // Scroll to the bottom of the container
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}, {flush: 'post'});
</script>

<template>
  <div class="w-full border-l border-gray-200">
    <!-- Header and previous content remains the same -->

    <!-- Chat container -->
    <div class="flex-1 p-4 max-h-[51vh] overflow-y-auto" ref="chatContainer">
      <!-- Existing chat messages -->
      <div class="bg-gray-100 text-sm p-4 w-3/4 my-4 inline-block rounded-t-xl rounded-br-xl">
        <!-- Your existing content -->
      </div>

      <TransitionGroup name="chat-fade" tag="div">
        <div v-for="(chat, index) in selectedMessage.chats" :key="chat.id"
             class="mb-4"
             :class="{'text-right': chat.sender === 'me'}">
          <p class="inline-block p-2 text-sm rounded-t-xl"
             :class="chat.sender === 'me' ? 'bg-blue-500 text-white rounded-bl-xl' : 'bg-gray-100 rounded-br-xl'">
            {{ chat.text }}
          </p>
        </div>
      </TransitionGroup>
    </div>

    <!-- Message input area with buttons -->
    <div class="border-t pt-4 px-4 border-gray-200">
      <!-- Emoji picker -->
      <div class="emoji-container relative mb-2" v-if="showEmojiPicker">
        <div
            class="bg-white p-2 rounded-lg shadow-lg border border-gray-200 absolute bottom-full left-0 z-10 w-64 mb-1">
          <div class="grid grid-cols-5 gap-2">
            <button
                v-for="emoji in commonEmojis"
                :key="emoji"
                @click="addEmoji(emoji)"
                class="text-xl hover:bg-gray-100 p-1 rounded transition-colors"
            >
              {{ emoji }}
            </button>
          </div>
        </div>
      </div>

      <!-- Input container with positioned buttons -->
      <div class="relative flex items-center">
        <!-- Emoji button -->
        <button
            @click.stop="toggleEmojiPicker"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            title="Insert emoji"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-smile">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" x2="9.01" y1="9" y2="9"/>
            <line x1="15" x2="15.01" y1="9" y2="9"/>
          </svg>
        </button>

        <!-- Textarea with padding for buttons -->
        <textarea
            ref="messageTextarea"
            v-model="newMessage"
            @keydown="handleKeydown"
            @input="onInput"
            placeholder="Écrivez votre message..."
            class="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            rows="1"
        ></textarea>

        <!-- Send button -->
        <button
            @click="sendMessage2"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-700"
            title="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-send">
            <path d="m22 2-7 20-4-9-9-4Z"/>
            <path d="M22 2 11 13"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: all 0.3s ease;
}

.chat-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.chat-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Add this to make textarea auto-expand smoothly */
textarea {
  min-height: 40px;
  transition: height 0.2s ease;
}
</style>