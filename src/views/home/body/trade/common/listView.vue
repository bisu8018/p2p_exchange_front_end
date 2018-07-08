<template>
    <v-data-table :headers="headers" :items="desserts" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.volume }}</td>
      <td class="text-xs-right">{{ props.item.limits }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
      <td class="text-xs-right">{{ props.item.paymentMethod }}</td>
      <td class="text-xs-right">{{ props.item.control }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
    </template>
    </v-data-table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  
  export default Vue.extend({
    name: 'listView',
    data: () => ({
       headers: [
          {
            text: 'Merchant(Volume | Trade rate)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Volume', value: 'volume' },
          { text: 'Limits', value: 'limits' },
          { text: 'Price', value: 'price' },
          { text: 'Payment Method', value: 'paymentMethod' },
          { text: 'Control', value: 'control' }
        ],
        desserts: [
        ]
    }),
    methods: { 
      
    }
  });
</script>
<style>
</style>