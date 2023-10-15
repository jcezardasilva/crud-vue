<template>
    <div>
        <DynamicInput class="mb-3" v-if="dynamicType && !multiValue"
        :name="options.name" 
        :label="options.label" 
        :disabled="disabled" 
        :value="value"
        :inputType="options.inputType"
        @change="changeValue"
        />

        <CheckBox class="mb-3" v-if="options.inputType==='checkbox'" 
        :name="options.name" 
        :label="options.label" 
        :disabled="disabled" 
        :value="value"
        @change="changeValue"/>

        <MultTextInput class="mb-3" v-if="options.dataType=='string[]'" 
        :name="options.name" 
        :label="options.label" 
        :disabled="disabled" 
        :value="value"
        @change="changeMultiValue"
        />
        
        <TextInput class="mb-3" v-if="options.dataType=='string'"
        :name="options.name"
        :label="options.label"
        :disabled="disabled"
        :value="value"/>
        
        <TextArea class="mb-3" v-if="options.inputType=='textarea'"
        :name="options.name"
        :label="options.label"
        :disabled="disabled"
        :value="value"
        @change="changeValue"></TextArea>
    </div>
</template>

<script>
import DynamicInput from './DynamicInput.vue';
import CheckBox from "@/components/forms/CheckBox.vue";
import MultTextInput from './MultTextInput.vue';
import TextInput from './TextInput.vue';
import TextArea from "@/components/forms/TextArea.vue";
import store from "@/core/store";

export default {
    name: "FormInput",
    components: {
        DynamicInput,
        CheckBox,
        MultTextInput,
        TextInput,
        TextArea
    },
    props: {
        options: Object,
        value: [String,Boolean, Array, Number],
        disabled: Boolean
    },
    data(){
        return {
            store,
            fieldId: "",
            dynamicType: false,
            multiValue: false,
            inputTypes: ["color","date","datetime-local","email","file","image","month","number","password","tel","time","url","week"]
        }
    },
    watch: {
        "options": {
            handler(value){
                this.init(value);
            },
            deep: true
        }
    },
    mounted(){
        this.fieldId = this.$uuidv4() + this.options.name;
        this.checkType();
    },
    emits: ["changeValue"],
    methods: {
        init(){
            this.checkType();
            this.isMultivalue();
        },
        checkType(){
            this.dynamicType = this.inputTypes.includes(this.options.inputType);
        },
        isMultivalue(){
            this.multiValue = this.options.dataType.indexOf('[]')>-1
        },
        changeValue(event){
            const value = typeof event === 'object' ? event.target.value : event;
            this.store.values[this.options.name] = value;
            this.$emit('changeValue',value);
        },
        changeMultiValue(values){
            this.store.values[this.options.name] = values;
            this.$emit('changeValue',values);
        }
    }
}
</script>

<style>

</style>