<template>
  <div class="modal fade show" v-if="showModal" tabindex="-1" style="display:block" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" @click="hideModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>  
      <div class="modal-body">
        <VueJsoneditor 
        height="400"
        mode="tree"
        :json="data" >

        </VueJsoneditor>
      </div>
      <div class="modal-footer">
        <button type="button" @click="hideModal" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueJsoneditor from 'vue3-ts-jsoneditor';
export default {
  name: "DataTableModal",
  components: {
    VueJsoneditor
  },  
  props: {
    title: String,
    jsonData: Array,
    visible: Boolean,
    columns: Object
  },
  data(){
    return {
      showModal: false,
      editor: null,
      data: []
    }
  },
  emits: ['onclickHide',"onEdit"],
  watch: {
    visible: function(newVal) {
      this.showModal = newVal;
      if(newVal){
        this.setData();
      }
    }
  },
  methods: {
    setData(){
      this.data = this.jsonData;
    },
    hideModal(){
      this.$emit('onclickHide',null);
    },
    setEditor(){
      this.editor = new window.JSONEditor(this.$refs.editor, {
            mode: 'code',
            modes: ['code', 'form', 'text', 'tree', 'view'],
            theme: "ace/theme/pastel_on_dark"
        });
      this.editor.set({
        foo: "bar"
      });

      this.$refs.editor.addEventListener('keyup', () => {
        this.run();
      }); 
    },
    run() {
        try {
            let json = this.editor.get();
            console.log(json);
            this.$emit('onEdit',json);
        } catch (error) {         
          console.error(error);
        }
    }    
  }
}
</script>

<style>

</style>