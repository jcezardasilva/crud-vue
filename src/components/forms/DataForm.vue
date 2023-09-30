<template>
    <div class="crud-form card p-3 mt-1 mb-1">
        <div class="">
          <FormInput 
            v-for="(input,index) in filterFormFields()" 
            :key="index" 
            :options="input" 
            :value="getFieldValue(input.name)" />
        </div>
        <FormFooter @on-save="$emit('onSave')"/>
    </div>
  </template>
  
  <script>
  import FormInput from "./FormInput.vue";
  import FormFooter from "./FormFooter.vue";
  import store from "@/core/store";
  
  export default {
    name: "DataForm",
    components: {
      FormInput,
      FormFooter
    },
    data(){
      return {
        store,
        saving: false
      }
    },
    emits: ["onSave"],
    watch: {
    },
    methods: {
      filterFormFields(){
          const filtered = this.store.form.fields.filter(c =>[undefined,true].includes(c.visibleOnForm));
          return filtered;
      },
      getFieldValue(columnName){
          return columnName && this.store.form.item? this.store.form.item[columnName] : "";
      }
    }
  }
  </script>
  
  <style>
  
  </style>