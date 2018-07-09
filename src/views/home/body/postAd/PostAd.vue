<template>
<v-flex>
       <select-bar></select-bar>
       <list-view></list-view> 
</v-flex> 
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  import ListView from '@/components/ListView.vue';
  import SelectBar from '@/components/SelectBar.vue';
  
  export default Vue.extend({
    name: 'postAd',
    components: {SelectBar, ListView},
    data: () => ({
      
    }),
    methods: { 
      
    }
  });
</script>

<style>
</style>