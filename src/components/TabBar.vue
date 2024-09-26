<script setup lang="ts">
import { Heart, Home, User } from 'lucide-vue-next'
import TabBarItem from './TabBarItem.vue'
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center h-tabbar pb-tabbar"
  >
    <TabBarItem link="/home">
      <Home :size="24" />
      <span class="text-xs">Smoothies</span>
    </TabBarItem>
    <TabBarItem link="/favorites">
      <Heart :size="24" />
      <span class="text-xs">Favoris</span>
    </TabBarItem>
    <TabBarItem link="/profile">
      <User :size="24" />
      <span class="text-xs">Profil</span>
    </TabBarItem>
  </nav>
</template>
