<template>
    <table class="table table-hover table-bordered table-sm">
    <thead>
        <tr>
            <th scope="col" v-for="(col,index) in filterColumns(columns)" :key="index">{{col.label}}</th>
        </tr>
    </thead>
    <tbody>
        <DataRow v-for="(values,index) in rows" :key="index" :data="mapValues(values)" 
        @update-entity="onUpdateEntity"
        @delete-entity="onDeleteEntity"
        @open-multiline-item="onOpenMultilineItem"
        />
    </tbody>
    </table>
</template>

<script>
import DataRow from "./DataRow.vue";

export default {
    "name": "DataTable",
    components: {
        DataRow
    },
    props: {
        columns: Array,
        rows: Array,
        showActions: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            actionsColumn: {
                name: "crud-actions",
                label: "Actions",
                visibleOnForm: false
            }
        }
    },
    emits: ['updateEntity','deleteEntity','openMultilineItem'],
    methods: {
        mapValues(values){
            let result = [];
            let id = "";
            for (let [key, value] of Object.entries(values)) {
                const column = this.filterColumns(this.columns).find(c => c.name === key);
                if(column){
                    if(column.isKey || column.name == "id"){
                        id = value;
                    }
                    result.push({
                        key: key,
                        label: column.label,
                        value: value,
                        isMultiline: column.dataType.indexOf("[]")>-1,
                    })
                }
            }
            if(this.showActions)
            {
                result.push({value: 'actions', id: id});
            }
            return result;
        },
        filterColumns(columns){
            if(this.showActions){
                columns = columns.concat([this.actionsColumn]);
            }
            return columns.filter(column => [undefined,true].includes(column.visibleOnTable));
        },
        onUpdateEntity(value){
            this.$emit('updateEntity',value);
        },
        onDeleteEntity(value){
            this.$emit('deleteEntity',value);
        },
        onOpenMultilineItem(value){
            this.$emit('openMultilineItem',value);
        }
    }
}
</script>

<style>

</style>