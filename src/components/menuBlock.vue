<template>
    <div class="menu-block">

        <div>
            <span>Поиск </span> <input class="input-search" type="text" v-model="this.tableSearch">
        </div>
        <div>
            <span>Строк на странице: </span> <input class="input-pageSize" type="text" v-model="this.selectPageSize">
        </div>
        <div>
            <select class="select-form" v-model="this.selectCol">
                <option value="name">Название</option>
                <option value="quantity">Количество</option>
                <option value="distance">Дистанция</option>
            </select>
        </div>
        <div>
            <select class="select-form" v-model="this.selectCondition">
                <option :value="option.value" :disabled="option.disabled" v-for="option in selectFilter">
                    {{option.data}}
                </option>
            </select>
        </div>
        <button @click="postSearch">ok</button>
    </div>
</template>

<script>
    export default {
        name: "menuBlock",
        data() {
            return {
                selectCol: 'name',
                selectCondition: 'icontains',
                tableSearch: "",
                selectPageSize: this.pageSize,
                selectFilter: [
                    {value: 'icontains', data: 'включает', disabled: false},
                    {value: 'iexact', data: 'точное соответствие', disabled: false},
                    {value: 'gt', data: 'больше чем', disabled: true},
                    {value: 'lt', data: 'меньше чем', disabled: true},
                ]
            }
        },
        props: {
            pageSize: Number,
            search: Object,
        },
        methods: {
            postSearch() {
                let data = {
                    pageSize: Number(this.selectPageSize),
                    colOfSearch: this.selectCol + "__" + this.selectCondition,
                    dataSearch: this.tableSearch,
                }
                this.$emit('PostSearch', data)

            }
        },
        watch: {
            selectCol(newVal, oldVal) {
                switch (newVal) {
                    case 'name':
                        this.selectFilter.forEach(el => {
                            el.disabled = el.value === "gt" || el.value === "lt"
                            el.disabled = !(el.value === "icontains" || el.value === "iexact")
                        })
                        this.selectCondition='icontains'
                        break;

                    case 'quantity'||'distance':
                        this.selectFilter.forEach(el => {
                            el.disabled = false
                        })
                        break;
                }

            }
        }

    }
</script>

<style scoped>
    .menu-block {
        margin: 10px 2px 0px;
        background-color: #fdfaed;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
        padding: 10px;
    }

    .input-pageSize:focus {
        background-color: #c7ffc5;
    }

    .input-pageSize {
        width: 50px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        margin: 3px;
    }

    .input-search {
        width: 150px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        transition: width 0.4s ease-in-out;
    }

    .input-search:focus {
        width: 500px;
        background-color: #c7ffc5;

    }

    .select-form {
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        margin: 3px;
    }

    .select-form:focus {
        background-color: #c7ffc5;
    }
</style>