<template>
  <div class="modal fade show" tabindex="-1" style="display:block" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" @click="hideModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>  
      <div class="modal-body">
        <p v-if="store.form.action=='delete'">Are you sure you want to delete this entity?</p>
        <FormInput v-for="(input,index) in filterFormFields()" :key="index" :options="input" :value="getFieldValue(input.name)" :disabled="store.form.action=='delete'"/>
      </div>
      <div class="modal-footer">
        <FormFooter 
        :is-saving="saving" 
        :show-delete="store.form.action=='delete'" 
        :show-save="store.form.action!=='delete'"
        @on-save-click="saveEntity" 
        @on-delete-click="deleteEntity">
          <button type="button" @click="hideModal" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("form.footer.cancel")}}</button>
        </FormFooter>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FormInput from "@/components/forms/FormInput.vue";
import FormFooter from "@/components/forms/FormFooter.vue";
import store from "@/core/store";
import {deleteEntity,saveEntity} from "@/core/crudService";

export default {
  name: "EntityModal",
  components: {
    FormInput,
    FormFooter
  },
  props: {
    title: String,
    columns: Object
  },
  data(){
    return {
      store,
      saving: false
    }
  },
  emits: ['onclickHide',"onSave"],
  watch: {
    visible: function(newVal) {
      this.showModal = newVal;
      if(newVal){
        this.store.values = {...this.store.form.item};
      }
    }
  },
  methods: {
    hideModal(){
      this.$emit('onclickHide',null);
    },
    filterFormFields(){
        const filtered = this.store.form.fields.filter(c =>[undefined,true].includes(c.visibleOnForm));
        return filtered;
    },
    getFieldValue(columnName){
        return columnName && this.store.form.item? this.store.form.item[columnName] : "";
    },
    async deleteEntity(){
      this.saving = true;
      this.$nextTick(async ()=>{
        await deleteEntity(this.store.currentEntity,this.store.form.item.id);
        this.saving = false;
        this.$emit('onSave',null);
      })
    },
    async saveEntity(){
      this.saving = true;
      this.$nextTick(async ()=>{
        await saveEntity(this.store.currentEntity,this.store.values);
        this.saving = false;
        this.$emit('onSave',null);
      })
    }
  }
}
</script>

<style>

</style>