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
  import ListView from '@/components/ListView.vue';
  import SelectBar from '@/components/SelectBar.vue';
  import SearchBar from '@/components/SearchBar.vue';
  
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