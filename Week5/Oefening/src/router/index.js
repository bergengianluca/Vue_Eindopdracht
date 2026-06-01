import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import OverzichtView from '@/views/OverzichtView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView},
    { path: '/overzicht', component: OverzichtView},
    { path: '/contact', component: ContactView},
  ],
})

export default router
