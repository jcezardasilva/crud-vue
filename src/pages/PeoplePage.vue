<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <CommandBar @onClickAdd="openModalInsert" @onClickRefresh="getData"/>
    <DataTable :columns="columns" :rows="rows"/>
    <UpsertModal :title="modalTitle" :visible="modalVisible" :data="modalData" @onclickHide="closeModal"/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import DataTable from "../components/DataTable.vue";
import UpsertModal from "../components/UpsertModal.vue";
import CommandBar from "../components/CommandBar.vue";

import crudService from "./../core/crudService";

export default {
  name: 'App',
  components: {
    DataTable,
    NavBar,
    CommandBar,
    UpsertModal
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
      rows: null,
      modalTitle: "",
      modalVisible: false,
      modalData: null
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
    async getData(){
        this.rows = await crudService.getAll();
    }  
    ,async openModalInsert(){
      this.modalTitle = "Insert Person"
      this.modalVisible = true;
    },
    async closeModal(){
      this.modalVisible = false;
    }
  }
}
</script>

<style>
</style>
