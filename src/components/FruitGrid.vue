<template>
  <div class="mt-6 grid-cols-4 grid place-items-center gap-[10px]">
    <FruitTile
      v-for="ingredient in ingredients"
      :key="'ingredient-' + ingredient.id"
      :ingredient="ingredient"
    />
  </div>
  <div class="flex w-full justify-center gap-3 mt-3">
    <div class="rounded-full w-2 h-2 bg-primary-700" />
    <div class="rounded-full w-2 h-2 bg-primary-50" />
    <div class="rounded-full w-2 h-2 bg-primary-50" />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import type { Ingredient } from '@/utils/types/Ingredient'
import { onMounted, ref } from 'vue'
import FruitTile from './FruitTile.vue'

const ingredients = ref<Ingredient[]>([])

const auth = useAuthStore()

onMounted(async () => {
  ingredients.value = await auth.api('GET', '/ingredient')
})
</script>
