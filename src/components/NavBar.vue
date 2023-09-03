<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light shadow-sm ps-3 pe-3">
    <div class="d-flex justify-content-between">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsable-navbar"
        aria-controls="collapsable-navbar"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsable-navbar">
        <RoutesList />
      </div>
    </div>
  </nav>
  <header class="navbar navbar-expand-lg"></header>
</template>

<script>
import RoutesList from "@/components/RoutesList.vue";
export default {
  name: "NavBar",
  components: {
    RoutesList
  },
  data() {
    return {
      activeItem: true
    };
  },
};
</script>

<style scoped>
header {
  margin-top: 0px;
  margin-left: 1px;
  margin-bottom: 10px;
  display: flex;
}

img {
  width: 120px;
}
</style>