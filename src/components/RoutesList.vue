<template>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
        <li class="nav-item" >
            <router-link
            class='nav-link'
            @click="activeItem='Home'"
            aria-current="page"
            href="#"
            to="/"
            >Home</router-link>
        </li>
        <li class="nav-item" v-for="(item,index) in store.crudEntities" :key="index">
            <router-link
            class='nav-link'
            :class="item.type=='system' ? 'text-primary': ''"
            @click="setActiveItem(item.name)"
            aria-current="page"
            href="#"
            :to=item.path
            >{{ item.name }}</router-link>
        </li>
    </ul>
</template>

<script>
import store from "../core/store";
export default {
    name: "RoutesList",
    data(){
        return {
            store
        }
    },
    methods: {
        setActiveItem(item){
            this.activeItem = item;
        }
    }
}
</script>

<style scoped>
.nav-item .router-link-active {
  font-weight: bold;
}
</style>