<template>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
        <li class="nav-item">
            <router-link
            class='nav-link'
            @click="activeItem='Home'"
            aria-current="page"
            href="#"
            to="/"
            >Home</router-link>
        </li>
        <li class="nav-item">
            <router-link
            class='nav-link'
            @click="activeItem='People'"
            aria-current="page"
            href="#"
            to="/people"
            >People</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "RoutesList",
}
</script>

<style scoped>
.nav-item .router-link-active {
  font-weight: bold;
}
</style>