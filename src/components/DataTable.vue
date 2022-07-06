<template>
    <table class="table">
    <thead>
        <tr>
        <th scope="col" v-for="(col,index) in filterColumns(columns)" :key="index">{{col.label}}</th>
        </tr>
    </thead>
    <tbody>
        <DataRow v-for="(values,index) in rows" :key="index" :values="filterValues(values)"/>
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
        rows: Array
    },
    methods: {
        filterValues(values){
            let result = [];
            for (let [key, value] of Object.entries(values)) {
                const column = this.filterColumns(this.columns).find(c => c.name === key);
                if(column){
                    result.push({
                        key: key,
                        value: value
                    })
                }
            }
            return result;
        },
        filterColumns(columns){
            return columns.filter(column => [undefined,true].includes(column.visible));
        }
    }
}
</script>

<style>

</style>