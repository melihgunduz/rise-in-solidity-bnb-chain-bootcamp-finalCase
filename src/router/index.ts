import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
