<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <CommandBar @onClickAdd="openModalInsert" @onClickRefresh="getData" @on-toggle-view-mode="toggleViewMode" v-if="entity!==null" :update="update"/>
    <DataTable  
      v-if="entity!==null && store.viewMode=='table'" 
      @update-entity="onUpdateEntity" 
      @delete-entity="onDeleteEntity"
      @openMultilineItem="openMultilineItem"/>
    
    <DataForm v-if="entity!==null && store.viewMode=='form'"/>

    <PaginationBar :pages="paginationList" v-if="store.viewMode=='form'" @on-change="changePaginationItem"/>

    <UpsertModal 
    :title="modalTitle" 
    :visible="modalVisible"
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
import PaginationBar from "@/components/PaginationBar.vue";
import DataTable from "@/components/DataTable.vue";
import DataForm from "@/components/forms/DataForm.vue";
import UpsertModal from "@/components/UpsertModal.vue";
import JsonModal from '@/components/JsonModal.vue';
import CommandBar from "@/components/CommandBar.vue";
import store from "@/core/store";
import {getAll} from "@/core/crudService";

export default {
  name: 'App',
  components: {
    PaginationBar,
    DataTable,
    DataForm,
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
      modalTitle: "",
      modalVisible: false,
      jsonData: [],
      jsonModalTitle: "Items",
      jsonModalVisible: false,
      paginationList: []
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
    },
    "store.viewMode": {
      handler(value,oldValue){
        if(value=="form" && value !== oldValue){
          this.loadFormItem();
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
    setPaginationList(){
      this.paginationList = this.store.data.items.map((_,index)=> index+1);
    },
    getColumns(){
      if(this.entity){
        this.store.data.fields = this.entity.fields;
      }
    },
    async getData(){
      this.store.data.items = await getAll(this.store.currentEntity);
      this.setPaginationList();
      this.loadFormItem();
      this.update = new Date();
    },
    async openModalInsert(){
      this.modalTitle = "Insert Item";
      this.store.form.fields = this.store.data.fields;
      this.store.form.item = null;
      this.store.form.action = "insert";
      this.modalVisible = true;
    },
    async openModalUpdate(data){
      this.modalTitle = "Update Item";
      this.store.form.fields = this.store.data.fields;
      this.store.form.item = data;
      this.store.form.action = "update";
      this.modalVisible = true;
    },
    async openModalDelete(data){
      this.modalTitle = "Delete Item";
      this.store.form.fields = this.store.data.fields;
      this.store.form.item = data;
      this.store.form.action = "delete";
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
      var data = this.store.data.items.find(r=>r.id==value);
      this.openModalUpdate(data);
    },
    async onDeleteEntity(value){
      var data = this.store.data.items.find(r=>r.id==value);
      this.openModalDelete(data);
    },
    openMultilineItem(data){
      this.jsonData = data;
      this.jsonModalTitle = data.label;
      this.jsonModalVisible = true;
    },
    toggleViewMode(value){
      this.store.viewMode = value;
    },
    loadFormItem(){
      this.store.form.fields = this.store.data.fields;
      this.store.form.item = this.store.data.items[this.store.form.itemNumber-1];
      this.store.form.action = "";
      this.$nextTick(()=>this.setPaginationList());
    },
    changePaginationItem(value){
      this.store.form.itemNumber = value;
      this.loadFormItem();
    }
  }
}
</script>

<style>
</style>

