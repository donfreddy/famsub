<script setup lang="ts">
const overlay = ref(null); // Replace with actual overlay implementation

function openDisableModal() {
  // Implementation for disabling account modal
  // Example: overlay.value?.create({/* modal config */})?.open();
}

function openDeleteModal() {
  // Implementation for deleting account modal
  // Example: overlay.value?.create({/* modal config */})?.open();
}
</script>

<template>
  <div class="mb-16">
    <div class="w-full">
      <h1 class="text-lg font-semibold">Supprimer le compte</h1>
      <p class="text-sm">Vous pouvez "désactiver votre compte" pour faire une pause dans Fansub.</p>
    </div>
    <div class="space-x-4 pt-4">
      <UButton
        color="error"
        variant="outline"
        @click="openDisableModal"
        class="rounded-md transition-colors"
      >
        Désactiver le compte
      </UButton>

      <UButton
        color="error"
        variant="solid"
        @click="openDeleteModal"
      >
        Supprimer le compte
      </UButton>
    </div>
  </div>
</template>
