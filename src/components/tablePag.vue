<template>
    <div class="pagination-container">
        <span :class="item.class" @click="goToPage(item.data)" v-for="item in pageObjects">{{item.data}}</span>
    </div>
</template>

<script>
    export default {
        name: "tablePag",
        props: {
            page: Number,
            numberOfPages: Number,
        },
        data() {
            return {
                pageObjects: []
            }
        },
        methods: {
            cretePageObjects() {
                this.pageObjects = []
                if (this.numberOfPages <= 6) {
                    for (let i = 1; i <= this.numberOfPages; i++) {
                        this.pageObjects.push({data: i, class: 'pageNumber',})
                    }
                } else {

                    for (let i = this.page-2; i<=this.page+2&&i<=this.numberOfPages;i++){
                        this.pageObjects.push({data: i, class: 'pageNumber',})
                    }
                    this.pageObjects= this.pageObjects.filter(el => el.data>0)
                    if(this.pageObjects[0].data>=2){
                        this.pageObjects.splice(0,0,{data: '..', class: 'pageNumber-disable',})
                        this.pageObjects.splice(0,0,{data: 1, class: 'pageNumber',})
                    }
                    if(this.pageObjects[this.pageObjects.length-1].data<this.numberOfPages){
                        this.pageObjects.push({data: '..', class: 'pageNumber-disable',})
                        this.pageObjects.push({data: this.numberOfPages, class: 'pageNumber',})
                    }

                }
                this.pageObjects.forEach(el => el.class += el.data === this.page ? '-active' : '')
            },
            goToPage(pageNumber) {
                if(pageNumber !== '..'){
                    this.$emit('newPage', pageNumber)
                }
            }
        },
        watch: {
            numberOfPages(newVal, oldVal) {
                this.cretePageObjects()
            },
            page(newVal, oldVal) {
                this.cretePageObjects()
            }
        },
    }
</script>

<style scoped>
    .pagination-container {

        text-align: center;
    }

    .pageNumber {
        background-color: #d8e4fa;
        margin: 0px 5px;
        padding: 10px 10px;
        border: solid 2px #5f5d5d;
        border-radius: 10px;

    }

    .pageNumber:hover {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    }

    .pageNumber-active {
        background-color: #dcfcc9;
        padding: 10px 10px;
        margin: 0px 5px;
        border: solid 2px #404040;
        border-radius: 10px;
    }

    .pageNumber-disable {
        background-color: #ffffff;
        padding: 10px 10px;
        margin: 0px 5px;
        border: solid 2px #ffffff;
        border-radius: 10px;
    }
</style>