<script setup lang="ts">
import {Gender} from "~~/app/core/entities";

definePageMeta({
  layout: 'account',
  middleware: 'auth'
});

const {user} = useAuthStore();
const state = reactive({...user});
const originalState = ref({...user});

// Computed property to check if the state has changed
const hasChanges = computed(() => {
  return JSON.stringify(originalState.value) !== JSON.stringify(state)
});

const formattedBirthdate = computed({
  get: () => state.birthdate?.slice(0, 10) || '',
  set: (value: string) => {
    state.birthdate = value
  }
})

watch(() => user, (newUser) => {
  if (newUser) {
    Object.assign(state, newUser)
  }
}, {deep: true});

const toast = useToast();

async function saveProfileChanges() {
  // Implementation for saving profile changes
  toast.add({
    title: 'Success',
    description: 'Your profile changes were saved successfully.',
    color: 'success'
  });
  originalState.value = {...state};
}

</script>

<template>
  <div>
    <AccountProfile
      title="Profil"
      description="Mettez à jour les informations de votre profil et la façon dont les autres vous voient sur Famsub"
    >
      <AccountAvatarUpload
        :avatar="user?.avatar"
        class="mb-6"
      />

      <div class="grid gap-6 md:grid-cols-2">
        <UFormField label="Prénom">
          <UInput v-model="state.firstName" placeholder="John" class="w-full"/>
        </UFormField>

        <UFormField label="Nom de famille">
          <UInput v-model="state.lastName" placeholder="Doe" class="w-full"/>
        </UFormField>

        <UFormField label="Nom d'utilisateur">
          <UInput v-model="state.username" placeholder="johndoe" class="w-full"/>
        </UFormField>

        <UFormField label="Anniversaire">
          <UInput
            v-model="formattedBirthdate"
            type="date"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Sexe">
          <UInputMenu
            placeholder="Sélectionnez le sexe"
            v-model="state.gender"
            :items="Object.values(Gender)"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Emplacement">
          <UInput model-value="Douala, Cameroun" class="w-full"/>
        </UFormField>
      </div>

      <UButton
        color="neutral"
        variant="outline"
        class="rounded-md mt-6"
        :disabled="!hasChanges"
        @click="saveProfileChanges"
      >
        Enregistrer les changements
      </UButton>
    </AccountProfile>


    <!-- Contact Information Section -->
    <AccountContactInfo :user="state"/>

    <!-- Security Section -->
    <AccountSecurity/>

    <!-- Integrated Accounts Section -->
    <AccountIntegratedAccount/>

    <!-- Danger Zone -->
    <AccountDangerZone/>
  </div>
</template>

<style scoped>

</style>
