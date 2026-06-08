import { createRouter, createWebHistory } from 'vue-router'
import CountriesOverview from '../views/CountriesOverview.vue'
import CountryDetail from '../views/CountryDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CountriesOverview',
      component: CountriesOverview
    },
    {
      path: '/country/:code',
      name: 'CountryDetail',
      component: CountryDetail
    }
  ],
})

export default router
