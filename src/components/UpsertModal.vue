<template>
  <div class="modal fade show" v-if="showModal" tabindex="-1" style="display:block" aria-modal="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" @click="hideModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" @click="hideModal" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "UpsertModal",
  props: {
    title: String,
    data: Object,
    visible: Boolean
  },
  data(){
    return {
      showModal: false
    }
  },
  emits: ['onclickHide'],
  watch: {
    visible: function(newVal) {
      this.showModal = newVal;
    }
  },
  methods: {
    hideModal(){
      this.$emit('onclickHide',null);
    }
  }
}
</script>

<style>

</style>