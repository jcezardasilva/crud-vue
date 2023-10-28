<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light shadow-sm ps-3 pe-3">
    <div class="d-flex justify-content-between w-100">
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
      <a href="#" class="mt-2" :class=" isConfigActive ?'text-primary' : 'text-secondary'" @click="toggleConfig">
        <font-awesome-icon icon="fa-solid fa-gear"/>
      </a>
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
      isConfigActive: false
    };
  },
  emits: ["ToggleConfig"],
  methods: {
    toggleConfig(){
      this.isConfigActive=!this.isConfigActive;
      this.$emit('ToggleConfig',this.isConfigActive);
    }
  }
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