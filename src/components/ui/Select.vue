<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  class?: string
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <select
    :value="props.modelValue"
    :class="[
      'w-full p-2 text-xs focus:border-primary-700 bg-white rounded flex items-center justify-start gap-2 border border-primary-100',
      props.class
    ]"
    @input="updateValue"
  >
    <slot />
  </select>
</template>
