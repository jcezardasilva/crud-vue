<template>
  <NavBar />
  <DataTable :columns="columns" :rows="rows"/>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
</style>
