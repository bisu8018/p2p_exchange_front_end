<template>
  <div class="text-xs-center">
    <v-chip color="secondary" text-color="white" label>Primary</v-chip>

    <v-chip color="secondary" text-color="white" label>Secondary</v-chip>

    <v-chip color="secondary" text-color="white" label>Colored Chip</v-chip>

    <v-chip color="secondary" text-color="white" label>Colored Chip</v-chip>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  
  export default Vue.extend({
    name: 'listFilter',
    data: () => ({
       items: [
          { title: 'china' ,name: 'login'},
          { title: 'Sign Up', name: 'signup'},
          { title: 'Trade Center', name: 'tradeCenter'},
          { title: 'Post AD', name: 'postAd'}
        ]
    })
  });
</script>
<style>
</style>