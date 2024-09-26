<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import ReloadPrompt from './components/ReloadPrompt.vue'
import TabBar from './components/TabBar.vue'

const route = useRoute()
</script>

<template>
  <ReloadPrompt />

  <RouterView />
  <TabBar v-if="route.name !== 'onboarding'" />
</template>
