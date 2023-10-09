<template>
    <div>
        <EntityBar 
        v-if="store.entity!==null"
        @onClickAdd="openModalInsert" 
        @onClickRefresh="getItems" 
        @on-toggle-view-mode="toggleViewMode"
        :update="store.updatedAt"/>

        <DataForm 
        v-if="store.entity!==null && store.form.item!=null && store.viewMode=='form'" 
        @on-save="saveEntity" 
        @on-open-sub-entity="loadSubEntity"
        :fields="store.form.fields"
        :item="store.form.item"/>

        <PaginationBar 
        v-if="store.viewMode=='form' && store.form.item!=null" 
        :pages="store.form.pagination" 
        :value="store.form.itemNumber" 
        @on-change="changeFormPaginationItem"/>   
        
        <SubEntityTableViewer @on-save="onSaveSubEntity"/>
    </div>
</template>
  
<script>
import EntityBar from '@/components/EntityBar.vue';
import DataForm from '@/components/forms/DataForm.vue';
import PaginationBar from "@/components/PaginationBar.vue";
import SubEntityTableViewer from "@/pages/crud/viewers/SubEntityTableViewer.vue";
import store from "@/core/store.js";
import {getAll} from "@/core/crudService";

export default {
    name: 'EntityFormViewer',
    components: {
        EntityBar,
        DataForm,
        PaginationBar,
        SubEntityTableViewer
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
                const path = value.replace("\\","");
                this.store.entity = this.store.entities.find(p=> path.indexOf(p.path)>-1);
                if(this.store.entity){
                    this.loadEntity();
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
            this.store.form.table.name = item.name;
            this.store.form.table.label = item.label;
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
        onSaveSubEntity(){
            this.getItems();
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
  