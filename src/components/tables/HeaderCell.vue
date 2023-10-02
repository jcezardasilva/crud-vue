<template>
    <th :scope="scope">
        {{ value }}<slot></slot>
    </th>
</template>

<script>
export default {
    name: "HeaderCell",
    props: {
        value: String,
        scope: String
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