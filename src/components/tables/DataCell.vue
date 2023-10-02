<template>
    <td>
        {{ value }}<slot></slot>
    </td>
</template>

<script>
export default {
    name: "DataCell",
    props: {
        value: String
    }
}
</script>

<style>

</style>