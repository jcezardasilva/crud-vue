<template>
  <div class="modal fade show" tabindex="-1" style="display:block" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" @click="hideModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>  
      <div class="modal-body">
        <p v-if="store.form.multilineAction=='delete'">Are you sure you want to delete this entity?</p>
        <FormInput v-for="(input,index) in filterFormFields()" :key="index" :options="input" :value="getFieldValue(input.name)" :disabled="store.form.multilineAction=='delete'"/>
      </div>
      <div class="modal-footer">
        <FormFooter @on-save="$emit('onSave')" :show-delete="store.form.multilineAction=='delete'" :show-save="store.form.multilineAction!=='delete'">
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
      saving: false
    }
  },
  emits: ['onclickHide',"onSave"],
  methods: {
    hideModal(){
      this.$emit('onclickHide',null);
    },
    filterFormFields(){
        const filtered = this.store.form.multilineFields.filter(c =>[undefined,true].includes(c.visibleOnForm));
        return filtered;
    },
    getFieldValue(columnName){
        const index = this.store.form.multilineIndex;
        const multilineItem =this.store.form.multilineItems[index];
        return columnName && multilineItem? multilineItem[columnName] : "";
    }
  }
}
</script>

<style>

</style>