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
import { mapValues } from "@/core/crudService";

export default {
    "name": "DataTable",
    components: {
        TableHead,
        TableRow
    },
    props: {
        name: String,
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
            tableItems: []
        }
    },
    emits: ['onUpdateClick','onDeleteClick','openMultilineItem'],
    watch: {
        "fields": {
            handler(value){
                this.loadFields(value);
            }
        },
        "items": {
            handler(value){
                this.loadItems(value);
            }
        },
    },
    mounted(){
        this.init();
    },
    methods: {
        async init(){
            this.loadFields();
            this.loadItems();
        },
        loadItems(){
            let result = [];
            this.items.forEach((item,i)=>{
                result.push(mapValues(this.tableFields,item,i));
            })
            this.tableItems = result;
        },
        loadFields(){
            let fields = this.fields;
            let actionsField = this.fields.find(f=>f.name=="crud-actions");
            if(this.showActions && !actionsField){
                fields.push({
                    name: "crud-actions",
                    label: "Actions",
                    visibleOnForm: false,
                    inputType: "actions"
                });
            }
            this.tableFields = fields.filter(column => [undefined,true].includes(column.visibleOnTable));
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