<template>
  <UModal>
      <template #header>
        <h2 class="text-lg font-semibold">Permanently delete account</h2>
      </template>

      <template #body>
        <p class="text-sm text-gray-600">
          Hey, we’re sad to see you go! Just so you know, deleting your Famsub account is permanent—once it’s gone, it’s
          gone for good. This can't be undone.
        </p>

        <p class="text-sm text-gray-600 py-4">
          Please type <span class='font-semibold text-red-500'>"CONFIRM DELETE"</span> below to confirm that you want to
          delete your Famsub account.
        </p>

        <UFormField label="Confirmation" required>
          <UInput placeholder="Type CONFIRM DELETE to confirm"/>
        </UFormField>
      </template>

      <template #footer>

        <UButton color="error" variant="solid" @click="emit('close', false)"
                 class="rounded-md transition-colors text-red-700"
        >
          Cancel
        </UButton>
        <UButton color="error" variant="solid" @click="emit('close', true)" class="rounded-md transition-colors"
                 disabled>
          Yep delete it
        </UButton>
      </template>
  </UModal>
</template>

<script lang="ts" setup>
import {defineEmits} from 'vue'

const emit = defineEmits<{ close: [boolean] }>()
</script>

<style scoped>

</style>