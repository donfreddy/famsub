<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const hasChanges = ref(false);

function saveContactChanges() {
  // Implementation for saving contact changes
  const toast = useToast();
  toast.add({
    title: 'Success',
    description: 'Your contact information was saved successfully.',
    color: 'success'
  });
  hasChanges.value = false;
}

function verifyPhone() {
  // Implementation for phone verification
}
</script>

<template>
  <AccountProfile
    title="Information de contact"
    description="Gérez vos coordonnées et vos préférences de communication"
  >
    <div class="pt-4 w-full justify-between flex">
      <UFormField label="Adresse email" class="w-1/2">
        <UInput
          v-model="user.email"
          placeholder="you@example.com"
          icon="i-heroicons-envelope"
          class="w-full"
          @input="hasChanges = true"
        />
      </UFormField>

      <div class="inline-flex items-center">
        <UButton
          color="neutral"
          icon="i-tabler-rosette-discount-check"
          variant="outline"
          class="rounded-md"
          :disabled="user.emailVerified"
        >
          Vérifié
        </UButton>
      </div>
    </div>

    <div class="pt-4 w-full justify-between flex">
      <UFormField
        label="Numéro de téléphone"
        help="Nous utiliserons ce numéro pour vous contacter."
        class="w-1/2"
      >
        <UInput
          type="phone"
          v-model="user.contactNumber"
          placeholder="(+237) 674289317"
          icon="i-heroicons-phone"
          class="w-full"
          @input="hasChanges = true"
        />
      </UFormField>

      <div class="inline-flex items-center">
        <UButton
          color="neutral"
          icon="i-tabler-rosette-discount-check-off"
          variant="outline"
          class="rounded-md"
          @click="verifyPhone"
        >
          Vérifier
        </UButton>
      </div>
    </div>

    <div class="space-y-4 pt-6">
      <h4 class="text-base font-medium">Préférences de communication</h4>

      <div class="flex items-center justify-between">
        <div class="space-y-0.5">
          <h1>Notifications par e-mail</h1>
          <p class="text-sm">Recevez des e-mails sur l'activité de votre compte</p>
        </div>
        <USwitch default-value @change="hasChanges = true"/>
      </div>

      <div class="flex items-center justify-between">
        <div class="space-y-0.5">
          <h1>E-mails marketing</h1>
          <p class="text-sm">Recevez des e-mails concernant les nouvelles fonctionnalités et offres</p>
        </div>
        <USwitch @change="hasChanges = true"/>
      </div>
    </div>

    <UButton
      color="neutral"
      variant="outline"
      class="rounded-md mt-6"
      :disabled="!hasChanges"
      @click="saveContactChanges"
    >
      Enregistrer les changements
    </UButton>
    </AccountProfile>
</template>
