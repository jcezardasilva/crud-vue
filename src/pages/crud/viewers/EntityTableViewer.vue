<template>
    <div >
        <EntityBar 
        v-if="store.entity!==null"
        :viewMode="store.viewMode"
        @onClickAdd="openModalInsert" 
        @onClickRefresh="getItems" 
        @on-toggle-view-mode="toggleViewMode"
        @on-download="onDownload"
        :update="store.updatedAt"/>

        <DataTable  
        v-if="store.entity!==null" 
        :fields="store.table.fields"
        :items="store.table.items"
        @on-update-click="onEntityUpdateClick" 
        @on-delete-click="onEntityDeleteClick"
        @openMultilineItem="openJsonModal"/>
        
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
import DataTable from '@/components/tables/DataTable.vue';
import EntityModal from "@/components/modals/EntityModal.vue";
import JsonModal from '@/components/modals/JsonModal.vue';
import store from "@/core/store.js";
import {getAll} from "@/core/crudService";
import { downloadFile } from '@/core/fileService';

export default {
    name: 'EntityTableViewer',
    components: {
        EntityBar,
        DataTable,
        EntityModal,
        JsonModal
    },
    data(){
        return {
            store,
            fields: [],
            items: []
        }
    },
    watch: {
        "store.path": {
            handler(value, oldValue){
                if(value==oldValue)
                {
                    return;
                }
                const path = value;
                this.store.entity = this.store.crudEntities.find(p=> path.indexOf(p.path)>-1);
                if(this.store.entity){
                    this.loadEntity();
                }
            }
        }
    },
    mounted(){
        this.store.entity = this.store.crudEntities.find(p=> this.store.path.indexOf(p.path)>-1);
        this.loadEntity();
    },
    methods: {
        async loadEntity(){
            await this.getItems();
            this.clearSubEntity();
        },
        setFormPagination(){
            this.store.form.pagination = this.store.table.items.map((_,index)=> index+1);
        },
        async getItems(){
            this.store.table.fields = this.store.entity.fields;
            this.store.table.items = await getAll(this.store.path);
            this.setFormPagination();
            
            this.resetFormItemNumber();
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
        onDownload(format){
            let items = this.store.table.items;
            if(format==="xlsx"){
                items = items.map(item=>{
                    const keys = Object.keys(item);
                    for(const key of keys){
                        if(typeof item[key] === 'object' || Array.isArray(item[key])){
                            item[key] = JSON.stringify(item[key]);
                        }
                    }
                    return item;
                })
            }
            downloadFile(items,format);
        },
        clearSubEntity(){
            this.store.form.table.entity = "";
            this.store.form.table.fields = [];
            this.store.form.table.items = [];
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
  