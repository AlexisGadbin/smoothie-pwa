import type { RegisterType } from '@/utils/types/Register'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type OnboardingStep = 0 | 1 | 2 | -1
export enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  Unspecified = 'unspecified'
}

export type Gender = GenderEnum | null

export const useOnboardingStore = defineStore('onboarding', () => {
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const step = ref<OnboardingStep>(0)
  const firstName = ref('')
  const lastName = ref('')
  const gender = ref<Gender>(GenderEnum.Unspecified)
  const dateOfBirth = ref<string | null>(new Date().toISOString().split('T')[0])
  function nextStep() {
    step.value++
  }

  function previousStep() {
    step.value--
  }

  function getRegisterData(): RegisterType {
    return {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      birthDate: dateOfBirth.value,
      confirmPassword: confirmPassword.value,
      gender: gender.value
    }
  }

  function resetOnboarding() {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    step.value = 0
    firstName.value = ''
    lastName.value = ''
    gender.value = GenderEnum.Unspecified
    dateOfBirth.value = new Date().toISOString().split('T')[0]
  }

  return {
    email,
    password,
    confirmPassword,
    step,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    nextStep,
    previousStep,
    getRegisterData,
    resetOnboarding
  }
})
