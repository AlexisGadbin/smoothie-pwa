import type { RegisterType } from '@/utils/types/Register'
import { type UserType } from '@/utils/types/User'
import { defineStore } from 'pinia'
import { ref, unref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserType | null>(null)
  const token = ref(localStorage.getItem('token'))

  async function api(method: string, url: string, payload: any = {}) {
    const response = await fetch('http://localhost:3333/api' + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: method !== 'GET' ? JSON.stringify(unref(payload)) : null
    })

    return response.json()
  }

  function authenticate(result: any) {
    token.value = result.token
    localStorage.setItem('token', result.token)
  }

  async function login(email: string, password: string) {
    const result = await api('POST', '/auth/login', { email, password })
    authenticate(result)
  }

  async function register(register: RegisterType) {
    const result = await api('POST', '/auth/register', register)
    authenticate(result)
  }

  async function logout() {
    await api('DELETE', '/auth/logout')
    token.value = null
    localStorage.removeItem('token')
    user.value = null
  }

  async function me() {
    const result = await api('GET', '/auth/me')

    console.log(user)

    user.value = result.user

    return user.value
  }

  return { user, login, register, logout, me }
})
