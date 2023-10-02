<template>
    <table class="table table-hover table-bordered table-sm">
    <thead>
        <tr>
            <HeaderCell scope="col" v-for="(col,index) in filterColumns()" :key="index">{{col.label}}</HeaderCell>
        </tr>
    </thead>
    <tbody>
        <TableRow v-for="(values,index) in store.data.items" :key="index" :items="mapValues(values)" 
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

export default {
    "name": "DataTable",
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
    emits: ['onUpdateClick','deleteEntity','openMultilineItem'],
    methods: {
        mapValues(values){
            let result = [];
            let id = "";
            const columns = this.filterColumns();
            
            for(const column of columns){
                const value = values[column.name];
                
                if(column.isKey || column.name == "id"){
                    id = value;
                }
                if(column.name == "crud-actions" && this.showActions){
                    result.push({value: 'actions', id: id});
                }
                else{
                    result.push({
                        key: column.name,
                        label: column.label,
                        value: value || "",
                        isMultiline: (column.dataType || "string").indexOf("[]")>-1,
                    })
                }
            }
            return result;
        },
        filterColumns(){
            let columns = [...this.store.data.fields];
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