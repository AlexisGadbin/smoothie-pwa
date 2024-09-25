import type { IngredientCategory } from './IngredientCategory'
import type { Unit } from './Unit'

export type IngredientWithQuantity = {
  id: number
  name: string
  category: IngredientCategory
  imageUrl: string
  quantity: number
  unit: Unit
}
