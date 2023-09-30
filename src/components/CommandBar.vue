<template>
  <div class="d-flex p-3 justify-content-between">
    <a href="#" @click="this.$emit('onClickAdd',null)">
        <font-awesome-icon icon="fa-solid fa-plus" class="text-success"/>
    </a>
    <div>
      <span class="update-time me-2" v-if="update!==null">{{ refresh() }}</span>
      <a class="ms-2" href="#" @click="this.$emit('onClickRefresh',null)">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
      </a>
      <a class="ms-2" href="#" @click="handleToggleViewMode">
        <font-awesome-icon icon="fa-solid fa-table" v-if="viewMode=='table'"/>
        <font-awesome-icon icon="fa-solid fa-file-lines" v-if="viewMode=='form'"/>
      </a>
    </div>
  </div>
</template>

<script>
import { toISOString } from '@/core/dateService';
export default {
    name: "CommandBar",
    emits: ["onClickAdd","onClickRefresh", "onToggleViewMode"],
    props: {
      update: {
        type: Date,
        default: null
      }
    },
    data(){
      return {
          viewMode: "table"
      }
    },
    methods: {
      refresh(){
        return toISOString(this.update);
      },
      handleToggleViewMode(){
        this.viewMode = this.viewMode=="table"? "form" : "table";
        this.$emit('onToggleViewMode',this.viewMode);
      }
    }
}
</script>

<style>

</style>