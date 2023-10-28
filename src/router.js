import {createRouter,createWebHistory } from "vue-router";
import Home from './pages/HomePage.vue';
import Crud from "./pages/crud/CrudPage.vue";
import store from "./core/store";

export let router = null;
export const routes = [
    { path: '/', component: Home }
  ]

export function addRoute(path){
  routes.push({ path: `/${path}`, component: Crud });
}
export function addRoutes(paths){
  for(const path of paths){
    addRoute(path);
  }
}
export function setRoutes(paths){
  for(const path of paths){
    addRoute(path);
  }
}

export function routerBuilder(){
  router = createRouter({
    history: createWebHistory(),
    routes,
  })
  router.beforeEach((to, from, next) => {
    store.path = to.path.replace("/","");
    next();
  });

  return router;
}