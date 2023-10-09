<template>
    <tr>
        <HeaderCell scope="row">{{headerItem.value}}</HeaderCell>
        <DataCell v-for="(item,index) in dataItems" :key="index">
            <span v-if="item.value!=='actions' && !item.isMultiline">{{item.value}}</span>
            <ListButton v-if="item.isMultiline" @click="onOpenMultilineItem(item)"/>
        </DataCell>
        <ActionsDataCell v-if="actionsItem!==null" :value="actionsItem" @onUpdateClick="onUpdateClick" @onDeleteClick="onDeleteClick"/>
    </tr>
</template>

<script>
import ActionsDataCell from './ActionsDataCell.vue';
import DataCell from './DataCell.vue';
import HeaderCell from './HeaderCell.vue';
import ListButton from "@/components/buttons/ListButton.vue";
export default {
    name: "TableRow",
    components: {
        ActionsDataCell,
        DataCell,
        HeaderCell,
        ListButton
    },
    data(){
        return {
            headerItem: {},
            dataItems: [],
            actionsItem: null
        }
    },
    props: {
        items: Array
    },
    watch: {
        "items": function(value, oldValue){
            if(value!== oldValue){
                this.filterData();
            }
        }
    },
    emits: ['onUpdateClick','onDeleteClick','openMultilineItem'],
    mounted(){
        this.filterData();
    },
    methods:{
        filterData(){
            const data = [...this.items];
            this.actionsItem = data.find(i=> i.value==="actions");
            this.headerItem = data[0];
            data.shift();
            this.dataItems = data.filter(i=>i.value!=="actions");
        },
        onUpdateClick(value){
            this.$emit('onUpdateClick',value);
        },
        onDeleteClick(value){
            this.$emit('onDeleteClick',value);
        },
        onOpenMultilineItem(value){
            this.$emit('openMultilineItem',value);
        }
    }
}
</script>

<style>

</style>