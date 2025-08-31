<!-- components/BaseInput.vue -->
<script setup lang="ts">
import { useAttrs } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  name?: string
  type?: string
  icon?: string
  placeholder?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const attrs = useAttrs()
</script>

<template>
  <UFormField :label="label" :name="name" :required="required">
    <UInput class="w-full" size="md" v-bind="attrs" :type="type ?? 'text'" :placeholder="placeholder"
      :model-value="modelValue" :icon="icon"
      @update:model-value="emit('update:modelValue', String($event))" />
  </UFormField>
</template>
