<template>
    <tr>
        <th >{{data[0].value}}</th>
        <td v-for="(item,index) in filterData(data)" :key="index">
            <span v-if="item.value!=='actions' && !item.isMultiline">{{item.value}}</span>
            <div v-if="item.isMultiline">
                <button class="btn btn-secondary me-2" @click="onOpenMultilineItem(item)">
                    <font-awesome-icon icon="fa-solid fa-list"/>
                </button>
            </div>
            <div v-if="item.value=='actions' && !item.isMultiline">
                <button class="btn btn-warning me-2" @click="updateEntity(item.id)">
                    <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
                <button class="btn btn-danger ms-2" @click="deleteEntity(item.id)">
                    <font-awesome-icon icon="fa-solid fa-trash"/>
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: "DataRow",
    components: {
    },
    data(){
        return {
            modalData: []
        }
    },
    props: {
        data: Array
    },
    emits: ['updateEntity','deleteEntity','openMultilineItem'],
    methods:{
        filterData(data){
            data.shift();
            return data;
        },
        updateEntity(value){
            this.$emit('updateEntity',value);
        },
        deleteEntity(value){
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