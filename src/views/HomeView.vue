<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

auth
  .me()
  .then(() => {
    if (!auth.user) {
      router.push({ name: 'onboarding' })
    }
  })
  .catch(() => {
    router.push({ name: 'onboarding' })
  })
</script>

<template>
  <main>
    <div v-if="auth.user">Coucou {{ auth.user.firstName }}</div>
  </main>
</template>
