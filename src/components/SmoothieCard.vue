<template>
  <div class="bg-white overflow-hidden rounded-2xl w-[45%] h-[210px]">
    <div class="h-[130px] relative" :style="{ backgroundColor }">
      <SmoothiePicture
        :color="smoothie.color"
        class="w-[80px] h-fit absolute -bottom-1 right-1/2 transform translate-x-1/2"
      />
    </div>
    <div class="p-2 pt-1">
      <p class="text-primary-700 text-xs font-semibold">A compléter</p>
      <h3 class="font-semibold text-sm truncate">
        {{ smoothie.name }}
      </h3>
      <div class="mt-3 text-gray-500 font-light text-[10px] flex justify-between items-center">
        <span class="flex items-center gap-1">
          <ShoppingBasket :size="16" />
          {{ smoothie.ingredients.length }} ingrédients
        </span>
        <Heart :size="20" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Smoothie } from '@/utils/types/Smoothie'
import { Heart, ShoppingBasket } from 'lucide-vue-next'
import tinycolor from 'tinycolor2'
import { computed } from 'vue'
import SmoothiePicture from './SmoothiePicture.vue'

const props = defineProps<{
  smoothie: Smoothie
}>()

const backgroundColor = computed(() => {
  return tinycolor(props.smoothie.color).setAlpha(0.3).toRgbString()
})
</script>
