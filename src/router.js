import {createRouter,createWebHistory } from "vue-router";
import Home from './pages/HomePage.vue';
import Crud from "./pages/CrudPage.vue";
import store from "./core/store";

export const routes = [
    { path: '/', component: Home },
    { path: '/crud', component: Crud }
  ]

export function addRoute(path){
  routes.push({ path: path.startsWith("/")? path: `/${path}`, component: Crud });
}

export function router(){
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  router.beforeEach((to, from, next) => {
    store.currentPage = to.path;
    next();
  });

  return router;
}