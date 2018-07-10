<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
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
            <v-icon>search</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
  </v-container>

</template>


<script lang="ts">
    import Vue from 'vue';
    import AXIOS from 'axios';

    export default Vue.extend({
        name: 'searchBar',
        data: () => ({
            toggle_exclusive : 1,
        })
    });
</script>
<style>
</style>
