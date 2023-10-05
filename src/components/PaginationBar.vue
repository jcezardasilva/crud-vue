
<template>
    <nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>

        <li  v-for="(item,index) in visiblePages" class="page-item" :class="item == activePage? 'active': ''" :key="index" @click="setActivePage(item)" >
            <a class="page-link" href="#">{{ item }}</a>
        </li>

        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    </nav>
</template>
<script>
export default {
    name: "PaginationBar",
    props: {
        pages: Array,
        value: Number
    },
    data(){
        return {
            visiblePages: [],
            activePage: 1
        }
    },
    emits: ["onChange"],
    watch: {
        "pages": {
            handler(value, oldValue){
                if(value !== oldValue){
                    this.setVisiblePages();
                }
            }
        },
        "value": {
            handler(value, oldValue){
                if(value !== oldValue){
                    this.activePage = value;
                }
            }
        }
    },
    methods: {
        setVisiblePages(){
            this.visiblePages = this.pages.length<=3? this.pages : this.pages.slice(0, 3);
        },
        setActivePage(value){
            this.activePage=value;
            this.$emit("onChange",value);
        }
    }
}
</script>
<style>
    
</style>