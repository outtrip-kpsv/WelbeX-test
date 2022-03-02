<template>
    <div class="home">
        <menu-block 
                :page-size="this.pageSize"
                :search ="this.search"
                @PostSearch="PostSearch"
        />
        <table-body
                :table-rows="this.tableRows"
                @UpdateSort="UpdateSort"
        />
        <table-pag
                :page="this.page"
                :numberOfPages="this.numberOfPages"

                @newPage="this.newPage"
        />
    </div>
</template>

<script>
    import axios from "axios";
    import TableBody from "../components/tableBody";
    import TablePag from "../components/tablePag";
    import MenuBlock from "../components/menuBlock";

    export default {
        name: 'Home',
        components: {MenuBlock, TablePag, TableBody},
        data() {
            return {
                sortBy: 'name',
                search: {data:'', col:''},
                countRows: 0,
                page: 1,
                pageSize:4,
                numberOfPages: 0,
                tableRows: [],


            }
        },
        methods: {
            async getTable() {
                let data;
                let url = 'http://localhost:8000/table/'
                let params = {
                    sort: this.sortBy,
                    page:  this.page,
                    page_size: this.pageSize
                }

                if (this.search.data.length !== 0){
                    params[this.search.col] = this.search.data
                }

                await axios.get(url, {params: params}).then(result => (data = result.data))
                this.countRows = data.count
                this.tableRows = data.results
                let numberOfPages=Math.floor(this.countRows/this.pageSize)
                this.numberOfPages = this.countRows%this.pageSize!==0?numberOfPages+1:numberOfPages
            },
            PostSearch(data){
                this.page = 1
                this.pageSize = data.pageSize;
                this.search.data = data.dataSearch;
                this.search.col = data.colOfSearch;
                this.getTable()
            },
            UpdateSort(data){
                this.sortBy = data
                this.getTable()
            },
            newPage(data){
                this.page = data
                this.getTable()
            }

        }
        ,
        mounted() {
            this.getTable()
        }
    }
</script>
