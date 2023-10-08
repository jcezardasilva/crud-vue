<template>
    <button class="btn btn-secondary me-2 list-button " @click="$emit('onClick')">
        <font-awesome-icon icon="fa-solid fa-list"/>
    </button>
</template>

<script>
export default {
    name: "ListButton",
    emits: ["onClick"]
}
</script>

<style scoped>
.list-button {
    width: 40px;
}
</style>