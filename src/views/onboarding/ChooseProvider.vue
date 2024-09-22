<script lang="ts" setup>
import AppleLogo from '@/assets/icons/AppleLogo.vue'
import FacebookLogo from '@/assets/icons/FacebookLogo.vue'
import GoogleLogo from '@/assets/icons/GoogleLogo.vue'
import AppTitle from '@/components/AppTitle.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { useOnboardingStore } from '@/stores/onboarding'
import { ref } from 'vue'

const onboarding = useOnboardingStore()
const error = ref<string | null>(null)

const handleSubmit = () => {
  if (!onboarding.email) {
    error.value = 'Veuillez renseigner votre e-mail'
    return
  }
  if (!onboarding.email.includes('@') || !onboarding.email.includes('.')) {
    error.value = 'Veuillez renseigner un e-mail valide'
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
      Explore, savoure, et partage tes smoothies préférés avec des amis !
    </div>
    <p class="mt-2 text-xs font-normal text-gray-600 w-full text-center">
      Inscris-toi ou connecte-toi pour commencer à partager
    </p>

    <form class="mt-9 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <Input v-model="onboarding.email" placeholder="Entrez votre e-mail" />
      <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
      <Button type="submit" class="w-full">Se connecter avec un e-mail</Button>
      <div class="flex items-center w-full text-gray-500 gap-2 text-xs">
        <div class="border-t border-gray-500 w-full" />
        Ou
        <div class="border-t border-gray-500 w-full" />
      </div>
      <Button
        disabled
        @click="onboarding.nextStep"
        variant="secondary"
        class="w-full text-sm font-normal border-black"
      >
        <AppleLogo />
        Se connecter avec Apple
      </Button>
      <Button
        disabled
        @click="onboarding.nextStep"
        variant="secondary"
        class="w-full text-sm font-normal border-red-400"
      >
        <GoogleLogo />
        Se connecter avec Google
      </Button>
      <Button
        disabled
        @click="onboarding.nextStep"
        variant="secondary"
        class="w-full text-sm font-normal border-blue-700"
      >
        <FacebookLogo />
        Se connecter avec Facebook
      </Button>
    </form>
  </section>
</template>
