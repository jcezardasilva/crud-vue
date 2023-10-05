<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <CommandBar 
    v-if="entity!==null"
    @onClickAdd="openModalInsert" 
    @onClickRefresh="getData" 
    @on-toggle-view-mode="toggleViewMode"
    :update="update"/>
    <CrudDataTable  
      v-if="entity!==null && store.viewMode=='table'" 
      @on-update-click="onEntityUpdateClick" 
      @on-delete-click="onEntityDeleteClick"
      @openMultilineItem="openMultilineItem"/>
    
    <DataForm v-if="entity!==null && store.viewMode=='form'" @on-save="saveEntity"/>

    <PaginationBar v-if="store.viewMode=='form'" :pages="paginationList" :value="store.form.itemNumber" @on-change="changePaginationItem"/>

    <DataTable 
    v-if="this.store.form.multilineEntity!=='' && store.viewMode=='form'" 
    :fields="store.form.multilineFields" 
    :items="store.form.multilineItems"
    @on-update-click="onSubEntityUpdateClick"
    @on-delete-click="onSubEntityDeleteClick"
    />

    <EntityModal 
    :title="modalTitle" 
    @onclickHide="closeModal" 
    @onSave="saveEntity"
    v-if="entity!==null && modalVisible"/>
    
    <SubEntityModal 
    :title="modalTitle"
    @onclickHide="closeModal" 
    v-if="Object.keys(store.values).length>0 && modalVisible"/>

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
import CrudDataTable from "@/components/tables/CrudDataTable.vue";
import DataTable from "@/components/tables/DataTable.vue";
import DataForm from "@/components/forms/DataForm.vue";
import EntityModal from "@/components/modals/EntityModal.vue";
import SubEntityModal from "@/components/modals/SubEntityModal.vue";
import JsonModal from '@/components/modals/JsonModal.vue';
import CommandBar from "@/components/CommandBar.vue";
import store from "@/core/store";
import {getAll} from "@/core/crudService";

export default {
  name: 'CrudPage',
  components: {
    PaginationBar,
    CrudDataTable,
    DataTable,
    DataForm,
    NavBar,
    CommandBar,
    EntityModal,
    SubEntityModal,
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
      this.resetFormItemNumber();
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
    async onEntityUpdateClick(value){
      const data = this.store.data.items.find(r=>r.id==value);
      this.modalTitle = "Update Item";
      this.store.form.fields = this.store.data.fields;
      this.store.form.item = data;
      this.store.form.action = "update";
      this.modalVisible = true;
    },
    async onEntityDeleteClick(value){
      const data = this.store.data.items.find(r=>r.id==value);
      this.modalTitle = "Delete Item";
      this.store.form.fields = this.store.data.fields;
      this.store.form.item = data;
      this.store.form.action = "delete";
      this.modalVisible = true;
    },
    async onSubEntityUpdateClick(index){
      const data = this.store.form.multilineItems[index];
      this.store.form.multilineIndex = index;
      this.store.form.multilineAction = "update";
      this.modalTitle = "Update Item";
      this.store.values = data;
      this.modalVisible = true;
    },
    async onSubEntityDeleteClick(index){
      const data = this.store.form.multilineItems[index];
      this.store.form.multilineIndex = index;
      this.store.form.multilineAction = "delete";
      this.modalTitle = "Delete Item";
      this.store.values = data;
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
    openMultilineItem(data){
      this.jsonData = data;
      this.jsonModalTitle = data.label;
      this.jsonModalVisible = true;
    },
    async toggleViewMode(value){
      this.store.viewMode = value;
      await this.getData();
    },
    resetFormItemNumber(){
      this.store.form.itemNumber = 1;
    },
    async loadFormItem(){
      if(store.viewMode!=="form") return;
      
      this.store.form.fields = this.store.data.fields;
      this.store.form.item = this.store.data.items[this.store.form.itemNumber-1];
      this.store.form.action = "";
      this.$nextTick(()=>{
        this.loadSubEntity();
        this.setPaginationList();
      });
    },
    changePaginationItem(value){
      this.store.form.itemNumber = value;
      this.loadFormItem();
    },
    loadSubEntity(){
      const multiline = this.store.form.fields.filter(f=> f.dataType.indexOf("[]")>-1);
      if(multiline.length==0){
        this.store.form.multilineEntity = "";
        this.store.form.multilineItems = [];
        this.store.form.multilineFields = [];
        return;
      }
      const item = multiline[0];
      this.store.form.multilineEntity = item.dataType.replace("[]","");
      const entity = this.store.entities.find(e=> e.name === this.store.form.multilineEntity);
      if(entity === null)
      {
        this.store.form.multilineFields = [];
        this.store.form.multilineItems = [];
        return;
      }
      this.store.form.multilineFields = entity.fields;
      this.store.form.multilineItems = this.store.form[item.name];
    }
  }
}
</script>

<style>
</style>

