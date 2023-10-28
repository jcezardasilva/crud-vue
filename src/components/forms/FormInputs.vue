<template>
    <div>
        <div v-for="(field,index) in fields" :key="index" >
          <FormInput class="mb-3" v-if="isLiteral(item[field.name])" :value="item[field.name]" :options="field" />
          <FormListButton v-if="Array.isArray(item[field.name])" :name="field.name" :label="field.label" @on-click="openList(field)"/>
          <FormTreeButton v-if="isObject(item[field.name])"  :name="field.name" :label="field.label" @on-click="openObject(field)"/>
        </div>        
    </div>
</template>

<script>
import FormInput from "@/components/forms/inputs/FormInput.vue";
import FormListButton from "@/components/forms/FormListButton.vue";
import FormTreeButton from "@/components/forms/FormTreeButton.vue";

export default {
    name: "FormInputs",
    components: {
        FormInput,
        FormListButton,
        FormTreeButton
    },
    emits: ["onOpenList", "onOpenObject"],
    props: {
        fields: Array,
        item: Object
    },
    methods: {
      isObject(value){
        return typeof value === 'object' && !Array.isArray(value) && value !== null;
      },
      isLiteral(value){
        return typeof value !== 'object' && !Array.isArray(value) && value !== null;
      },
      openList(item){
        this.$emit('onOpenList',item);
      },
      openObject(item){
        this.$emit('onOpenObject',item);
      },
    }
}
</script>

<style>

</style>