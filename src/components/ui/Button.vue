<script lang="ts" setup>
const props = defineProps<{
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  class?: string
}>()
</script>

<template>
  <button
    type="button"
    :class="{
      'bg-primary-700 text-white': props.variant === 'primary' || !props.variant,
      'bg-transparent border border-primary-700': props.variant === 'secondary',
      'bg-transparent': props.variant === 'ghost',
      [props.class || '']: !!props.class
    }"
    class="w-full rounded-lg py-2 px-5 inline-flex items-center justify-center gap-2 text-sm font-bold"
    @click="props.onClick"
  >
    <slot />
  </button>
</template>
