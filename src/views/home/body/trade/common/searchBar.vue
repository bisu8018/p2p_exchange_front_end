<template>
  <v-toolbar dense>
    

    <v-divider vertical></v-divider>
    <v-btn-toggle
      v-model="toggle_exclusive"
    >
      <v-btn :value="1" flat>
        country
      </v-btn>

      <v-btn :value="2" flat>
        <v-icon>format_align_center</v-icon>
      </v-btn>

      <v-btn :value="3" flat>
        <v-icon>format_align_right</v-icon>
      </v-btn>

      <v-btn :value="4" flat>
        <v-icon>format_align_justify</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
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