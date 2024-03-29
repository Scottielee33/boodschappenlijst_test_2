import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BoodschappenLijst from './components/Boodschappenlijst.vue'
import HomePage from './components/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/boodschappenlijst/:id', component: BoodschappenLijst },
    { path: '/', component: HomePage }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router