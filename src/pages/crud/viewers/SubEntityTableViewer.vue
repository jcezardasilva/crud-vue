<template>
<div v-if="this.store.form.table.entity!=='' && store.viewMode=='form'" >
      <h5>{{ this.store.form.table.name + " | " + this.store.form.table.entity }}</h5>
      <DataTable 
      :fields="store.form.table.fields" 
      :items="store.form.table.items"
      @on-update-click="onSubEntityUpdateClick"
      @on-delete-click="onSubEntityDeleteClick"
      />
      
    <SubEntityModal 
    :title="store.modal.title"
    @onclickHide="onCloseModal" 
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
    emits: ["onSubEntityUpdateClick","onSubEntityDeleteClick","onCloseModal"],
    methods: {
        onSubEntityUpdateClick(value){
            this.store.form.table.index = value;
            this.store.form.table.action = "update";
            this.store.values = this.store.form.table.items[value];
            
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
            this.store.form.table.index = value;
            this.store.values = this.store.form.table.items[value];
            
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
        }
    }
  }
</script>
  
<style>
</style>
  