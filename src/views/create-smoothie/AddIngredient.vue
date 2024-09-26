<template>
  <main>
    <div class="flex items-center justify-between m-4">
      <button type="button" @click="handleBack">
        <ChevronLeft :size="40" />
      </button>
      <h1>Ajouter un fruit</h1>
      <div />
    </div>
    <div class="bg-primary-100 text-2xl font-bold h-[100px] place-items-center grid">
      {{ createSmoothie.chosenIngredients?.name }}
    </div>
    <div class="mt-2 mx-4 flex flex-col gap-2">
      <div class="flex gap-5">
        <Input v-model="quantity" type="number" placeholder="Quantité" class="w-[40%]" />
        <Select v-model="unit" class="w-full">
          <option v-for="unit in Object.values(Unit)" :key="unit" :value="unit">
            {{ unit }}
          </option>
        </Select>
      </div>
      <Button @click="handleAddIngredient"> Ajouter </Button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import { useCreateSmoothieStore } from '@/stores/createSmoothie'
import { Unit } from '@/utils/types/Unit'
import { ChevronLeft } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const createSmoothie = useCreateSmoothieStore()
const router = useRouter()
const quantity = ref(100)
const unit = ref(Unit.GRAM)

if (!createSmoothie.chosenIngredients) {
  router.push({ name: 'create-smoothie' })
}

const handleBack = () => {
  createSmoothie.resetChosenIngredients()
  router.push({ name: 'create-smoothie' })
}

const handleAddIngredient = () => {
  createSmoothie.addIngredient(quantity.value, unit.value)
  createSmoothie.resetChosenIngredients()
  router.push({ name: 'create-smoothie' })
}
</script>
