<template>
    <div class="d-flex">
        <slot></slot>
        <button type="button" v-if="isDeleteVisible()" @click="deleteEntity" :title="$t('form.footer.delete-tooltip')" class="btn m-1 btn-danger">{{ $t("form.footer.delete") }}</button>
        <button type="button" v-if="isSaveVisible()" @click="saveEntity" :title="$t('form.footer.save-tooltip')" class="btn m-1 btn-primary">{{ $t("form.footer.save") }}</button>
        <button class="btn m-1 btn-secondary"  type="button" disabled v-if="saving">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">{{ $t("loading") }}</span>
        </button>
    </div>
  </template>
  
  <script>
  import store from "@/core/store";
  import {deleteEntity,saveEntity} from "@/core/crudService";
  
  export default {
    name: "FormFooter",
    data(){
      return {
        store,
        saving: false
      }
    },
    emits: ["onSave"],
    methods: {
      filterFormFields(columns){
          const filtered = [...columns].filter(c =>[undefined,true].includes(c.visibleOnForm));
          return filtered;
      },
      getFieldValue(columnName){
          return columnName && this.store.form.item? this.store.form.item[columnName] : "";
      },
      async deleteEntity(){
        this.saving = true;
        await deleteEntity(this.store.currentEntity,this.store.form.item.id);
        this.saving = false;
        this.$emit('onSave',null);
      },
      async saveEntity(){
        this.saving = true;
        await saveEntity(this.store.currentEntity,this.store.values);
        this.saving = false;
        this.$emit('onSave',null);
      },
      isDeleteVisible(){
        return !this.saving && (store.form.action==='' || store.form.action==='delete');
      },
      isSaveVisible(){
        return !this.saving && (store.form.action==='' || store.form.action!=='delete');
      }
    }
  }
  </script>
  
  <style>
  
  </style>