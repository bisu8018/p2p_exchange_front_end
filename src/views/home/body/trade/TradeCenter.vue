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
  import ListView from '@/components/listView.vue';
  import SelectBar from '@/components/selectBar.vue';
  import SearchBar from '@/components/searchBar.vue';
  
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