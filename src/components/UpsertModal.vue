<template>
  <div class="modal fade show" v-if="showModal" tabindex="-1" style="display:block" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" @click="hideModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>  
      <div class="modal-body">
        <p v-if="formData.action=='delete'">Are you sure you want to delete this entity?</p>
        <FormInput v-for="(input,index) in filterFormFields(formData.columns)" :key="index" :options="input" :value="getFieldValue(input.name)" :disabled="formData.action=='delete'"/>
      </div>
      <div class="modal-footer">
        <button type="button" @click="hideModal" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" @click="saveEntity" class="btn" :class="formData.action=='delete'? 'btn-danger':'btn-primary'" v-if="!saving">Save</button>
        <button class="btn" :class="formData.action=='delete'? 'btn-danger':'btn-primary'" type="button" disabled v-if="saving">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="visually-hidden">Loading...</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FormInput from "./FormInput.vue";
import store from "@/core/store";
import {deleteEntity,saveEntity} from "@/core/crudService";

export default {
  name: "UpsertModal",
  components: {
    FormInput
  },
  props: {
    title: String,
    formData: Object,
    visible: Boolean,
    columns: Object
  },
  data(){
    return {
      store,
      saving: false,
      showModal: false
    }
  },
  emits: ['onclickHide',"onSave"],
  watch: {
    visible: function(newVal) {
      this.showModal = newVal;
      if(newVal){
        this.store.values = {...this.formData.row};
      }
    }
  },
  methods: {
    hideModal(){
      this.$emit('onclickHide',null);
    },
    filterFormFields(columns){
        return columns.filter(c =>[undefined,true].includes(c.visibleOnForm));
    },
    getFieldValue(columnName){
        return columnName && this.formData.row? this.formData.row[columnName] : "";
    },
    async saveEntity(){
      this.saving = true;
      if(this.formData.action=='delete'){
        await deleteEntity(this.store.currentPage,this.formData.row.id);
      } 
      else{
        await saveEntity(this.store.currentPage,this.store.values);
      }
      this.$emit('onSave',null);
      this.saving = false;
    }
  }
}
</script>

<style>

</style>