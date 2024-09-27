<template>
  <button type="button" @click="handleClick">
    <h1 class="font-black text-primary-700 text-5xl font-noto">Smoothie !</h1>
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push({ name: 'home' })
}
</script>
