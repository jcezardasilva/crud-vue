<template>
  <div class="d-flex flex-column vh-100">
    <NavBar />
    <CommandBar 
    v-if="store.entity!==null"
    @onClickAdd="openModalInsert" 
    @onClickRefresh="getItems" 
    @on-toggle-view-mode="toggleViewMode"
    :update="store.updatedAt"/>
    <CrudDataTable  
      v-if="store.entity!==null && store.viewMode=='table'" 
      @on-update-click="onEntityUpdateClick" 
      @on-delete-click="onEntityDeleteClick"
      @openMultilineItem="openJsonModal"/>
    
    <DataForm v-if="store.entity!==null && store.viewMode=='form'" @on-save="saveEntity" @on-open-sub-entity="loadSubEntity"/>

    <PaginationBar v-if="store.viewMode=='form'" :pages="store.form.pagination" :value="store.form.itemNumber" @on-change="changeFormPaginationItem"/>
    <div v-if="this.store.form.table.entity!=='' && store.viewMode=='form'" >
      <h5>{{ this.store.form.table.name + " | " + this.store.form.table.entity }}</h5>
      <DataTable 
      :fields="store.form.table.fields" 
      :items="store.form.table.items"
      @on-update-click="onSubEntityUpdateClick"
      @on-delete-click="onSubEntityDeleteClick"
      />
    </div>
    

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
    "store.path": {
      handler(value, oldValue){
        if(value==oldValue)
        {
          return;
        }
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
    this.store.entity = this.store.entities.find(p=> this.store.path.indexOf(p.path)>-1);
    this.loadEntity();
  },
  methods: {
    async loadEntity(){
      this.getFields();
      this.getItems();
    },
    setFormPagination(){
      this.store.form.pagination = this.store.table.items.map((_,index)=> index+1);
    },
    getFields(){
      if(this.store.entity){
        this.store.table.fields = this.store.entity.fields;
      }
    },
    async getItems(){
      this.store.table.items = await getAll(this.store.entity.path);
      this.setFormPagination();
      this.resetFormItemNumber();
      this.loadFormItem();
      this.store.updatedAt = new Date();
    },
    async openModalInsert(){
      this.store.values = {};
      this.store.form.action = "insert";

      this.store.modal = Object.assign(this.store.modal,{
        fields: this.store.table.fields,
        title: "Insert Item",
        action: "insert",
        type: "entity",
        visible: true
      })
    },
    async onEntityUpdateClick(data){
      this.store.values = this.store.table.items.find(r=>r[data.id.field]==data.id.value);
      this.store.form.action = "update";

      this.store.modal = Object.assign(this.store.modal,{
        map: data,
        fields: this.store.table.fields,
        title: "Update Item",
        action: "update",
        type: "entity",
        visible: true
      })
    },
    async onEntityDeleteClick(data){
      this.store.values = this.store.table.items.find(r=>r[data.id.field]==data.id.value);
      this.store.form.action = "delete";
      
      this.store.modal = Object.assign(this.store.modal,{
        map: data,
        fields: this.store.table.fields,
        title: "Delete Item",
        action: "update",
        type: "entity",
        visible: true
      })
    },
    async onSubEntityUpdateClick(index){
      this.store.form.table.index = index;
      this.store.form.table.action = "update";
      this.store.values = this.store.form.table.items[index];
      
      this.store.modal = Object.assign(this.store.modal, {
        action: "update",
        fields: this.store.form.table.fields,
        title: "Update Item",
        type: "subEntity",
        visible: true
      })
    },
    async onSubEntityDeleteClick(index){
      this.store.form.table.index = index;
      this.store.values = this.store.form.table.items[index];
      
      this.store.modal = Object.assign(this.store.modal, {
        action: "delete",
        fields: this.store.form.table.fields,
        title: "Delete Item",
        type: "subEntity",
        visible: true
      })
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
      this.getItems();
    },
    openJsonModal(data){
      this.store.values = this.store.entities.find(entity=> entity[data.id.field] == data.id.value);
      
      this.store.modal.fields = this.store.form.table.fields;
      this.store.modal.values = data.value;
      this.store.modal.map = data;
      this.store.modal.title = data.label;
      this.store.modal.type = "json";
      this.store.modal.visible = true;
    },
    async toggleViewMode(value){
      this.store.viewMode = value;
      await this.getItems();
    },
    resetFormItemNumber(){
      this.store.form.itemNumber = 1;
    },
    async loadFormItem(){
      if(store.viewMode!=="form") return;
      this.store.form.fields = this.store.table.fields;
      this.store.form.item = this.store.table.items[this.store.form.itemNumber-1];
      this.store.form.action = "";
      this.$nextTick(()=>{
        this.setFormPagination();
      });
    },
    changeFormPaginationItem(value){
      this.store.form.itemNumber = value;
      this.loadFormItem();
      this.clearSubEntity();
    },
    loadSubEntity(item){
      this.store.form.table.name = item.label;
      this.store.form.table.entity = item.dataType.replace("[]","");
      const entity = this.store.entities.find(e=> e.name === this.store.form.table.entity);
      if(entity === null) return;
      
      this.store.form.table.fields = entity.fields;
      this.store.form.table.items = this.store.form.item[item.name];
    },
    clearSubEntity(){
      this.store.form.table.entity = "";
      this.store.form.table.fields = [];
      this.store.form.table.items = [];
    }
  }
}
</script>

<style>
</style>

