
<template>
    <nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" @click="setActivePage(activePage-1)">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>

        <li  v-for="(item,index) in visiblePages" class="page-item" :class="item == activePage? 'active': ''" :key="index" @click="setActivePage(item)" >
            <a class="page-link" href="#">{{ item }}</a>
        </li>

        <li class="page-item" @click="setActivePage(activePage+1)">
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
            activePage: 1,
            slice: {
                start: 0,
                end: 3
            }
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
            this.visiblePages = this.pages.slice(this.slice.start, this.slice.end);
        },
        setActivePage(value){
            if(value<1) return;
            if(value>this.pages.length) return;

            if(value > 1 && value < this.pages.length){
                this.slice = {
                    start: value-2,
                    end: value+1
                }
            }
            else if(value == 1 ){
                this.slice = {
                    start: 0,
                    end: 3
                }
            }
            else if(value == this.pages.length){
                this.slice = {
                    start: value-3,
                    end: this.pages.length
                }
            }
            this.setVisiblePages();

            this.activePage=value;
            this.$emit("onChange",value);
        }
    }
}
</script>
<style>
    
</style>