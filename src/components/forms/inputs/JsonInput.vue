<template>
    <div>
        <label :for="fieldId" >{{label}}</label>

        <VueJsoneditor
        :id="fieldId"  
        v-if="editor.value!==null"
        height="400"
        mode="tree"
        v-model:json="editor.value" 
        :mainMenuBar="editor.mainMenuBar"
        @change="changeValue"
        :readOnly="disabled"
        >

        </VueJsoneditor>        
    </div>
</template>

<script>
import VueJsoneditor from 'vue3-ts-jsoneditor';

export default {
    name: "JsonInput",
    props: {
        name: String,
        label: String,
        value: [Array,Object],
        disabled: Boolean
    },
    components: {
        VueJsoneditor
    },
    data(){
        return {
            fieldId: "",
            editor: {
                value: null,
                mainMenuBar: false
            }
        }
    },
    mounted(){
        this.fieldId = this.$uuidv4() + this.name;
        this.editor.value = this.value;
    },
    emits: ["change"],
    methods: {
        changeValue(content){
            this.$emit('change',content.json);
        }
    }
}
</script>

<style>

</style>