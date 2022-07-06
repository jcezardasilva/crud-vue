<template>
    <tr>
        <td v-for="(value,key,index) in values" :key="index">{{value.value}}</td>
    </tr>
</template>

<script>
export default {
    name: "DataRow",
    props: {
        values: Object
    },
    data(){
        return {

        }
    }
}
</script>

<style>

</style>