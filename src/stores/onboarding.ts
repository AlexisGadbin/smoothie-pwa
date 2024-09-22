import { defineStore } from 'pinia'
import { ref } from 'vue'

type OnboardingStep = 0 | 1 | 2 | -1
type Gender = 'male' | 'female' | 'other' | null

export const useOnboardingStore = defineStore('onboarding', () => {
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const step = ref<OnboardingStep>(0)
  const firstName = ref('')
  const lastName = ref('')
  const gender = ref<Gender>(null)
  const dateOfBirth = ref<string | null>(null)

  function nextStep() {
    step.value++
  }

  function previousStep() {
    step.value--
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
    previousStep
  }
})
