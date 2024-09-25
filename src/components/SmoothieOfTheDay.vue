<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import type { Smoothie } from '@/utils/types/Smoothie'
import { onMounted, ref } from 'vue'
import CategoryBadge from './CategoryBadge.vue'
import SmoothiePicture from './SmoothiePicture.vue'

const auth = useAuthStore()
const smoothie = ref<Smoothie | null>(null)

onMounted(() => {
  auth
    .api('GET', '/smoothie/day')
    .then((data: Smoothie) => {
      smoothie.value = data
    })
    .catch(() => {
      throw new Error('Failed to fetch smoothie')
    })
})
</script>

<template>
  <div v-if="smoothie" class="flex w-full bg-primary-800 rounded-[20px] p-5 relative">
    <div class="w-2/3 max-w-2/3 flex flex-col gap-4">
      <h2 class="text-white text-xl font-bold">
        {{ smoothie.name }}
      </h2>
      <div class="flex gap-4">
        <CategoryBadge
          v-for="category in smoothie.categories"
          v-bind:key="'category-' + category.id"
          :category="category"
        />
      </div>
    </div>
    <div class="w-1/3 max-w-1/3">
      <SmoothiePicture :color="smoothie.color" class="w-[100px] h-full absolute -bottom-1" />
    </div>
  </div>
</template>
