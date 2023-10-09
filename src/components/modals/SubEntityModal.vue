<template>
  <div class="modal fade show" tabindex="-1" style="display:block" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" @click="hideModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>  
      <div class="modal-body">
        <p v-if="store.modal.action=='delete'">Are you sure you want to delete this entity?</p>
        <FormInput v-for="(input,index) in filterFormFields()" :key="index" :options="input" :value="getFieldValue(input.name)" :disabled="store.modal.action=='delete'"/>
      </div>
      <div class="modal-footer">
        <FormFooter @onSaveClick="saveEntity" @onDeleteClick="deleteSubEntity" :show-delete="store.modal.action=='delete'" :show-save="store.modal.action!=='delete'">
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
import { saveEntity } from "@/core/crudService";
import store from "@/core/store";

export default {
  name: "SubEntityModal",
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
      saving: false,
      visibleFields: null
    }
  },
  emits: ['onclickHide',"onSave"],
  methods: {
    hideModal(){
      this.$emit('onclickHide',null);
    },
    mounted(){
      this.visibleFields = this.filterFormFields();
    },
    filterFormFields(){
        return this.store.modal.fields.filter(c =>[undefined,true].includes(c.visibleOnForm));
    },
    getFieldValue(columnName){
        const index = this.store.form.table.index;
        const subEntity =this.store.form.table.items[index];
        return subEntity[columnName];
    },
    async deleteSubEntity(){
      this.saving = true;
      this.$nextTick(async ()=>{
        this.store.form.item[this.store.form.table.name] = this.store.form.item[this.store.form.table.name].filter(v=> v.name !== this.store.values.name);
        await saveEntity(this.store.entity.path,this.store.form.item);
        this.saving = false;
        this.store.modal.visible = false;
        this.$emit('onSave',null);
      })
    },
    async saveEntity(){
      this.saving = true;
      this.$nextTick(async ()=>{
        
        this.store.form.item[this.store.form.table.name] = this.store.form.item[this.store.form.table.name].map(v=> {
          if(v.name === this.store.values.name){
            return this.store.values;
          }
          return v;
        });
        await saveEntity(this.store.entity.path,this.store.form.item);
        this.saving = false;
        this.store.modal.visible = false;
        this.$emit('onSave',null);
      })
    }
  }
}
</script>

<style>

</style>