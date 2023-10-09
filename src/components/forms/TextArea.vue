<template>
    <div class="mb-3">
        <label :for="fieldId" >{{label}}</label>
        <textarea 
        :type="options.inputType" 
        class="form-control" 
        :id="fieldId"
        :value="value"
        @change="changeValue"
        :disabled="disabled==true"
        ></textarea>
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
            this.$emit('change',event.target.value);
        }
    }
}
</script>

<style>

</style>