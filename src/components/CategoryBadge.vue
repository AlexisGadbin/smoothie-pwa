<template>
  <div class="flex flex-col">
    <div class="p-2 rounded-full w-fit bg-white flex items-center justify-center">
      <Smoothie v-if="category === 'all'" />
      <BicepsFlexed v-else-if="category.name === SmoothieCategory.PROTEIN" :size="24" />
      <Zap v-else-if="category.name === SmoothieCategory.ENERGY" :size="24" />
      <Vegan v-else-if="category.name === SmoothieCategory.VEGAN" :size="24" />
    </div>
    <span class="text-[10px] font-normal text-center" v-if="showText">
      {{ category === 'all' ? 'Tout' : category.name }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import Smoothie from '@/assets/icons/Smoothie.vue'
import type { Category } from '@/utils/types/Category'
import { SmoothieCategory } from '@/utils/types/SmoothieCategory'
import { BicepsFlexed, Vegan, Zap } from 'lucide-vue-next'

defineProps<{
  category: Category | 'all'
  showText?: boolean
}>()
</script>
