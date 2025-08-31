<template>
  <div>

  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>

<!--
<script setup lang="ts">
import type { Message } from "~~/types";

const props = defineProps<{
  selectedMessage: Message
}>();

const { sendMessage } = useMessagingStore();

const handleSendMessage = (text: string) => {
  sendMessage(text);
};
</script>

<template>
  <div class="w-full border-l border-gray-200">
    &lt;!&ndash; En-tête de la conversation &ndash;&gt;
    <div class="border-b px-4 py-2 border-gray-200">
      <h2 class="text-xl font-semibold">{{ selectedMessage.name }}</h2>
    </div>

    &lt;!&ndash; User/Service Info &ndash;&gt;
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

    &lt;!&ndash; Chat Messages &ndash;&gt;
    <MessagesList :messages="selectedMessage.chats">
      <template #intro>
        <div class="bg-gray-100 text-sm p-4 w-3/4 my-4 inline-block rounded-t-xl rounded-br-xl">
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
      </template>
    </MessagesList>

    &lt;!&ndash; Message Input &ndash;&gt;
    <MessagingMessageInput @send="handleSendMessage" placeholder="Écrivez votre message..." />
  </div>
</template>-->
