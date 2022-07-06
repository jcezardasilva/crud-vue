<template>
  <DataTable :columns="columns" :rows="rows"/>
</template>

<script>
import DataTable from "./components/DataTable.vue";
import crudService from "./core/crudService";

export default {
  name: 'App',
  components: {
    DataTable
  },
  data(){
    return {
      columns: [{
                    name: "id",
                    label: "#",
                    dataType: String
                },{
                    name: "first",
                    label: "First",
                    dataType: String
                },{
                    name: "last",
                    label: "Last",
                    dataType: String
                },{
                    name: "handle",
                    label: "Handle",
                    dataType: String,
                    visible: false
                }],
      rows: null
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
    async getData(){
        this.rows = await crudService.getAll();
    }  
  }
}
</script>

<style>
</style>
