import type { Category } from './Category'
import type { Ingredient } from './Ingredient'
import type { UserType } from './User'

export type Smoothie = {
  id: number
  name: string
  categories: Category[]
  ingredients: Ingredient[]
  author: UserType
}
