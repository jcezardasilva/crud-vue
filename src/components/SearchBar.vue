<template>
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" aria-label="Search" :aria-describedby="id" @keyup="onChange" v-model="text">
        <a href="#" class="input-group-text" :id="id" @click="onSearch">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-secondary"/>
        </a>
    </div>
</template>
<script>
export default {
    name: "SearchBar",
    data(){
        return {
            id: "",
            text: ""
        }
    },
    emits: ["onChange","onSearch"],
    mounted(){
        this.id = this.$uuidv4();
    },
    methods: {
        onChange(event){
            this.text = event.target.value;
            this.$emit("onChange",event.target.value);
        },
        onSearch(){
            this.$emit("onSearch",this.text);
        }
    }
}
</script>
<style>
    
</style>