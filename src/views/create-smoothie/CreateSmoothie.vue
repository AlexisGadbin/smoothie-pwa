<template>
  <main class="mx-4 h-full relative">
    <div class="flex justify-between items-center mt-4 mb-6">
      <AppTitle />
    </div>
    <Input v-model="search" placeholder="Entre le nom d'un ingrédient pour le trouver !" />
    <FruitGrid />
    <div class="flex relative gap-6">
      <div class="w-3/5">
        <div class="mt-5">
          <h2 class="text-primary-700 text-sm">Ton smoothie :</h2>
          <p class="text-sm">
            {{ createSmoothie.ingredients.map((ingredient) => ingredient.name).join(', ') }}
          </p>
          <p class="text-sm" v-if="createSmoothie.ingredients.length === 0">
            Ton smoothie n'a pas encore d'ingrédients !
          </p>
        </div>
        <Input v-model="createSmoothie.name" placeholder="Donne lui un nom !" class="mt-4" />
        <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
      </div>
      <SmoothiePicture
        :color="createSmoothie.color"
        v-if="createSmoothie.ingredients.length > 0"
        class="w-[30%] h-auto absolute bottom-0 right-0 max-w-[125px]"
      />
    </div>

    <Button @click="handleCreateSmoothie" class="mt-4"> Créer mon smoothie ! </Button>
  </main>
</template>

<script lang="ts" setup>
import AppTitle from '@/components/AppTitle.vue'
import FruitGrid from '@/components/FruitGrid.vue'
import SmoothiePicture from '@/components/SmoothiePicture.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { useAuthStore } from '@/stores/auth'
import { useCreateSmoothieStore } from '@/stores/createSmoothie'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const search = ref('')

const createSmoothie = useCreateSmoothieStore()
const auth = useAuthStore()
const router = useRouter()
const error = ref<string | null>(null)
const watchedColor = ref<string | null>(null)

watch(
  () => createSmoothie.color,
  (color) => {
    if (watchedColor.value === color) return
    watchedColor.value = color
  }
)

const handleCreateSmoothie = async () => {
  if (!createSmoothie.name) {
    error.value = 'Tu dois donner un nom à ton smoothie !'
    return
  }

  if (createSmoothie.ingredients.length === 0) {
    error.value = 'Tu dois ajouter au moins un ingrédient à ton smoothie !'
    return
  }

  await auth.api('POST', '/smoothie', {
    name: createSmoothie.name,
    color: createSmoothie.color,
    ingredients: createSmoothie.ingredients
  })

  createSmoothie.resetSmoothie()
  router.push({ name: 'home' })
}
</script>
