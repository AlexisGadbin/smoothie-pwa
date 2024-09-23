import type { GenderEnum } from '@/stores/onboarding'

export type UserType = {
  id: number
  email: string
  firstName: string
  lastName: string
  birthDate: string
  gender: GenderEnum
}
