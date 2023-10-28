<template>
  <div>
    <EntityTableViewer v-if="store.viewMode=='table'" />
    <EntityFormViewer v-if="store.viewMode=='form'" />
  </div>
</template>

<script>
import EntityFormViewer from "./viewers/EntityFormViewer.vue";
import EntityTableViewer from "./viewers/EntityTableViewer.vue";
import store from "@/core/store";

export default {
  name: 'CrudPage',
  components: {
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