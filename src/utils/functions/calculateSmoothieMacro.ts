import type { SmoothieWithIngredients } from '../types/SmoothieWithIngredients'

type Macro = {
  protein: number
  fat: number
  carbs: number
  calories: number
}

export function calculateSmoothieMacro(smoothie: SmoothieWithIngredients): Macro {
  const totalMacro = {
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0
  }

  smoothie.ingredients.forEach((ingredient) => {
    totalMacro.protein += ingredient.protein
    totalMacro.fat += ingredient.fat
    totalMacro.carbs += ingredient.carbs
    totalMacro.calories += ingredient.calories
  })

  totalMacro.protein = Math.round(totalMacro.protein * 100) / 100
  totalMacro.fat = Math.round(totalMacro.fat * 100) / 100
  totalMacro.carbs = Math.round(totalMacro.carbs * 100) / 100
  totalMacro.calories = Math.round(totalMacro.calories * 100) / 100

  return totalMacro
}
