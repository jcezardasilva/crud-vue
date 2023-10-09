<template>
    <div class="mb-3 form-check">
        <input 
        class="form-check-input" 
        type="checkbox" 
        :id="fieldId" 
        :checked="value"
        @change="changeValue"
        :disabled="disabled"
        >
        <label :for="fieldId" >{{label}}</label>
    </div>
</template>

<script>

export default {
    name: "CheckBox",
    props: {
        name: String,
        label: String,
        value: Boolean,
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
            this.$emit('change',event.target.checked);
        }
    }
}
</script>

<style>

</style>