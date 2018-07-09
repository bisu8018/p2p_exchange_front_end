<template>
<v-flex>
       <select-bar></select-bar>
       <search-bar></search-bar>
       <list-view></list-view> 
</v-flex>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  import ListView from '@/views/home/body/trade/common/listView.vue';
  import SelectBar from '@/views/home/body/trade/common/selectBar.vue';
  import SearchBar from '@/views/home/body/trade/common/searchBar.vue';
  
export default Vue.extend({
    name: 'TradeCenter',
    components: {SelectBar, SearchBar, ListView},
    data: () => ({
     
    }),
    methods: { 
      
    }
  });  
</script>
<style>
</style>