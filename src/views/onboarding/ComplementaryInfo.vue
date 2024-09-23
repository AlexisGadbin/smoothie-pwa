<script lang="ts" setup>
import AppTitle from '@/components/AppTitle.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import RequiredStar from '@/components/ui/RequiredStar.vue'
import Select from '@/components/ui/Select.vue'
import { useAuthStore } from '@/stores/auth'
import { GenderEnum, useOnboardingStore } from '@/stores/onboarding'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const onboarding = useOnboardingStore()
const router = useRouter()
const error = ref<string | null>(null)

const handleSubmit = async () => {
  await auth.register(onboarding.getRegisterData())
  onboarding.resetOnboarding()
  router.push({ name: 'home' })
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

    <form class="mt-9 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div class="flex gap-4 w-full justify-between">
        <div class="flex-1">
          <Label for="lastName">
            Nom
            <RequiredStar />
          </Label>
          <Input
            v-model="onboarding.lastName"
            placeholder="Entrez votre prénom"
            id="lastName"
            required
          />
        </div>
        <div class="flex-1">
          <Label for="firstName">
            Prénom
            <RequiredStar />
          </Label>
          <Input
            v-model="onboarding.firstName"
            placeholder="Entrez votre nom"
            id="firstName"
            required
          />
        </div>
      </div>
      <div>
        <Label for="gender">Genre</Label>
        <Select v-model="onboarding.gender" placeholder="Sélectionnez un genre" id="gender">
          <option :value="GenderEnum.Unspecified" default>Ne préfère pas répondre</option>
          <option :value="GenderEnum.Male">Homme</option>
          <option :value="GenderEnum.Female">Femme</option>
          <option :value="GenderEnum.Other">Autre</option>
        </Select>
      </div>
      <div>
        <Label for="birthDate">Date de naissance</Label>
        <Input type="date" v-model="onboarding.dateOfBirth" id="birthDate" />
      </div>
      <Button type="submit" class="w-full">Compléter mon inscription !</Button>
    </form>
  </section>
</template>
