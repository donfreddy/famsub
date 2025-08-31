<script setup lang="ts">
defineProps({
  avatar: {
    type: String,
    default: null
  }
});

function uploadAvatar() {
  // Implementation for avatar upload
}

function removeAvatar() {
  // Implementation for avatar removal
}
</script>

<template>
  <div class="avatar-upload flex justify-between items-center">
    <div class="inline-flex items-center">
      <UAvatar
        class="size-18 text-2xl"
        :src="avatar"
        alt="Avatar"
      />
      <div class="ml-4">
        <h1 class="font-medium">Photo de profil</h1>
        <p class="text-xs">JPG, GIF or PNG. 1MB max.</p>
      </div>
    </div>

    <div class="inline-flex items-center">
      <UButton
        color="neutral"
        variant="outline"
        size="sm"
        class="rounded-md mr-2"
        @click="uploadAvatar"
      >
        Télécharger une image
      </UButton>

      <UButton
        color="neutral"
        size="sm"
        class="rounded-md"
        @click="removeAvatar"
      >
        Supprimer
      </UButton>
    </div>
  </div>
</template>
