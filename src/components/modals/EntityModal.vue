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
        <FormInput v-for="(input,index) in visibleFields" :key="index" :options="input" :value="getFieldValue(input.name)" :disabled="store.form.action=='delete'"/>
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
    title: String
  },
  data(){
    return {
      store,
      saving: false,
      visibleFields: null
    }
  },
  emits: ['onclickHide',"onSave"],
  mounted(){
    this.visibleFields = this.filterFormFields();
  },
  methods: {
    hideModal(){
      this.$emit('onclickHide',null);
    },
    filterFormFields(){
        return this.store.modal.fields.filter(c =>[undefined,true].includes(c.visibleOnForm));
    },
    getFieldValue(columnName){
        return columnName && this.store.values? this.store.values[columnName] : "";
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