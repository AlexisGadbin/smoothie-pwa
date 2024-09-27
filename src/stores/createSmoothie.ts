import type { Ingredient } from '@/utils/types/Ingredient'
import type { Unit } from '@/utils/types/Unit'
import ColorThief from 'colorthief'
import { defineStore } from 'pinia'
import tinycolor from 'tinycolor2'
import { ref } from 'vue'

export const useCreateSmoothieStore = defineStore('createSmoothie', () => {
  const name = ref('')
  const color = ref('')
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

    addColorToSmoothie()
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

  const addColorToSmoothie = () => {
    if (!chosenIngredients.value) return

    const img = new Image()
    img.src = '/ingredients/' + chosenIngredients.value.imageUrl

    img.onload = () => {
      const colorThief = new ColorThief()
      const dominantColor = colorThief.getColor(img)
      const dominangColorHex = tinycolor(
        `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`
      ).toHexString()
      if (!dominantColor) return
      if (!color.value) {
        color.value = dominangColorHex
      } else {
        const newColor = tinycolor.mix(color.value, dominangColorHex)
        color.value = newColor.toHexString()
      }
    }
  }

  return {
    name,
    ingredients,
    color,
    chosenIngredients,
    addIngredient,
    removeIngredient,
    resetSmoothie,
    setChosenIngredients,
    resetChosenIngredients
  }
})
