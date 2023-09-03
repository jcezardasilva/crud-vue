<template>
  <div class="d-flex p-3 justify-content-between">
    <a href="#" @click="this.$emit('onClickAdd',null)">
        <font-awesome-icon icon="fa-solid fa-plus" class="text-success"/>
    </a>
    <div>
      <span class="me-2" v-if="update!==null">{{ refresh() }}</span>
      <a class="ms-2" href="#" @click="this.$emit('onClickRefresh',null)">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
    name: "CommandBar",
    emits: ["onClickAdd","onClickRefresh"],
    props: {
      update: {
        type: Date,
        default: null
      }
    },
    methods: {
      refresh(){
        return this.update.toISOString().slice(0, 19).replace('T', ' ');
      }
    }
}
</script>

<style>

</style>