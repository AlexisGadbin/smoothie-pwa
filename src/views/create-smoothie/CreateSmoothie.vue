<template>
  <main class="mx-4 h-full">
    <div class="flex justify-between items-center mt-4 mb-6">
      <AppTitle />
    </div>
    <Input v-model="search" placeholder="Entre le nom d'un ingrédient pour le trouver !" />
    <FruitGrid />
    <div class="mt-5">
      <h2 class="text-primary-700 text-sm">Ton smoothie :</h2>
      {{ createSmoothie.ingredients.map((ingredient) => ingredient.name).join(', ') }}
    </div>
    <Input
      v-model="createSmoothie.name"
      placeholder="Comment s'appelle ton smoothie ?"
      class="mt-4"
    />
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
    <Button @click="handleCreateSmoothie" class="mt-4"> Créer mon smoothie ! </Button>
  </main>
</template>

<script lang="ts" setup>
import AppTitle from '@/components/AppTitle.vue'
import FruitGrid from '@/components/FruitGrid.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { useAuthStore } from '@/stores/auth'
import { useCreateSmoothieStore } from '@/stores/createSmoothie'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const search = ref('')

const createSmoothie = useCreateSmoothieStore()
const auth = useAuthStore()
const router = useRouter()
const error = ref<string | null>(null)

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
    ingredients: createSmoothie.ingredients
  })

  createSmoothie.resetSmoothie()
  router.push({ name: 'home' })
}
</script>
