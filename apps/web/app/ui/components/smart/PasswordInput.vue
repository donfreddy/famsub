<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
  label?: string
  name?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const show = ref(false)
const attrs = useAttrs()
</script>

<template>
  <UFormField :label="label" :name="name" :required="required">
  <UInput  v-bind="attrs" :model-value="modelValue" @update:model-value="emit('update:modelValue', String($event))" class="w-full"
    icon="i-heroicons-lock-closed" :placeholder="placeholder ?? '***********'" :type="show ? 'text' : 'password'"
    :ui="{ trailing: 'pe-1' }">
    <template #trailing>
      <UButton color="neutral" variant="link" size="md" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
        @click="show = !show" />
    </template>
  </UInput>
</UFormField>
</template>