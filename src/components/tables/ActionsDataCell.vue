<template>
    <DataCell>
            <button class="btn btn-warning me-2" @click="$emit('onUpdateClick',value)">
                <font-awesome-icon icon="fa-solid fa-pencil"/>
            </button>
            <button class="btn btn-danger ms-2" @click="$emit('onDeleteClick',value)">
                <font-awesome-icon icon="fa-solid fa-trash"/>
            </button>
    </DataCell>
</template>

<script>
import DataCell from './DataCell.vue';
export default {
    name: "ActionsDataCell",
    components: {
        DataCell
    },
    props: {
        value: Object
    },
    emits: ["onUpdateClick","onDeleteClick"]
}
</script>

<style>

</style>