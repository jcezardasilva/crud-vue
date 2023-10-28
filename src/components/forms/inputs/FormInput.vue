<template>
    <component v-if="currentInput!==''" :is="currentInput" 
    :name="options.name" 
    :label="options.label" 
    :disabled="disabled" 
    :value="inputValue"
    :inputType="options.inputType"
    @change="changeValue"></component>
</template>

<script>
import DynamicInput from '@/components/forms/inputs/DynamicInput.vue';
import CheckBox from "@/components/forms/inputs/CheckBox.vue";
import MultiTextInput from '@/components/forms/inputs/MultiTextInput.vue';
import TextInput from '@/components/forms/inputs/TextInput.vue';
import TextArea from "@/components/forms/inputs/TextArea.vue";
import JsonInput from './JsonInput.vue';
import store from "@/core/store";

export default {
    name: "FormInput",
    components: {
        DynamicInput,
        CheckBox,
        MultiTextInput,
        TextInput,
        TextArea,
        JsonInput
    },
    props: {
        options: Object,
        value: [String,Boolean, Array, Number],
        disabled: Boolean
    },
    data(){
        return {
            currentInput: "",
            inputNames: ["DynamicInput","CheckBox","MultiTextInput","TextInput","TextArea","JsonInput"],
            store,
            fieldId: "",
            dynamicType: false,
            multiValue: false,
            inputValue: null
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
        this.init(this.value);
    },
    emits: ["changeValue"],
    methods: {
        init(value){
            this.setInputType(value);
        },
        setInputType(value){
            const inputs = {
                "bool": "Checkbox",
                "string[]": "MultiTextInput",
                "object[]": "JsonInput",
                "object": "JsonInput",
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
                this.inputValue = value;
                return;
            }
            if(this.options.inputType in inputs){
                this.currentInput = inputs[this.options.inputType];
                this.inputValue = value;
                return;
            }
            const entityName = this.options.dataType.replace("[]","");
            const match = this.store.entities.find(entity=> entity.name == entityName);

            if(this.options.dataType.indexOf("[]")>-1){
                this.currentInput = inputs["object[]"];
                if(match){
                    let obj={};
                    for(const field of match.fields){
                        obj[field.name] = this.setDefaultValue(field.dataType);
                    }   
                    this.inputValue = value || [obj];
                }
                else{
                    this.inputValue = value;
                }
                return;
            }
            
            if(match){
                this.currentInput = inputs["object"];
                let obj={};
                    for(const field of match.fields){
                        obj[field.name] = this.setDefaultValue(field.dataType);
                    }   
                    this.inputValue = value || [obj];
                return;
            }
            throw Error(`Unknown input type for '${this.options.dataType}'`);
        },
        changeValue(event){
            const value = typeof event === 'object' && "target" in event ? event.target.value : event;
            this.store.values[this.options.name] = value;
            this.$emit('changeValue',value);
        },
        changeMultiValue(values){
            this.store.values[this.options.name] = values;
            this.$emit('changeValue',values);
        },
        setDefaultValue(dataType){
            const values = {
                "bool": false,
                "string": "string",
                "number": 0
            }
            if(dataType in values){
                return values[dataType];
            }
            return null;
        }
    }
}
</script>

<style>

</style>