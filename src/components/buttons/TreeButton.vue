<template>
    <button class="btn btn-secondary me-2 tree-button " @click="$emit('onClick')">
        <font-awesome-icon icon="fa-solid fa-folder-tree"/>
    </button>
</template>

<script>
export default {
    name: "TreeButton",
    emits: ["onClick"]
}
</script>

<style scoped>
.tree-button {
    width: 40px;
}
</style>