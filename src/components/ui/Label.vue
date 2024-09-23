<script setup lang="ts">
const props = defineProps<{
  for: string
}>()
</script>

<template>
  <label :for="props.for" class="text-xs font-normal">
    <slot />
  </label>
</template>
