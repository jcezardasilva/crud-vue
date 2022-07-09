<template>
  <div class="d-flex p-3 justify-content-between">
    <a href="#" @click="this.$emit('onClickAdd',null)">
        <font-awesome-icon icon="fa-solid fa-plus" class="text-success"/>
    </a>
    <a href="#" @click="this.$emit('onClickRefresh',null)">
      <font-awesome-icon icon="fa-solid fa-rotate-right" />
    </a>
    
  </div>
</template>

<script>
export default {
    name: "CommandBar",
    emits: ["onClickAdd","onClickRefresh"]
}
</script>

<style>

</style>