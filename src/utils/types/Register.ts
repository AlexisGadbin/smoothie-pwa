import type { Gender } from '@/stores/onboarding'

export type RegisterType = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  birthDate: string | null
  gender: Gender
}
