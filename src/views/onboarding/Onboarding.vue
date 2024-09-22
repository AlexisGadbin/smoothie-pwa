<template>
  <div>
    <component :is="currentScreenComponent" />
  </div>
</template>

<script setup lang="ts">
import { useOnboardingStore } from '@/stores/onboarding'
import { computed } from 'vue'
import ChooseProvider from './ChooseProvider.vue'
import ComplementaryInfo from './ComplementaryInfo.vue'
import EnterPassword from './EnterPassword.vue'

const onboardingStore = useOnboardingStore()

const screens = [ChooseProvider, EnterPassword, ComplementaryInfo]
const currentScreenComponent = computed(() => screens[onboardingStore.step])
</script>
