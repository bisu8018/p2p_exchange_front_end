<template>
  <div>
    <abHeader></abHeader>
    <router-view></router-view>
    <abFooter></abFooter>
  </div>
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
    },
    created: function () {
     this.$router.push("/main");
    }
});
</script>

<style>
</style>