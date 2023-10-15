<template>
    <div class="crud-form p-3 mt-1 mb-1">
        <FormInputs :fields="store.form.fields" :item="store.form.item" @onOpenList="openList" @onOpenObject="openObject"/>
        <hr />
        <FormFooter @on-save="$emit('onSave')" :show-delete="true" :show-save="true" @on-save-click="saveEntity" @on-delete-click="deleteEntity"/>
    </div>
  </template>
  
  <script>
  import FormInputs from "@/components/forms/FormInputs.vue";
  import FormFooter from "@/components/forms/FormFooter.vue";
  import store from "@/core/store";
  import {deleteEntity,saveEntity, getKey} from "@/core/crudService";
  
  export default {
    name: "DataForm",
    components: {
      FormInputs,
      FormFooter
    },
    data(){
      return {
        store,
        saving: false
      }
    },
    emits: ["onSave","onOpenSubEntity", "onOpenObject"],
    watch: {
      "store.form.item": {
        handler(value,oldValue){
          if(value!==oldValue){
            this.init();
          }
        }
      }
    },
    methods: {
      init(){
        this.store.form.id = getKey(this.store.form.fields,this.store.form.item);
      },
      openList(item){
        this.$emit('onOpenSubEntity',item);
      },
      openObject(item){
        this.$emit('onOpenObject',item);
      },
      async deleteEntity(){
        this.saving = true;
        this.$nextTick(async ()=>{
          await deleteEntity(this.store.entity.path,this.store.values[this.store.form.id.field]);
          this.saving = false;
          this.$emit('onSave',null);
        })
      },
      async saveEntity(){
        this.saving = true;
        this.$nextTick(async ()=>{
          await saveEntity(this.store.entity.path,this.store.values);
          this.saving = false;
          this.$emit('onSave',null);
        })
      }
    }
  }
  </script>
  
  <style>
  
  </style>