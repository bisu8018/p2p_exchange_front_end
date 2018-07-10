<template>
<div>
  <div class="text-xs-center">
    <v-chip color="secondary" text-color="white" label small>Primary</v-chip>

    <v-chip color="secondary" text-color="white" label small>Secondary</v-chip>

    <v-chip color="secondary" text-color="white" label small>Colored Chip</v-chip>
    <v-chip color="secondary" text-color="white" label close small>Colored Chip</v-chip>
  </div>
   <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn  flat >Share</v-btn>
          <v-btn  dark color="primary">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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