import {defineStore} from "pinia";
import type {Chat, Message} from "~~/app/core/entities/Message";

export const useMessagingStore = defineStore("messaging", () => {
  const baseMessages: Message[] = [
    {
      id: 1,
      name: "Vipoor",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vipoor&backgroundColor=7ed6df",
      preview: "Bonjour comment je re...",
      chats: [
        {id: 1, sender: "other", text: "Bonjour, comment je rejoins l'abonnement ?"},
        {id: 2, sender: "me", text: "Salut ! Tu dois suivre le lien d'invitation."},
      ],
    },
    {
      id: 2,
      name: "Il_birchino",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Birchino&backgroundColor=7ed6df",
      preview: "C'est la première fo...",
      chats: [
        {id: 3, sender: "other", text: "Bonjour"},
        {id: 4, sender: "other", text: "C'est la première fois que j'utilise ce service."},
        {id: 5, sender: "me", text: "Pas de souci, je peux t'aider !"},
      ],
    },
    {
      id: 3,
      name: "john_doe",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=John&backgroundColor=7ed6df",
      preview: "Bonjour donfreddy, vo...",
      chats: [
        {id: 6, sender: "other", text: "Bonjour donfreddy, voici comment partager :"},
        {id: 7, sender: "me", text: "Merci pour l'info, je vais suivre ça."},
      ],
    },
  ];
  const messages = ref<Message[]>(
    Array.from({length: 1})
      .flatMap((_, i) =>
        baseMessages.map((msg) => ({
          ...structuredClone(msg),
          id: i * 100 + msg.id,
          name: `${msg.name}_${i + 1}`,
          avatar: `${msg.avatar}&i=${i}`,
          chats: reactive(msg.chats.map((chat) => ({
            ...chat,
            id: i * 1000 + chat.id,
          }))),
        }))
      )
  );
  const selectedMessage = ref<Message | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const selectMessage = (message: Message) => {
    console.log("Message sélectionné :", message);
    selectedMessage.value = message;
    console.log(selectedMessage.value);
  };

  const sendMessage = (text: string) => {
    console.log("Sending message:", text);
    if (selectedMessage.value) {
      selectedMessage.value.chats.push({id: Date.now(), sender: "me", text} as Chat);
    }
  };

  return {
    messages,
    selectedMessage,
    loading,
    error,
    selectMessage,
    sendMessage,
  };
});