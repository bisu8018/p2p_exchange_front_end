<template>
  <v-app>
      <abHeader></abHeader>
      <v-content class='white' style="min-height:600px; ">
        <v-container>
          <router-view ></router-view>
        </v-container>
      </v-content>
      <abFooter></abFooter>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import MainRepository from "../../vuex/MainRepository"; // @ is an alias to /src
import AbHeader from "./Header.vue"
import AbFooter from "./Footer.vue"

export default Vue.extend({
    name: 'home',    
    components: {
      'abHeader' : AbHeader,
      'abFooter' : AbFooter
    },
    beforeCreate: function () {    
        // vuex store를 넘겨준다.
        MainRepository.init(this.$store, function () {

        })
    }
});
</script>

<style>
</style>