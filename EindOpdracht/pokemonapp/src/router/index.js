import OverzichtView from '@/views/OverzichtView.vue'
import FavorietenView from '@/views/FavorietenView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // createWebHistory zorgt dat de pagina's gewone URL's krijgen zonder een #.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: OverzichtView },
    { path: '/favorieten', component: FavorietenView },
  ],
})

export default router
