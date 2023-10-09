<template>
<div v-if="store.form.table.entity!=='' && store.viewMode=='form'" >
      <h5>{{ store.form.table.label + " | " + store.form.table.entity }}</h5>
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
  import SubEntityModal from "@/components/modals/SubEntityModal.vue";
  import store from "@/core/store.js";

  export default {
    name: 'SubEntityTableViewer',
    components: {
        DataTable,
        SubEntityModal
    },
    data(){
        return {
            store
        }
    },
    emits: ["onSubEntityUpdateClick","onSubEntityDeleteClick","onCloseModal", "onSave"],
    methods: {
        onSubEntityUpdateClick(value){
            const index = value.id.value || value.id;
            this.store.form.table.index = index;
            this.store.form.table.map = value.id;
            this.store.values = this.store.form.table.items[index];
            
            this.store.modal = Object.assign(this.store.modal, {
                action: "update",
                fields: this.store.form.table.fields,
                title: "Update Item",
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
                title: "Delete Item",
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
  