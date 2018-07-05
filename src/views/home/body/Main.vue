<template>
  <div style="height:700px;">
    <a @click="goLogin" style=" cursor:pointer; font-size:20px; margin-right:20px">login</a>|      
    <a @click="goSignup" style=" cursor:pointer; font-size:20px; margin-left:20px">signup</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'main',
    methods: {
        goLogin() {
        this.$router.push("/login");
      },
      goSignup() {
        this.$router.push("/signup");
      }
    }
});
</script>

<style>
</style>