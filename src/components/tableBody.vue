<template>

    <table class="table" style="padding: 20px 5px">
        <thead>
        <tr>
            <th>Дата</th>
            <th class="col-hover" :class="{colActive:colActive===1}" @click="makeActive('name')">Название</th>
            <th class="col-hover" :class="{colActive:colActive===2}" @click="makeActive('quantity')">Количество</th>
            <th class="col-hover" :class="{colActive:colActive===3}" @click="makeActive('distance')">Расстояние</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in this.tableRows">
            <td>{{row.date}}</td>
            <td>{{row.name}}</td>
            <td>{{row.quantity}}</td>
            <td>{{row.distance}}</td>
        </tr>

        </tbody>
    </table>
</template>

<script>
    export default {
        name: "tableBody",
        props: {
            tableRows: Array,
        },
        data() {
            return {
                colActive: 1,
                sortCol: 'name'
            }

        },
        methods: {
            makeActive(data) {
                switch (data) {
                    case 'name':
                        this.colActive =1

                        break;
                    case 'quantity':
                        this.colActive =2
                        break;
                    case 'distance':
                        this.colActive =3
                        break;
                }

                this.$emit('UpdateSort', data)
            }
        }
    }
</script>

<style scoped>
    .table {
        width: 100%;
        border: none;
        margin-bottom: 20px;
    }

    .table thead th {
        font-weight: bold;
        text-align: left;
        border: none;
        padding: 10px 15px;
        background: #d8d8d8;
        font-size: 14px;
    }

    .table thead tr th:first-child {
        border-radius: 8px 0 0 8px;
    }

    .table thead tr th:last-child {
        border-radius: 0 8px 8px 0;
    }

    .table tbody td {
        text-align: left;
        border: none;
        padding: 10px 15px;
        font-size: 14px;
        vertical-align: top;
    }

    .table tbody tr:nth-child(even) {
        background: #f3f3f3;
    }

    .table tbody tr td:first-child {
        border-radius: 8px 0 0 8px;
    }

    .table tbody tr td:last-child {
        border-radius: 0 8px 8px 0;
    }

    .col-hover:hover {
        background-color: #66c666;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    }

    .colActive {
        background-color: #8fa0bc !important;
    }
</style>