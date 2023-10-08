<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <EntityViewer />
    <SubEntityTableViewer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import EntityViewer from "./viewers/EntityViewer.vue";
import SubEntityTableViewer from "./viewers/SubEntityTableViewer.vue";

export default {
  name: 'CrudPage',
  components: {
    NavBar,
    EntityViewer,
    SubEntityTableViewer
  }
}
</script>

<style>
</style>