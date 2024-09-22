<script lang="ts" setup>
import AppTitle from '@/components/AppTitle.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { useOnboardingStore } from '@/stores/onboarding'
import { ref } from 'vue'

const onboarding = useOnboardingStore()
const error = ref<string | null>(null)

const handleSubmit = () => {
  if (!onboarding.password) {
    error.value = 'Veuillez renseigner votre mot de passe'
    return
  }
  if (onboarding.password.length < 8) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }
  if (onboarding.password !== onboarding.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }
  onboarding.nextStep()
}
</script>

<template>
  <section class="mx-4">
    <div class="w-full flex items-center justify-center">
      <AppTitle />
    </div>
    <div class="text-center text-xl font-semibold leading-7 mt-7 w-full">
      Renseignez un mot de passe !
    </div>
    <p class="mt-2 text-xs font-normal text-gray-600 w-full text-center">
      Inscris-toi ou connecte-toi pour commencer à partager
    </p>

    <form class="mt-9 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <Input
        v-model="onboarding.password"
        placeholder="Entrez votre mot de passe"
        type="password"
      />
      <Input
        v-model="onboarding.confirmPassword"
        placeholder="Confirmez votre mot de passe"
        type="password"
      />
      <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
      <Button type="submit" class="w-full">Continuer</Button>
    </form>
  </section>
</template>
