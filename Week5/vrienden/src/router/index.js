import DetailView from '@/views/DetailView.vue'
import OverzichtView from '@/views/OverzichtView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: OverzichtView},
    {path: "/detail/:id", component: DetailView},
  ],
})

export default router
