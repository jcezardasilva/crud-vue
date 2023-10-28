<template>
    <div>
        <label :for="fieldId" >{{label}}<small>&nbsp;(multiple)</small></label>
        <Vue3TagsInput 
        :tags="value" 
        placeholder="press Enter after write to add a new value" 
        :read-only="disabled"
        @on-tags-changed="changeValue"/>
    </div>
</template>

<script>
import Vue3TagsInput from 'vue3-tags-input';

export default {
    name: "MultiTextInput",
    components: {
        Vue3TagsInput
    },
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
        changeValue(values){
            this.$emit('change',values);
        }
    }
}
</script>

<style>

</style>