<template>
    <div class="d-flex">
        <slot></slot>
        <button type="button" v-if="isDeleteVisible()" @click="$emit('onDeleteClick',null)" :title="$t('form.footer.delete-tooltip')" class="btn m-1 btn-danger">
          {{ $t("form.footer.delete") }}
        </button>
        <button type="button" v-if="isSaveVisible()" @click="$emit('onSaveClick',null)" :title="$t('form.footer.save-tooltip')" class="btn m-1 btn-primary">
          {{ $t("form.footer.save") }}
        </button>
        <button class="btn m-1 btn-secondary"  type="button" disabled v-if="isSaving">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">{{ $t("loading") }}</span>
        </button>
    </div>
  </template>
  
  <script>
  import store from "@/core/store";
  
  export default {
    name: "FormFooter",
    data(){
      return {
        store
      }
    },
    props: {
      isSaving: Boolean,
      showDelete: Boolean,
      showSave: Boolean
    },
    emits: ["onSaveClick", "onDeleteClick"],
    methods: {
      isDeleteVisible(){
        return !this.isSaving && this.showDelete;
      },
      isSaveVisible(){
        return !this.isSaving && !this.showDelete;
      }
    }
  }
  </script>
  
  <style>
  
  </style>