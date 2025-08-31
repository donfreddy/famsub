<script setup lang="ts">
import {ref, nextTick} from "vue";
import type {Chat, Message} from "~~";

const props = defineProps<{
  selectedMessage: Message
}>()

const {sendMessage} = useMessagingStore()

const emit = defineEmits<(e: 'sendMessage', message: string) => void>()

const newMessage = ref('')
const messageTextarea = ref<HTMLTextAreaElement | null>(null);

// Adjust textarea height dynamically
const adjustTextareaHeight = () => {
  nextTick(() => {
    const textarea = messageTextarea.value
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  })
}

// Send message function
const sendMessage2 = () => {
  if (!newMessage.value.trim()) return

  sendMessage(newMessage.value)
  newMessage.value = ''

  // Reset textarea height
  nextTick(() => {
    const textarea = messageTextarea.value
    if (textarea) {
      textarea.style.height = 'auto'
    }
  })
}

// Handle key presses in the textarea
const handleKeydown = (e: KeyboardEvent) => {
  // If Enter is pressed without Shift, send the message
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault() // Prevent default Enter behavior
    sendMessage2()
  }
  // If Shift+Enter is pressed, allow normal behavior (new line)
  // This is the default browser behavior, so we don't need to do anything
}

// Watch for input to adjust height
const onInput = () => {
  adjustTextareaHeight()
}

// This is a ref to the chat container element
const chatContainer = ref<HTMLElement | null>(null)

// Watch for changes in the chats array
watch(() => props.selectedMessage.chats.length, async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}, {flush: 'post'})

const isLastMessage = (sender: string, chat: Chat) => {
  const userMessages = props.selectedMessage.chats.filter(c => c.sender === sender);
  return userMessages[userMessages.length - 1]?.id === chat.id;
};
</script>

<template>
  <div class="w-full">

    <!-- En-tête de la conversation -->
    <div class="border-b px-4 py-2 border-gray-200">
      <h2 class="text-xl font-semibold">{{ selectedMessage.name }}</h2>
    </div>

    <div class="border-b px-4 py-2 border-gray-200 flex items-center justify-between">
      <div class="inline-flex justify-center items-center">
        <UAvatar src="https://www.svgrepo.com/show/349511/spotify.svg" alt="User Avatar" class="mr-3"/>
        <div class="flex flex-col">
          <span class="ext-sm font-semibold">Spotify</span>
          <span class="text-xs font-medium text-gray-400">Souscrit le 22 février 2025</span>
        </div>
      </div>
      <div>
        <UButton
            variant="link"
            label="Gérer"
            icon="i-uil-angle-right-b"
            to="/app/offer/7d22fd01-d23a-4001-9a77-92dc90202474"
            class="cursor-pointer"
            trailing/>
      </div>
    </div>

    <!-- Liste des messages -->
    <div class="flex-1 p-4 max-h-[51vh] overflow-y-auto" ref="chatContainer">
      <div class="flex items-end my-4">
        <UAvatar src="https://www.svgrepo.com/show/349511/spotify.svg" alt="User Avatar" class="mr-2" size="sm"/>
        <div class="bg-gray-100 text-sm p-4 w-3/4  inline-block rounded-t-xl rounded-br-xl">
          <p>Bonjour donfreddy, voici comment partager :</p>
          <br/>
          <p>Vous devez <strong>envoyer un lien d'invitation à votre co-abonné</strong> (il n'y a pas de partage
            d'identifiants).</p>
          <br/>
          <p>Comment faire ?</p>
          <br/>
          <p class="pl-10">• Rendez-vous sur votre compte. <br/>
            • Dans la gestion de votre abonnement,
            <strong>trouvez la section pour envoyer l'invitation par email</strong>. <br/>
            • Envoyer l'invitation a
            <ULink class="text-primary-400 underline cursor-pointer">l'addresse email indiquee</ULink>
            sur votre partage.
          </p>
          <br/>
          <p>
            Vos co-abonnés devront confirmer l'adresse postale insérée sur
            votre compte. Merci de renseigner cette adresse ci-dessous.
          </p>
          <br/>
          <ULink class="text-primary-400 underline cursor-pointer">
            Comment partager Spotify ?
          </ULink>

        </div>

      </div>
      <TransitionGroup name="chat-fade" tag="div">
        <div v-for="chat in selectedMessage.chats" :key="chat.id"
             :class="{'text-right': chat.sender === 'me'}"
             class="mb-4">
          <div class="flex items-end"
               :class="{'justify-end': chat.sender === 'me', 'justify-start': chat.sender !== 'me'}"
               :key="chat.id">
            <UAvatar v-if="chat.sender !== 'me'" :src="selectedMessage.avatar"
                     alt="User Avatar" class="mr-2"
                     size="sm"/>
            <p class="inline-block p-2  text-sm rounded-t-xl"
               :class="chat.sender === 'me' ?  'bg-blue-500 text-white rounded-bl-xl' : 'bg-gray-100 rounded-br-xl'">
              {{ chat.text }}
            </p>
            <UAvatar v-if="chat.sender === 'me' "
                     src="https://api.dicebear.com/9.x/avataaars/svg?seed=Yvan&backgroundColor=7ed6df" alt="User Avatar"
                     class="ml-2" size="sm"/>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Message input area -->

    <div class="flex items-center  py-2 px-3 bg-gray-50 dark:bg-gray-700">
      <button type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"></path>
        </svg>
      </button>
      <button type="button"
              class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                clip-rule="evenodd"></path>
        </svg>
      </button>
      <textarea id="chat" rows="1"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref="messageTextarea"
                v-model="newMessage"
                @keydown="handleKeydown"
                @input="onInput"
                placeholder="Écrivez votre message..."
      >
      </textarea>
      <button
              @click="sendMessage2"
              class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
        <svg class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
      </button>
    </div>
    <!--    <div class="border-t pt-4 px-4 flex items-center border-gray-200 ">
          <UTextarea
              size="xl"
              ref="messageTextarea"
              v-model="newMessage"
              @keydown="handleKeydown"
              @input="onInput"
              placeholder="Écrivez votre message..."
              color="neutral"
              class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              :rows="1"
              :maxrows="4"
              highlight
          />
          <button @click="sendMessage2" class="ml-2 bg-pink-500 text-white px-4 py-2 rounded-lg">Envoyer</button>
        </div>-->
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
</style>

