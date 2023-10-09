<template>
    <div>
        <div class="mb-3" v-if="inputTypes.includes(options.inputType)">
            <label :for="fieldId" >{{options.label}}</label>
            <input 
            class="form-control" 
            :type="options.inputType" 
            :id="fieldId" 
            :value="value"
            @change="changeValue"
            :disabled="disabled"
            >
        </div>
        <CheckBox v-if="options.inputType==='checkbox'" 
        :name="options.name" 
        :label="options.label" 
        :disabled="disabled" 
        :value="value"
        @change="changeValue"/>
        
        <TextArea v-if="options.inputType=='textarea'"
        :name="options.name"
        :label="options.label"
        :disabled="disabled"
        :value="value"
        @change="changeValue"></TextArea>
    </div>
</template>

<script>
import CheckBox from "@/components/forms/CheckBox.vue";
import TextArea from "@/components/forms/TextArea.vue";
import store from "@/core/store";

export default {
    name: "FormInput",
    components: {
        CheckBox,
        TextArea
    },
    props: {
        options: Object,
        value: [String,Boolean],
        disabled: Boolean
    },
    data(){
        return {
            store,
            fieldId: "",
            inputTypes: ["color","date","datetime-local","email","file","image","month","number","password","tel","text","time","url","week"]
        }
    },
    mounted(){
        this.fieldId = this.$uuidv4() + this.options.name;
    },
    methods: {
        changeValue(event){
            const value = typeof event === 'object' ? event.target.value : event;
            this.store.values[this.options.name] = value;
            this.$emit('changeValue',value);
        }
    }
}
</script>

<style>

</style>