<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <CommandBar @onClickAdd="openModalInsert" @onClickRefresh="getData" v-if="page!==null" :update="update"/>
    <DataTable :columns="columns" :rows="rows" v-if="page!==null" @update-entity="onUpdateEntity" @delete-entity="onDeleteEntity"/>
    <UpsertModal 
    :title="modalTitle" 
    :visible="modalVisible" 
    :formData="modalData" 
    @onclickHide="closeModal" 
    @onSave="saveEntity"
    v-if="page!==null"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import DataTable from "@/components/DataTable.vue";
import UpsertModal from "@/components/UpsertModal.vue";
import CommandBar from "@/components/CommandBar.vue";
import store from "@/core/store";
import {getAll} from "@/core/crudService";

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
      update: null,
      page: null,
      store,
      rows: [],
      modalTitle: "",
      modalVisible: false,
      columns: [],
      modalData: {
        columns: null,
        row: null,
        action: "upsert"
      }
    }
  },
  watch: {
    "store.currentPage": {
      handler(value){
        const path = value.replace("\\","");
        this.page = this.store.pages.find(p=> path.indexOf(p.path)>-1);
        if(this.page){
          this.loadPage();
        }
      }
    }
  },
  mounted(){
    this.page = this.store.pages.find(p=> this.store.currentPage.indexOf(p.path)>-1);
    this.loadPage();
  },
  methods: {
    async loadPage(){
      this.getPageColumns();
      this.getData();
    },
    async getData(){
      this.rows = await getAll(this.store.currentPage);
      this.update = new Date();
    },
    async openModalInsert(){
      this.modalTitle = "Insert Item";
      this.modalData.columns = this.columns;
      this.modalData.action = "insert";
      this.modalVisible = true;
    },
    async openModalUpdate(data){
      this.modalTitle = "Update Item";
      this.modalData.columns = this.columns;
      this.modalData.row = data;
      this.modalData.action = "update";
      this.modalVisible = true;
    },
    async openModalDelete(data){
      this.modalTitle = "Delete Item";
      this.modalData.columns = this.columns;
      this.modalData.row = data;
      this.modalData.action = "delete";
      this.modalVisible = true;
    },
    async closeModal(){
      this.modalVisible = false;
    },
    async saveEntity(){
      this.modalVisible = false;
      this.getData();
    },
    async onUpdateEntity(value){
      var data = this.rows.find(r=>r.id==value);
      this.openModalUpdate(data);
    },
    async onDeleteEntity(value){
      var data = this.rows.find(r=>r.id==value);
      this.openModalDelete(data);
    },
    getPageColumns(){
      if(this.page){
        this.columns = this.page.fields;
      }
    }
  }
}
</script>

<style>
</style>

