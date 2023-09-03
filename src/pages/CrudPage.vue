<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <CommandBar @onClickAdd="openModalInsert" @onClickRefresh="getData" v-if="entity!==null" :update="update"/>
    <DataTable 
    :columns="columns" 
    :rows="rows" 
    v-if="entity!==null" 
    @update-entity="onUpdateEntity" 
    @delete-entity="onDeleteEntity"
    @openMultilineItem="openMultilineItem"/>
    <UpsertModal 
    :title="modalTitle" 
    :visible="modalVisible" 
    :formData="modalData" 
    @onclickHide="closeModal" 
    @onSave="saveEntity"
    v-if="entity!==null"/>
    
    <JsonModal 
    :title="jsonModalTitle" 
    :visible="jsonModalVisible" 
    :jsonData="jsonData" 
    @onclick-hide="closeJsonModal"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import DataTable from "@/components/DataTable.vue";
import UpsertModal from "@/components/UpsertModal.vue";
import JsonModal from '@/components/JsonModal.vue';
import CommandBar from "@/components/CommandBar.vue";
import store from "@/core/store";
import {getAll} from "@/core/crudService";

export default {
  name: 'App',
  components: {
    DataTable,
    NavBar,
    CommandBar,
    UpsertModal,
    JsonModal
  },
  data(){
    return {
      update: null,
      entity: null,
      store,
      rows: [],
      modalTitle: "",
      modalVisible: false,
      jsonData: [],
      jsonModalTitle: "Items",
      jsonModalVisible: false,
      columns: [],
      modalData: {
        columns: null,
        row: null,
        action: "insert"
      }
    }
  },
  watch: {
    "store.currentEntity": {
      handler(value){
        const path = value.replace("\\","");
        this.entity = this.store.entities.find(p=> path.indexOf(p.path)>-1);
        if(this.entity){
          this.loadEntity();
        }
      }
    }
  },
  mounted(){
    this.entity = this.store.entities.find(p=> this.store.currentEntity.indexOf(p.path)>-1);
    this.loadEntity();
  },
  methods: {
    async loadEntity(){
      this.getColumns();
      this.getData();
    },
    getColumns(){
      if(this.entity){
        this.columns = this.entity.fields;
      }
    },
    async getData(){
      this.rows = await getAll(this.store.currentEntity);
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
    closeJsonModal(){
      this.jsonModalVisible = false;
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
    openMultilineItem(data){
      this.jsonData = data;
      this.jsonModalTitle = data.label;
      this.jsonModalVisible = true;
    }
  }
}
</script>

<style>
</style>

