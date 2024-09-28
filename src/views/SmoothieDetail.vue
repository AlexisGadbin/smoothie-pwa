<template>
  <main class="bg-primary-200 h-full relative">
    <div class="pt-3 flex w-full justify-between px-4">
      <button type="button" @click="handleBack">
        <ChevronLeft :size="40" />
      </button>
      <div class="flex gap-3">
        <CategoryBadge
          v-for="category in smoothie?.categories"
          :key="category.name"
          :category="category"
        />
      </div>
    </div>

    <section class="bg-white h-1/2 bottom-tabbar fixed rounded-t-[40px] w-full pt-[10%] px-4">
      <SmoothiePicture
        v-if="smoothie"
        :color="smoothie.color"
        class="absolute bottom-[90%] right-1/2 transform translate-x-1/2 h-[80%] drop-shadow-xl"
      />

      <div class="flex mt-4 justify-between w-full">
        <h1 class="font-bold text-xl">{{ smoothie?.name }}</h1>
        <Heart :size="20" />
      </div>
      <p class="text-gray-500">Rating ici plus tard</p>

      <div
        class="mt-6 flex justify-between relative font-normal text-xs text-gray-800 border-y border-primary-100 py-3"
      >
        <button
          type="button"
          class="w-full"
          :class="{ 'text-black font-bold': tab === 'ingredients' }"
          @click="handleTab('ingredients')"
        >
          Ingrédients
        </button>
        <div class="min-h-[80%] w-[1px] bg-black" />
        <button
          type="button"
          class="w-full"
          :class="{ 'text-black font-bold': tab === 'nutrition' }"
          @click="handleTab('nutrition')"
        >
          Nutrition
        </button>
        <div class="min-h-[80%] w-[1px] bg-black" />
        <button
          type="button"
          class="w-full"
          :class="{ 'text-black font-bold': tab === 'comments' }"
          @click="handleTab('comments')"
        >
          Commentaires
        </button>
      </div>
      <div v-if="tab === 'ingredients'" class="flex inset-0 justify-center">
        <ul class="mt-4 list-disc">
          <li v-for="ingredient in smoothie?.ingredients" :key="ingredient.id">
            {{ ingredient.quantity }} {{ ingredient.unit }} de {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <div v-else-if="tab === 'nutrition'" class="flex justify-between py-2 mt-4">
        <div class="text-center">
          <p class="font-bold text-sm">{{ macros?.calories }} kcal</p>
          <p class="text-xs font-light">Calories</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-sm">{{ macros?.carbs }} g</p>
          <p class="text-xs font-light">Glucides</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-sm">{{ macros?.protein }} g</p>
          <p class="text-xs font-light">Protéines</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-sm">{{ macros?.fat }} g</p>
          <p class="text-xs font-light">Lipides</p>
        </div>
      </div>
      <div v-else-if="tab === 'comments'" class="flex inset-0 justify-center">
        Not yet implemented
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import CategoryBadge from '@/components/CategoryBadge.vue'
import SmoothiePicture from '@/components/SmoothiePicture.vue'
import { useAuthStore } from '@/stores/auth'
import { calculateSmoothieMacro } from '@/utils/functions/calculateSmoothieMacro'
import type { SmoothieWithIngredients } from '@/utils/types/SmoothieWithIngredients'
import { ChevronLeft, Heart } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const smoothie = ref<SmoothieWithIngredients | null>(null)
const tab = ref<'ingredients' | 'nutrition' | 'comments'>('ingredients')
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const macros = computed(() => {
  if (!smoothie.value) return null
  return calculateSmoothieMacro(smoothie.value)
})

onMounted(async () => {
  smoothie.value = await auth.api('GET', `/smoothie/${route.params.id}`)
})

const handleBack = () => {
  router.back()
}

const handleTab = (newTab: 'ingredients' | 'nutrition' | 'comments') => {
  tab.value = newTab
}

console.log(smoothie)
</script>

<style scoped></style>
