<template>
    <component v-if="currentInput!==''" :is="currentInput" 
    :name="options.name" 
    :label="options.label" 
    :disabled="disabled" 
    :value="value"
    :inputType="options.inputType"
    @change="changeValue"></component>
</template>

<script>
import DynamicInput from './DynamicInput.vue';
import CheckBox from "@/components/forms/CheckBox.vue";
import MultiTextInput from './MultiTextInput.vue';
import TextInput from './TextInput.vue';
import TextArea from "@/components/forms/TextArea.vue";
import store from "@/core/store";

export default {
    name: "FormInput",
    components: {
        DynamicInput,
        CheckBox,
        MultiTextInput,
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
            currentInput: "",
            inputNames: ["DynamicInput","CheckBox","MultiTextInput","TextInput","TextArea"],
            store,
            fieldId: "",
            dynamicType: false,
            multiValue: false
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
        this.init();
    },
    emits: ["changeValue"],
    methods: {
        init(){
            this.setInputType();
        },
        setInputType(){
            const inputs = {
                "bool": "Checkbox",
                "string[]": "MultiTextInput",
                "string": "TextInput",
                "textarea": "TextArea",
                "color": "DynamicInput",
                "date": "DynamicInput",
                "datetime-local": "DynamicInput",
                "email": "DynamicInput",
                "file": "DynamicInput",
                "image": "DynamicInput",
                "month": "DynamicInput",
                "number": "DynamicInput",
                "password": "DynamicInput",
                "tel": "DynamicInput",
                "time": "DynamicInput",
                "url": "DynamicInput",
                "week": "DynamicInput"
            }
            if(this.options.inputType ==="actions") return;
            if(this.options.dataType in inputs){
                this.currentInput = inputs[this.options.dataType];
                return;
            }
            if(this.options.inputType in inputs){
                this.currentInput = inputs[this.options.inputType];
                return;
            }
            throw Error(`Unknown input type for '${this.options.dataType}'`);
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