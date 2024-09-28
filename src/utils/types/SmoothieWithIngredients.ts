import type { Category } from './Category'
import type { IngredientWithQuantity } from './IngredientWithQuantity'
import type { UserType } from './User'

export type SmoothieWithIngredients = {
  id: number
  name: string
  categories: Category[]
  ingredients: IngredientWithQuantity[]
  author: UserType
  color: string
}
