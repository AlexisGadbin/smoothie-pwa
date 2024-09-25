<script setup lang="ts">
import { RouterView } from 'vue-router'
import ReloadPrompt from './components/ReloadPrompt.vue'
import TabBar from './components/TabBar.vue'
</script>

<template>
  <ReloadPrompt />

  <RouterView />
  <TabBar />
</template>
