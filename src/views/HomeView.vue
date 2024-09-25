<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue'
import CategoryBadge from '@/components/CategoryBadge.vue'
import SmoothieCard from '@/components/SmoothieCard.vue'
import SmoothieOfTheDay from '@/components/SmoothieOfTheDay.vue'
import { useAuthStore } from '@/stores/auth'
import type { Category } from '@/utils/types/Category'
import type { Smoothie } from '@/utils/types/Smoothie'
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

const smoothies = ref<Smoothie[] | []>([])
const categories = ref<Category[] | []>([])

onMounted(async () => {
  smoothies.value = await auth.api('GET', '/smoothie')
  categories.value = await auth.api('GET', '/category')
})
</script>

<template>
  <main class="mx-4 h-full overflow-y-auto">
    <div class="flex items-center mt-4 mb-6">
      <AppTitle />
    </div>
    <SmoothieOfTheDay />
    <div class="my-4 flex gap-2 w-full overflow-x-auto">
      <CategoryBadge
        v-for="category in categories"
        :key="'category-' + category.id"
        :category="category"
      />
    </div>
    <section class="h-full">
      <SmoothieCard
        v-for="smoothie in smoothies"
        :key="'smoothie-' + smoothie.id"
        :smoothie="smoothie"
      />
    </section>
  </main>
</template>
