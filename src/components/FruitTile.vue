<template>
  <button type="button" class="bg-primary-50 rounded-[20px] z-50" @click="handleClick">
    <img :src="'/ingredients/' + ingredient.imageUrl" :alt="ingredient.name" class="w-16 h-16" />
  </button>
</template>

<script lang="ts" setup>
import { useCreateSmoothieStore } from '@/stores/createSmoothie'
import type { Ingredient } from '@/utils/types/Ingredient'
import { useRouter } from 'vue-router'

const props = defineProps<{ ingredient: Ingredient }>()

const router = useRouter()
const createSmoothie = useCreateSmoothieStore()

const handleClick = () => {
  if (createSmoothie.ingredients.some((i) => i.ingredientId === props.ingredient.id)) {
    return
  }
  createSmoothie.setChosenIngredients(props.ingredient)
  router.push({ name: 'add-ingredient' })
}
</script>
