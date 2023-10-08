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
    emits: ['onUpdateClick','deleteEntity','openMultilineItem'],
    mounted(){
        this.fields = this.filterColumns();
    },
    methods: {
        mapValues(values){
            let result = [];
            const columns = this.filterColumns();
            let key = {
                field: null,
                value: null
            }
            for(const column of columns){
                const value = values[column.name];
                
                if(column.isKey || column.name == "id"){
                    key.field = column.name;
                    key.value = value;
                }

                if(column.name == "crud-actions" && this.showActions){
                    result.push({
                        id: key,
                        key: column.name,
                        label: 'Actions',
                        value: 'actions',
                        isMultiline: false
                    });
                }
                else{
                    result.push({
                        id: key,
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