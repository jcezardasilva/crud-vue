<template>
    <div class="mb-3">
        <label :for="id" class="form-label">{{ label }}</label>
        <div class="w-100">
            <ListButton :id="id" class="form-control" @onClick="$emit('onClick')"/> 
        </div>
    </div>
</template>

<script>
import ListButton from "./ListButton.vue";
export default {
    name: "FormListButton",
    components: {
        ListButton
    },
    emits: ["onClick"],
    data(){
        return {
            id: null
        }
    },
    props: {
        name: String,
        label: String
    },
    mounted(){
        this.id = this.$uuidv4() + this.name;
    },
}
</script>

<style scoped>
</style>