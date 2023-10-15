<template>
  <div class="d-flex p-3 justify-content-between">
    <div>
      <a href="#" @click="this.$emit('onClickAdd',null)">
          <font-awesome-icon icon="fa-solid fa-plus" class="text-success"/>
      </a>
      <a class="ms-2" href="#" @click="this.$emit('onClickRefresh',null)">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
      </a>
      <span class="update-time ms-2" v-if="update!==null">{{ refresh() }}</span>
    </div>
    <div class="d-flex">
      <DownloadMenu class="text-primary"
      @on-json="onDownloadJson"
      @on-csv="onDownloadCsv"
      @on-xlsx="onDownloadXlsx"
      @on-close="showDownloadMenu=false"
      />  
      <a class="ms-2" href="#" @click="handleToggleViewMode">
        <font-awesome-icon icon="fa-solid fa-table" v-if="viewMode=='table'"/>
        <font-awesome-icon icon="fa-solid fa-file-lines" v-if="viewMode=='form'"/>
      </a>
    </div>
  </div>
</template>

<script>
import { toISOString } from '@/core/dateService';
import DownloadMenu from '@/components/DownloadMenu.vue';
export default {
    name: "EntityBar",
    emits: ["onClickAdd","onClickRefresh", "onToggleViewMode", "onDownload"],
    components: {
      DownloadMenu
    },
    props: {
      viewMode: String,
      update: {
        type: Date,
        default: null
      }
    },
    methods: {
      refresh(){
        return toISOString(this.update);
      },
      handleToggleViewMode(){
        const viewMode = this.viewMode=="table"? "form" : "table";
        this.$emit('onToggleViewMode',viewMode);
      },
      onDownloadClick(event){
        this.top = (event.pageY || event.clientY)+20;
        this.left = (event.pageX || event.clientX)-20;
        this.showDownloadMenu = true;
      },
      onDownloadJson(){
        this.$emit("onDownload","json");
      },
      onDownloadCsv(){
        this.$emit("onDownload","csv");
      },
      onDownloadXlsx(){
        this.$emit("onDownload","xlsx");
      }
    }
}
</script>

<style scoped>
</style>