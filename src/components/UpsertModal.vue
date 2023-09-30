<template>
  <div class="modal fade show" v-if="showModal" tabindex="-1" style="display:block" aria-modal="true">
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
        <FormFooter @on-save="$emit('onSave')">
          <button type="button" @click="hideModal" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("form.footer.cancel")}}</button>
        </FormFooter>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FormInput from "./forms/FormInput.vue";
import FormFooter from "./forms/FormFooter.vue";
import store from "@/core/store";

export default {
  name: "UpsertModal",
  components: {
    FormInput,
    FormFooter
  },
  props: {
    title: String,
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
    }
  }
}
</script>

<style>

</style>