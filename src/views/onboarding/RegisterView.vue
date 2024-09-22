<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

async function submit() {
  await auth.register(form.value.email, form.value.password)
}
</script>

<template>
  <form @submit.prevent="submit">
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />

    <button type="submit">Register</button>
  </form>
</template>
