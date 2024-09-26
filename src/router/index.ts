import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'onboarding',
      component: () => import('../views/onboarding/Onboarding.vue')
    },
    {
      path: '/create-smoothie',
      name: 'create-smoothie',
      component: () => import('../views/create-smoothie/CreateSmoothie.vue')
    },
    {
      path: '/create-smoothie/ingredient',
      name: 'add-ingredient',
      component: () => import('../views/create-smoothie/AddIngredient.vue')
    }
  ]
})

export default router
