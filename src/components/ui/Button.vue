<script lang="ts" setup>
const props = defineProps<{
  onClick: () => void
  type: 'primary' | 'secondary' | 'ghost'
  class?: string
}>()
</script>

<template>
  <button
    type="button"
    :class="{
      'bg-primary-700 text-white': props.type === 'primary',
      'bg-transparent border border-primary-700': props.type === 'secondary',
      'bg-transparent': props.type === 'ghost',
      [props.class || '']: !!props.class
    }"
    class="w-full rounded-lg py-2 px-5 inline-flex items-center justify-center gap-2 text-sm font-bold"
    @click="props.onClick"
  >
    <slot />
  </button>
</template>
