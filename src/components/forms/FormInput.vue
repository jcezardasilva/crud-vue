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
        <div class="mb-3" v-if="options.inputType=='textarea'">
            <label :for="fieldId" >{{options.label}}</label>
            <textarea 
            :type="options.inputType" 
            class="form-control" 
            :id="fieldId"
            :value="value"
            @change="changeValue"
            :disabled="disabled==true"
            ></textarea>
        </div>
    </div>
</template>

<script>
import store from "@/core/store";

export default {
    name: "FormInput",
    props: {
        options: Object,
        value: String,
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
            this.store.values[this.options.name] = event.target.value;
            this.$emit('changeValue',event.target.value);
        }
    }
}
</script>

<style>

</style>