<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <CommandBar 
    v-if="store.entity!==null"
    @onClickAdd="openModalInsert" 
    @onClickRefresh="getData" 
    @on-toggle-view-mode="toggleViewMode"
    :update="store.updatedAt"/>
    <CrudDataTable  
      v-if="store.entity!==null && store.viewMode=='table'" 
      @on-update-click="onEntityUpdateClick" 
      @on-delete-click="onEntityDeleteClick"
      @openMultilineItem="openJsonModal"/>
    
    <DataForm v-if="store.entity!==null && store.viewMode=='form'" @on-save="saveEntity"/>

    <PaginationBar v-if="store.viewMode=='form'" :pages="store.form.pagination" :value="store.form.itemNumber" @on-change="changeFormPaginationItem"/>

    <DataTable 
    v-if="this.store.form.multilineEntity!=='' && store.viewMode=='form'" 
    :fields="store.form.multilineFields" 
    :items="store.form.multilineItems"
    @on-update-click="onSubEntityUpdateClick"
    @on-delete-click="onSubEntityDeleteClick"
    />

    <EntityModal 
    :title="store.modal.title" 
    @onclickHide="closeModal" 
    @onSave="saveEntity"
    v-if="store.modal.type=='entity' && store.modal.visible"/>
    
    <SubEntityModal 
    :title="store.modal.title"
    @onclickHide="closeModal" 
    v-if="store.modal.type=='subEntity' && store.modal.visible"/>

    <JsonModal 
    v-if="store.modal.type=='json' && store.modal.visible"
    :title="store.modal.title" 
    :values="store.modal.values" 
    @onclick-hide="closeJsonModal"
    @onSave="saveEntity"/>
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
      store
    }
  },
  watch: {
    "store.currentEntity": {
      handler(value){
        const path = value.replace("\\","");
        this.store.entity = this.store.entities.find(p=> path.indexOf(p.path)>-1);
        if(this.store.entity){
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
    this.store.entity = this.store.entities.find(p=> this.store.currentEntity.indexOf(p.path)>-1);
    this.loadEntity();
  },
  methods: {
    async loadEntity(){
      this.getColumns();
      this.getData();
    },
    setFormPagination(){
      this.store.form.pagination = this.store.data.items.map((_,index)=> index+1);
    },
    getColumns(){
      if(this.store.entity){
        this.store.data.fields = this.store.entity.fields;
      }
    },
    async getData(){
      this.store.data.items = await getAll(this.store.currentEntity);
      this.setFormPagination();
      this.resetFormItemNumber();
      this.loadFormItem();
      this.store.updatedAt = new Date();
    },
    async openModalInsert(){
      this.store.values = {};
      this.store.form.fields = this.store.data.fields;
      this.store.form.action = "insert";
      this.store.modal.title = "Insert Item";
      this.store.modal.type = "entity";
      this.store.modal.visible = true;
    },
    async onEntityUpdateClick(data){
      this.store.form.fields = this.store.data.fields;
      this.store.values = this.store.data.items.find(r=>r[data.id.field]==data.id.value);
      this.store.modal.map = data;
      this.store.form.action = "update";
      this.store.modal.title = "Update Item";
      this.store.modal.type = "entity";
      this.store.modal.visible = true;
    },
    async onEntityDeleteClick(data){
      this.store.form.fields = this.store.data.fields;
      this.store.values = this.store.data.items.find(r=>r[data.id.field]==data.id.value);
      this.store.modal.map = data;
      this.store.form.action = "delete";
      this.store.modal.title = "Delete Item";
      this.store.modal.type = "entity";
      this.store.modal.visible = true;
    },
    async onSubEntityUpdateClick(index){
      this.store.form.multilineIndex = index;
      this.store.form.multilineAction = "update";
      this.store.values = this.store.form.multilineItems[index];
      this.store.modal.title = "Update Item";
      this.store.modal.type = "subEntity";
      this.store.modal.visible = true;
    },
    async onSubEntityDeleteClick(index){
      this.store.form.multilineIndex = index;
      this.store.form.multilineAction = "delete";
      this.store.values = this.store.form.multilineItems[index];
      this.store.modal.title = "Delete Item";
      this.store.modal.type = "subEntity";
      this.store.modal.visible = true;
    },
    async closeModal(){
      this.store.modal.visible = false;
      this.store.modal.map = null;
    },
    closeJsonModal(){
      this.store.modal.visible = false;
    },
    async saveEntity(){
      this.store.modal.visible = false;
      this.getData();
    },
    openJsonModal(data){
      this.store.values = this.store.entities.find(entity=> entity[data.id.field] == data.id.value);
      this.store.modal.values = data.value;
      this.store.modal.map = data;
      this.store.modal.title = data.label;
      this.store.modal.type = "json";
      this.store.modal.visible = true;
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
        this.setFormPagination();
      });
    },
    changeFormPaginationItem(value){
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

