<script setup lang="ts">
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const pinEnabled = ref(false);

const toast = useToast();

function changePassword() {
  // Implementation for password change
  toast.add({
    title: 'Success',
    description: 'Your password was changed successfully.',
    color: 'success'
  });

  // Reset form
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
}

function togglePin() {
  // Implementation for PIN toggle
  pinEnabled.value = !pinEnabled.value;

  toast.add({
    title: 'Success',
    description: pinEnabled.value ? 'PIN activated successfully.' : 'PIN deactivated successfully.',
    color: 'success'
  });
}
</script>

<template>
  <AccountProfile
    title="Sécurité"
    description="Gérez votre mot de passe et les paramètres de sécurité de votre compte"
  >
    <div class="password-section mb-8">
      <div class="grid gap-6">
        <UFormField
          label="Mot de passe actuel"
          name="password"
          help="Je ne me souviens plus de votre mot de passe actuel. Récupérer le compte"
        >
          <UInput
            v-model="currentPassword"
            size="md"
            placeholder="***********"
            type="password"
            icon="i-heroicons-lock-closed"
            class="w-full"
          />
        </UFormField>

        <div class="grid gap-6 md:grid-cols-2">
          <UFormField label="Nouveau mot de passe" name="password">
            <UInput
              v-model="newPassword"
              size="md"
              placeholder="***********"
              type="password"
              icon="i-heroicons-lock-closed"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Confirmer le nouveau mot de passe" name="password">
            <UInput
              v-model="confirmPassword"
              size="md"
              placeholder="***********"
              type="password"
              icon="i-heroicons-lock-closed"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>

      <UButton
        color="neutral"
        variant="outline"
        class="rounded-md mt-4"
        :disabled="!currentPassword || !newPassword || newPassword !== confirmPassword"
        @click="changePassword"
      >
        Changer le mot de passe
      </UButton>
    </div>

    <div class="pin-section">
      <p class="py-4 text-sm text-gray-800 font-medium dark:text-gray-200">Gradient PIN Famsub</p>

      <div class="flex justify-between items-center">
        <UPinInput mask :default-value="['1', '2', '3', '4', '5']" disabled />

        <UButton
          color="neutral"
          variant="outline"
          class="rounded-md"
          @click="togglePin"
        >
          {{ pinEnabled ? 'Désactiver' : 'Activer' }}
        </UButton>
      </div>

      <div class="ml-4 pt-3 text-xs">
        <ul class="list-disc">
          <li>Il sera demandé dans diverses situations</li>
          <li>Vous devrez valider votre code PIN Famsub en cliquant sur le lien envoyé par e-mail</li>
          <li>Ce code vous offre un deuxième niveau de sécurité en plus de votre mot de passe Famsub</li>
        </ul>
      </div>
    </div>
  </AccountProfile>
</template>
