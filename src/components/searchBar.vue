<template>
    <v-btn-toggle v-model="toggle_exclusive">
      <v-btn :value="1" flat>
        country
      </v-btn>

      <v-btn :value="2" flat>
        currency
      </v-btn>

      <v-btn :value="3" flat>
        payment
      </v-btn>

      <v-btn :value="4" flat>
        <v-icon>format_align_search</v-icon>
      </v-btn>
    </v-btn-toggle>
  
</template>


<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  
  export default Vue.extend({
    name: 'searchBar',
    data: () => ({
      
    })
  });
</script>
<style>
</style>