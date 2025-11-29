import { createRouter, createWebHistory } from 'vue-router'

// TYPE
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guards para autenticação (para usar futuramente)
router.beforeEach((to, from, next) => {
  next()
})

export default router
