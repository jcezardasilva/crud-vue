<template>
    <div>
        <label :for="fieldId" >{{label}}</label>
        <input 
        class="form-control" 
        type="text"
        :id="fieldId"
        :value="value"
        @change="changeValue"
        :disabled="disabled" >
    </div>
</template>

<script>

export default {
    name: "TextInput",
    props: {
        name: String,
        label: String,
        value: String,
        disabled: Boolean
    },
    data(){
        return {
            fieldId: ""
        }
    },
    mounted(){
        this.fieldId = this.$uuidv4() + this.name;
    },
    emits: ["change"],
    methods: {
        changeValue(event){
            this.$emit('change',event.target.value);
        }
    }
}
</script>

<style>

</style>