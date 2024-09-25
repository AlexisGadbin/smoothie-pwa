<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue'
import SmoothieOfTheDay from '@/components/SmoothieOfTheDay.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
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

const smoothies = ref([])

onMounted(async () => {
  smoothies.value = await auth.api('GET', '/smoothie')

  console.log(smoothies)
})
</script>

<template>
  <main class="mx-4">
    <div class="flex items-center mt-4 mb-6">
      <AppTitle />
    </div>
    <SmoothieOfTheDay />
  </main>
</template>
