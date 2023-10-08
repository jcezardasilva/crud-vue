<template>
    <table class="table table-hover table-bordered table-sm">
    <thead>
        <tr>
            <HeaderCell scope="col" v-for="(col,index) in fields" :key="index">{{col.label}}</HeaderCell>
        </tr>
    </thead>
    <tbody>
        <TableRow v-for="(item,index) in store.table.items" :key="index" :items="mapValues(item)"
        @on-update-click="onUpdateClick"
        @on-delete-click="onDeleteClick"
        @open-multiline-item="onOpenMultilineItem"
        />
    </tbody>
    </table>
</template>

<script>
import store from "@/core/store";
import HeaderCell from "./HeaderCell.vue";
import TableRow from "./TableRow.vue";
import { mapValues } from "@/core/crudService";

export default {
    "name": "CrudDataTable",
    components: {
        HeaderCell,
        TableRow
    },
    props: {
        showActions: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            store,
            fields: [],
            actionsColumn: {
                name: "crud-actions",
                label: "Actions",
                visibleOnForm: false
            }
        }
    },
    emits: ['onUpdateClick','onDeleteClick','openMultilineItem'],
    mounted(){
        this.$nextTick(()=>{
            this.fields = this.filterColumns();
        })
    },
    methods: {
        mapValues(values){
            return mapValues(this.fields,values, this.showActions);
        },
        filterColumns(){
            let columns = [...this.store.table.fields];
            if(this.showActions){
                columns = columns.concat([this.actionsColumn]);
            }
            return columns.filter(column => [undefined,true].includes(column.visibleOnTable));
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