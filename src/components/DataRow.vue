<template>
    <tr>
        <th >{{values[0].value}}</th>
        <td v-for="(value,index) in filterValues(values)" :key="index">
            <span v-if="value.value!=='actions'">{{value.value}}</span>
            <div v-if="value.value=='actions'">
                <button class="btn btn-warning me-2" @click="updateEntity(value.id)">
                    <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
                <button class="btn btn-danger ms-2" @click="deleteEntity(value.id)">
                    <font-awesome-icon icon="fa-solid fa-trash"/>
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: "DataRow",
    props: {
        values: Array
    },
    data(){
        return {

        }
    },
    emits: ['updateEntity','deleteEntity'],
    methods:{
        filterValues(values){
            values.shift();
            return values;
        },
        updateEntity(value){
            this.$emit('updateEntity',value);
        },
        deleteEntity(value){
            this.$emit('deleteEntity',value);
        }
    }
}
</script>

<style>

</style>