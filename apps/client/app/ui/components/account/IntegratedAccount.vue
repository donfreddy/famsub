<script setup lang="ts">
const accounts = ref([
  {
    name: 'Google',
    email: 'johndoe@gmail.com',
    connected: true,
    icon: 'https://www.svgrepo.com/show/355037/google.svg'
  },
  {
    name: 'Facebook',
    email: 'Non connecté',
    connected: false,
    icon: 'https://www.svgrepo.com/show/448224/facebook.svg'
  }
]);

function toggleConnection(account: any) {
  account.connected = !account.connected;

  // Implementation for connecting/disconnecting accounts
}
</script>

<template>
  <AccountProfile
    title="Compte intégré"
    description="Connectez vos comptes pour une connexion et un partage plus faciles"
  >
    <div class="grid gap-6 md:grid-cols-2 mt-6">
      <UCard
        v-for="account in accounts"
        :key="account.name"
        :ui="{'body':'p-0 sm:p-3'}"
        variant="outline"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <UAvatar :src="account.icon"/>
            <div>
              <h4 class="font-medium">{{ account.name }}</h4>
              <p class="text-xs">{{ account.email }}</p>
            </div>
          </div>
          <USwitch
            :model-value="account.connected"
            @update:model-value="toggleConnection(account)"
          />
        </div>
      </UCard>
    </div>
  </AccountProfile>
</template>
