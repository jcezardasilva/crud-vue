<template>
<div v-if="store.form.table.entity!=='' && store.viewMode=='form'" >
    <h5>{{ store.form.table.label + " | " + store.form.table.entity }}</h5>

    <SubEntityBar 
    v-if="store.entity!==null"
    @onClickAdd="onSubEntityAddClick"/>
    
    <DataTable 
    :name="store.form.table.name"
    :fields="store.form.table.fields" 
    :items="store.form.table.items"
    @on-update-click="onSubEntityUpdateClick"
    @on-delete-click="onSubEntityDeleteClick"
    />
    
    <SubEntityModal 
    :title="store.modal.title"
    @onclickHide="onCloseModal" 
    @on-save="onSave"
    v-if="store.modal.type=='subEntity' && store.modal.visible"/>
</div>    
</template>
  
<script>
  import DataTable from "@/components/tables/DataTable.vue";
  import SubEntityBar from "@/components/SubEntityBar.vue";
  import SubEntityModal from "@/components/modals/SubEntityModal.vue";
  import store from "@/core/store.js";

  export default {
    name: 'SubEntityTableViewer',
    components: {
        DataTable,
        SubEntityBar,
        SubEntityModal
    },
    data(){
        return {
            store
        }
    },
    emits: ["onSubEntityAddClick","onSubEntityUpdateClick","onSubEntityDeleteClick","onCloseModal", "onSave"],
    methods: {
        onSubEntityAddClick(){
            this.store.form.table.index = this.store.form.table.items.length;
            this.store.form.table.map = null;
            this.store.values = {};

            this.store.modal = Object.assign(this.store.modal, {
                values: {},
                action: "insert",
                fields: this.store.form.table.fields,
                title: `Add Item to ${store.form.table.label}`,
                type: "subEntity",
                visible: true
            })
            this.$emit('onSubEntityAddClick');
        },
        onSubEntityUpdateClick(value){
            const index = value.id.value || value.id;
            this.store.form.table.index = index;
            this.store.form.table.map = value.id;
            this.store.values = this.store.form.table.items[index];
            
            this.store.modal = Object.assign(this.store.modal, {
                action: "update",
                fields: this.store.form.table.fields,
                title: `Update Item on ${store.form.table.label}`,
                type: "subEntity",
                visible: true
            })
            this.$emit('onSubEntityUpdateClick',value);
        },
        onSubEntityDeleteClick(value){
            const index = value.id.value || value.id;
            this.store.form.table.index = index;
            this.store.form.table.map = value;
            this.store.values = this.store.form.table.items[index];
            
            this.store.modal = Object.assign(this.store.modal, {
                action: "delete",
                fields: this.store.form.table.fields,
                title: `Update Item from ${store.form.table.label}`,
                type: "subEntity",
                visible: true
            })
            this.$emit('onSubEntityDeleteClick',value);
        },
        onCloseModal(){
            this.store.modal.visible = false;
            this.store.modal.map = null;
            this.$emit("onCloseModal");
        },
        onSave(){
            this.$emit('onSave');
        }
    }
  }
</script>
  
<style>
</style>
  