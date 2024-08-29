import { createRouter, createWebHistory } from 'vue-router'
import Swaps from '../views/Swaps/index.vue';
import Friends from '../views/Friends/index.vue'
import Market from '../views/Market/index.vue'
import History from '../views/History/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('../views/Home/index.vue')
    },
    {
      path: '/market',
      name: 'market',
      component: Market
    },
    {
      path: '/swaps',
      name: 'swaps',
      component: Swaps
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends
    },
    {
      path: '/:pathMatch(.*)',
      name: 'home',
      component: ()=> import('../views/Home/index.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
  ]
})


export default router
