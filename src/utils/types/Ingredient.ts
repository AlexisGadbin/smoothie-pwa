import type { IngredientCategory } from './IngredientCategory'

export type Ingredient = {
  id: number
  name: string
  category: IngredientCategory
  imageUrl: string
}
