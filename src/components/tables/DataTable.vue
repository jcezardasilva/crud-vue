<template>
    <table class="table table-hover table-bordered table-sm">
        <TableHead :fields="tableFields"/>
        <tbody>
            <TableRow v-for="(values,index) in tableItems" :key="index" :items="values" 
            @on-update-click="onUpdateClick"
            @on-delete-click="onDeleteClick"
            @open-multiline-item="onOpenMultilineItem"
            />
        </tbody>
    </table>
</template>

<script>
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";

export default {
    "name": "DataTable",
    components: {
        TableHead,
        TableRow
    },
    props: {
        fields: Array,
        items: Array,
        showActions: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            tableFields: [],
            tableItems: [],
            actionsColumn: {
                name: "crud-actions",
                label: "Actions",
                visibleOnForm: false
            }
        }
    },
    emits: ['onUpdateClick','onDeleteClick','openMultilineItem'],
    mounted(){
        this.filterColumns();
        this.mapItems();
    },
    methods: {
        mapItems(){
            let result = [];
            [...this.items].forEach((item,i)=>{
                result.push(this.mapValues(item,i));
            })
            this.tableItems = result;
        },
        mapValues(values, i){
            let result = [];
            let id = "";
            const columns = this.filterColumns();
            
            columns.forEach((column)=>{

                const value = values[column.name];
                
                if(column.isKey || column.name == "id"){
                    id = value;
                }
                if(column.name == "crud-actions" && this.showActions){
                    result.push({value: 'actions', id: id || i.toString()});
                }
                else{
                    result.push({
                        key: column.name,
                        label: column.label,
                        value: value || "",
                        isMultiline: (column.dataType || "string").indexOf("[]")>-1,
                    })
                }
            })
            return result;
        },
        filterColumns(){
            let columns = [...this.fields];
            if(this.showActions){
                columns.push({
                    name: "crud-actions",
                    label: "Actions",
                    visibleOnForm: false
                });
            }
            this.tableFields = columns.filter(column => [undefined,true].includes(column.visibleOnTable));
            return this.tableFields;
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