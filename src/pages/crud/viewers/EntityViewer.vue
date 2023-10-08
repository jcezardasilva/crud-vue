<template>
    <div>
        <EntityBar 
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
        
        <DataForm 
        v-if="store.entity!==null && store.viewMode=='form'" 
        @on-save="saveEntity" 
        @on-open-sub-entity="loadSubEntity"
        :fields="store.form.fields"
        :item="store.form.item"/>
        <PaginationBar v-if="store.viewMode=='form'" :pages="store.form.pagination" :value="store.form.itemNumber" @on-change="changeFormPaginationItem"/>

        <EntityModal 
        :title="store.modal.title" 
        @onSave="saveEntity"
        v-if="store.modal.type=='entity' && store.modal.visible"/>        

        <JsonModal 
        v-if="store.modal.type=='json' && store.modal.visible"
        :title="store.modal.title" 
        :values="store.modal.values" 
        @onSave="saveEntity"/>        
    </div>
</template>
  
<script>
import EntityBar from '@/components/EntityBar.vue';
import CrudDataTable from '@/components/tables/CrudDataTable.vue';
import DataForm from '@/components/forms/DataForm.vue';
import EntityModal from "@/components/modals/EntityModal.vue";
import JsonModal from '@/components/modals/JsonModal.vue';
import PaginationBar from "@/components/PaginationBar.vue";
import store from "@/core/store.js";
import {getAll} from "@/core/crudService";

export default {
    name: 'EntityViewer',
    components: {
        EntityBar,
        CrudDataTable,
        DataForm,
        EntityModal,
        JsonModal,
        PaginationBar
    },
    data(){
        return {
            store
        }
    },
    mounted(){
        this.store.entity = this.store.entities.find(p=> this.store.path.indexOf(p.path)>-1);
        this.loadEntity();
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
        }
    },
    methods: {
        async loadEntity(){
            this.getFields();
            this.getItems();
            this.clearSubEntity();
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
            if(this.store.viewMode=="table"){
                this.resetFormItemNumber();
            }
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
        async saveEntity(){
            this.loadEntity();
        },
        resetFormItemNumber(){
            this.store.form.itemNumber = 1;
        },
        
        async onEntityUpdateClick(data){
            if(data.id.field === null) {
                throw Error("id not found.");
            }
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
        changeFormPaginationItem(value){
            this.store.form.itemNumber = value;
            this.loadFormItem();
            this.clearSubEntity();
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
        },
        async closeModal(){
            this.store.modal.visible = false;
            this.store.modal.map = null;
        },
        async toggleViewMode(value){
            this.store.viewMode = value;
            await this.getItems();
            this.loadFormItem();
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
        async loadFormItem(){
            if(store.viewMode!=="form") return;
            this.store.form.fields = this.store.table.fields;
            this.store.form.item = this.store.table.items[this.store.form.itemNumber-1];
            this.store.values = this.store.form.item;
            this.store.form.action = "";
            this.$nextTick(()=>{
                this.setFormPagination();
            });
        },
    }
}
</script>
  
<style></style>
  