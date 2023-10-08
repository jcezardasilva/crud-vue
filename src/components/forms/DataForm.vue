<template>
    <div class="crud-form card p-3 mt-1 mb-1">
        <div v-for="(input,index) in filterFormFields()" :key="index" >
          <FormInput v-if="!Array.isArray(this.store.form.item[input.name])" :value="this.store.form.item[input.name]" :options="input" />
          <FormListButton v-if="Array.isArray(this.store.form.item[input.name])" :name="input.name" :label="input.label" @on-click="openSubEntity(input)"/>
        </div>
        <hr />
        <FormFooter @on-save="$emit('onSave')" :show-delete="true" :show-save="true" @on-save-click="saveEntity" @on-delete-click="deleteEntity"/>
    </div>
  </template>
  
  <script>
  import FormInput from "./FormInput.vue";
  import FormFooter from "./FormFooter.vue";
  import FormListButton from "@/components/buttons/FormListButton.vue";
  import store from "@/core/store";
  import {deleteEntity,saveEntity} from "@/core/crudService";
  
  export default {
    name: "DataForm",
    components: {
      FormInput,
      FormFooter,
      FormListButton
    },
    data(){
      return {
        formId: null,
        store,
        saving: false
      }
    },
    emits: ["onSave","onOpenSubEntity"],
    mounted(){
        this.formId = this.$uuidv4();
    },    
    methods: {
      init(){
      },
      filterFormFields(){
          const filtered = this.store.form.fields.filter(c =>[undefined,true].includes(c.visibleOnForm));
          return filtered;
      },
      createId(value){
        return this.$uuidv4() + value;
      },
      openSubEntity(item){
        this.$emit('onOpenSubEntity',item);
      },
      async deleteEntity(){
        this.saving = true;
        this.$nextTick(async ()=>{
          await deleteEntity(this.store.entity.path,this.store.values[this.store.modal.map.id.field]);
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