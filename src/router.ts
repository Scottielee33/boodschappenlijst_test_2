import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BoodschappenLijst from './components/BoodschappenLijst.vue'
import HomePage from './components/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/boodschappenlijst', component: BoodschappenLijst },
  { path: '/', component: HomePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router