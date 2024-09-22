<script lang="ts" setup>
import AppTitle from '@/components/AppTitle.vue'
import { useOnboardingStore } from '@/stores/onboarding'
import { ref } from 'vue'

const onboarding = useOnboardingStore()
const error = ref<string | null>(null)

const handleSubmit = () => {
  onboarding.nextStep()
}
</script>

<template>
  <section class="mx-4">
    <div class="w-full flex items-center justify-center">
      <AppTitle />
    </div>
    <div class="text-center text-xl font-semibold leading-7 mt-7 w-full">
      Quelques informations en plus sur vous !
    </div>
    <p class="mt-2 text-xs font-normal text-gray-600 w-full text-center">
      Inscris-toi ou connecte-toi pour commencer à partager
    </p>

    <form class="mt-9 flex flex-col gap-4" @submit.prevent="handleSubmit">Cc le sang ❤️</form>
  </section>
</template>
