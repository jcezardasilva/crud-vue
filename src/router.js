import {createRouter,createWebHistory } from "vue-router";
import Home from './pages/HomePage.vue';
import People from "./pages/PeoplePage.vue";
const routes = [
    { path: '/', component: Home },
    { path: '/people', component: People }
  ]

export const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;