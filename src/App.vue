<template>
  <div class="vh-100">
    <NavBar @-toggle-config="toggleConfig"/>
    <router-view ></router-view>
  </div>
</template>

<script>
import store from "@/core/store";
import { router } from "./router";
import NavBar from "@/components/NavBar.vue";
export default {
  name: 'App',
  data(){
    return {
      store
    }
  },
  components: {
    NavBar
  },
  methods: {
    toggleConfig(isConfigActive){
        const entities = isConfigActive ? this.store.systemEntities : this.store.businessEntities;
        this.store.crudEntities = entities.filter(e=> !e.isReadonly);
        router.push({ path: '/' });
    }
  }
}
</script>

<style>
</style>
