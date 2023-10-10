<template>
    <div class="mb-3">
        <label :for="id" class="form-label">{{ label }}</label>
        <div class="w-100">
            <TreeButton :id="id" class="form-control" @onClick="$emit('onClick')"/> 
        </div>
    </div>
</template>

<script>
import TreeButton from "@/components/buttons/TreeButton.vue";

export default {
    name: "FormListButton",
    components: {
        TreeButton
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