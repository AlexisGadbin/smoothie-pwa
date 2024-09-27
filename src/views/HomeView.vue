<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue'
import CategoryBadge from '@/components/CategoryBadge.vue'
import SmoothieCard from '@/components/SmoothieCard.vue'
import SmoothieOfTheDay from '@/components/SmoothieOfTheDay.vue'
import { useAuthStore } from '@/stores/auth'
import type { Category } from '@/utils/types/Category'
import type { Smoothie } from '@/utils/types/Smoothie'
import { Plus } from 'lucide-vue-next'
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
  <main class="mx-4 h-full flex flex-col">
    <div class="flex justify-between items-center mt-4 mb-6">
      <AppTitle />
      <button
        class="bg-white p-2 rounded-full cursor-pointer"
        @click="router.push({ name: 'create-smoothie' })"
      >
        <Plus :size="24" />
      </button>
    </div>
    <SmoothieOfTheDay />
    <div class="my-4 flex gap-2 w-full">
      <CategoryBadge
        v-for="category in categories"
        :key="'category-' + category.id"
        :category="category"
      />
    </div>
    <section class="h-full flex flex-wrap gap-6 overflow-y-auto justify-between">
      <SmoothieCard
        v-for="smoothie in smoothies"
        :key="'smoothie-' + smoothie.id"
        :smoothie="smoothie"
      />
    </section>
  </main>
</template>
