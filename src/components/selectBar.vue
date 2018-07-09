<template>
    <v-tabs>
    
    <v-breadcrumbs divider="|">
      <v-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled">
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-divider vertical></v-divider>
    <v-breadcrumbs divider="|">
      <v-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled">
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
       
    </v-tabs>    
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  
  export default Vue.extend({
    name: 'selectBar',
    data: () => ({
      items: [
        {
          text: 'BTC',
          disabled: false
        },
        {
          text: 'ETH',
          disabled: false
        },
        {
          text: 'USDT',
          disabled: false
        }
      ]
    })
  });
</script>
<style>
</style>