<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainRepository from "../../vuex/MainRepository"; // @ is an alias to /src

export default Vue.extend({
    name: 'home',
    components: {
    },
    beforeCreate: function () {
        // vuex store를 넘겨준다.
        MainRepository.init(this.$store, function () {

        })
    },
});
</script>

<style>
</style>