<template>
  <UModal>
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">Permanently disable account</h2>
      </template>
      <p class="text-sm text-gray-600">
        Hey, we get it—sometimes you need a break. Just so you know, disabling your Famsub account will deactivate your
        profile, but you can always come back and reactivate it later. Your data will be saved.
      </p>

      <template #footer>
        <div class="mt-4 space-x-4">
          <UButton color="error" variant="solid" @click="onSuccess" class="rounded-md transition-colors" disabled>
            Yep disable it
          </UButton>
          <UButton color="neutral" variant="solid" @click="onCancel" class="rounded-md transition-colors text-red-700">
            Cancel
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import {defineEmits} from 'vue'

const emit = defineEmits(['success', 'cancel'])

function onSuccess() {
  emit('success')
}

function onCancel() {
  emit('cancel')
}
</script>

<style scoped>

</style>