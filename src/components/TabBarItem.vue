<template>
  <router-link
    :to="link"
    class="flex flex-col items-center justify-center text-gray-500 w-1/3"
    active-class="text-primary-500"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
defineProps<{
  link: string
}>()
</script>
