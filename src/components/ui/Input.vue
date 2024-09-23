<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | number | null
  type?: 'text' | 'number' | 'email' | 'password' | 'date'
  placeholder?: string
  class?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :type="props.type || 'text'"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :class="[
      'w-full p-2 rounded flex items-center justify-start gap-2 border outline-none border-primary-100 text-xs focus:border-primary-700',
      props.class
    ]"
    @input="updateValue"
  />
</template>
