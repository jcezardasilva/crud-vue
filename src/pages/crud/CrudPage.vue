<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <EntityTableViewer v-if="store.viewMode=='table'" />
    <EntityFormViewer v-if="store.viewMode=='form'" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import EntityFormViewer from "./viewers/EntityFormViewer.vue";
import EntityTableViewer from "./viewers/EntityTableViewer.vue";
import store from "@/core/store";

export default {
  name: 'CrudPage',
  components: {
    NavBar,
    EntityFormViewer,
    EntityTableViewer
  },
  data(){
    return {
      store
    }
  }
}
</script>

<style>
</style>