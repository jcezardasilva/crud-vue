<template>
    <div class="crud-form card p-3 mt-1 mb-1">
        <div v-for="(input,index) in fields" :key="index" >
          <FormInput v-if="isLiteral(this.store.form.item[input.name])" :value="this.store.form.item[input.name]" :options="input" />
          <FormListButton v-if="Array.isArray(this.store.form.item[input.name])" :name="input.name" :label="input.label" @on-click="openList(input)"/>
          <FormTreeButton v-if="isObject(this.store.form.item[input.name])"  :name="input.name" :label="input.label" @on-click="openObject(input)"/>
        </div>
        <hr />
        <FormFooter @on-save="$emit('onSave')" :show-delete="true" :show-save="true" @on-save-click="saveEntity" @on-delete-click="deleteEntity"/>
    </div>
  </template>
  
  <script>
  import FormInput from "./FormInput.vue";
  import FormFooter from "./FormFooter.vue";
  import FormListButton from "./FormListButton.vue";
  import FormTreeButton from "./FormTreeButton.vue";
  import store from "@/core/store";
  import {deleteEntity,saveEntity, getKey} from "@/core/crudService";
  
  export default {
    name: "DataForm",
    components: {
      FormInput,
      FormFooter,
      FormListButton,
      FormTreeButton
    },
    data(){
      return {
        formId: null,
        store,
        saving: false
      }
    },
    props: {
      fields: Array,
      item: Object
    },
    emits: ["onSave","onOpenSubEntity", "onOpenObject"],
    watch: {
      "item": {
        handler(value,oldValue){
          if(value!==oldValue){
            this.init();
          }
        }
      }
    },
    methods: {
      init(){
        this.formId = this.$uuidv4();
        this.store.form.id = getKey(this.fields,this.item);
      },
      isObject(value){
        return typeof value === 'object' && !Array.isArray(value) && value !== null;
      },
      isLiteral(value){
        return typeof value !== 'object' && !Array.isArray(value) && value !== null;
      },
      filterFormFields(){
          const filtered = this.store.form.fields.filter(c =>[undefined,true].includes(c.visibleOnForm));
          return filtered;
      },
      createId(value){
        return this.$uuidv4() + value;
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