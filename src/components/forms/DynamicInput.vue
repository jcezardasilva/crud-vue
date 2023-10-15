<template>
    <div>
        <label :for="fieldId" >{{label}}</label>
        <input 
        class="form-control" 
        :type="inputType" 
        :id="fieldId" 
        :value="value"
        @change="changeValue"
        :disabled="disabled"
        >
    </div>
</template>

<script>

export default {
    name: "DynamicInput",
    props: {
        name: String,
        label: String,
        value: Boolean,
        inputType: String,
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