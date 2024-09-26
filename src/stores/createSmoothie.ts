import type { Ingredient } from '@/utils/types/Ingredient'
import type { Unit } from '@/utils/types/Unit'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCreateSmoothieStore = defineStore('createSmoothie', () => {
  const name = ref('')
  const ingredients = ref<
    {
      ingredientId: number
      name: string
      quantity: number
      unit: Unit
    }[]
  >([])

  const chosenIngredients = ref<Ingredient | null>(null)

  function addIngredient(quantity: number, unit: Unit) {
    if (!chosenIngredients.value) return

    ingredients.value.push({
      ingredientId: chosenIngredients.value.id,
      name: chosenIngredients.value.name,
      quantity: quantity,
      unit: unit
    })
  }

  function removeIngredient(ingredientId: number) {
    ingredients.value = ingredients.value.filter(
      (ingredient) => ingredient.ingredientId !== ingredientId
    )
  }

  function resetSmoothie() {
    name.value = ''
    ingredients.value = []
  }

  function setChosenIngredients(ingredient: Ingredient) {
    chosenIngredients.value = ingredient
  }

  function resetChosenIngredients() {
    chosenIngredients.value = null
  }

  return {
    name,
    ingredients,
    chosenIngredients,
    addIngredient,
    removeIngredient,
    resetSmoothie,
    setChosenIngredients,
    resetChosenIngredients
  }
})
