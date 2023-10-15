<template>
    <div class="dropdown">
        <a :id="id" data-bs-toggle="dropdown" aria-expanded="false">
            <font-awesome-icon icon="fa-solid fa-download" />
        </a>
        <ul class="dropdown-menu" :aria-labelledby="id">
            <li class="dropdown-item" @click="$emit('onJson')">JSON</li>
            <li class="dropdown-item" @click="$emit('onCsv')">CSV</li>
            <li class="dropdown-item" @click="$emit('onXlsx')">XLSX</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "DownloadMenu",
    emits: ["onJson","onCsv","onXlsx","onClose"],
    data(){
        return {
            id: null
        }
    },
    mounted(){
        this.id = this.$uuidv4();
    },
    methods: {
        onClose(){
            console.log("focus out");
        }
    }
}
</script>
<style scoped>
a,li {
    cursor: pointer;
}
</style>