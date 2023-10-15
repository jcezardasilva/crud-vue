<template>
  <div class="modal fade show" tabindex="-1" style="display:block" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" @click="hideModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>  
      <div class="modal-body">
        <VueJsoneditor 
        v-if="editor.value!==null"
        height="400"
        mode="tree"
        v-model:json="editor.value" 
        :mainMenuBar="editor.mainMenuBar"
        @change="handleChange"
        >

        </VueJsoneditor>

      </div>
      <div class="modal-footer">
        <FormFooter 
        :is-saving="saving" 
        :show-delete="false" 
        :show-save="true"
        @on-save-click="saveEntity">
          <button v-if="!editor.mainMenuBar" type="button" @click="editor.mainMenuBar= !editor.mainMenuBar" class="btn btn-secondary m-1" data-bs-dismiss="modal">Advanced Mode</button>
          <button v-if="editor.mainMenuBar" type="button" @click="editor.mainMenuBar= !editor.mainMenuBar" class="btn btn-secondary m-1" data-bs-dismiss="modal">Easy Mode</button>
          <button type="button" @click="hideModal" class="btn btn-secondary m-1" data-bs-dismiss="modal">{{ $t("form.footer.close")}}</button>
        </FormFooter>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueJsoneditor from 'vue3-ts-jsoneditor';
import FormFooter from "@/components/forms/FormFooter.vue";
import {saveEntity} from "@/core/crudService";
import store from "@/core/store";
export default {
  name: "JsonModal",
  components: {
    VueJsoneditor,
    FormFooter
  },  
  props: {
    title: String,
    values: [Array,Object]
  },
  data(){
    return {
      store,
      editor: {
        value: null,
        mainMenuBar: false
      },
      saving: false
    }
  },
  emits: ['onclickHide',"onEdit","onSave"],
  mounted(){
    this.setData();
  },
  methods: {
    isObject(value){
      return typeof value === 'object' && !Array.isArray(value) && value !== null;
    },
    async setData(){
      await this.$nextTick()
      this.editor.value = this.values;
    },
    hideModal(){
      this.store.modal.visible = false;
      this.$emit('onclickHide',null);
    },
    handleChange(content){
      const mapValues = this.store.modal.map;
      this.store.values[mapValues.key || mapValues.name] = content.json;
      this.$emit('onEdit',null);
    },
    async saveEntity(){
      this.saving = true;
      this.$nextTick(async ()=>{
        await saveEntity(this.store.path,this.store.form.item);
        this.saving = false;
        this.store.modal.visible = false;
        this.store.modal.map = null;
        this.$emit('onSave',null);
      })
    }
  }
}
</script>

<style>

</style>