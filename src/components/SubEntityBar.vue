<template>
  <div class="d-flex p-3 justify-content-between">
    <a href="#" @click="this.$emit('onClickAdd',null)">
        <font-awesome-icon icon="fa-solid fa-plus" class="text-success"/>
    </a>
  </div>
</template>

<script>
export default {
    name: "SubEntityBar",
    emits: ["onClickAdd"]
}
</script>

<style>

</style>