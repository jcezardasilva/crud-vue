<template>
    <thead>
        <tr>
            <HeaderCell scope="col" v-for="(col,index) in fields" :key="index">{{col.label}}</HeaderCell>
        </tr>
    </thead>
</template>

<script>
import HeaderCell from "./HeaderCell.vue";
export default {
    name: "TableHead",
    components: {
        HeaderCell
    },
    props: {
        fields: Array
    },
    data(){
        return {
            scopes: ["col","row","colgroup","rowgroup"]
        }
    }
}
</script>

<style>

</style>