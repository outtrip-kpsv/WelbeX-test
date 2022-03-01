<template>
  <table-header/>
  <router-view/>
</template>

<style>

</style>
<script>
  import TableHeader from "./components/tableHeader";
  import TableBody from "./components/tableBody";
  export default {
    components: {TableBody, TableHeader}
  }
</script>