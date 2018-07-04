<template>
 <v-toolbar class="white">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  
  export default Vue.extend({
    name: 'abHeader',
    data: () => ({
        title : 'header'
    })
  });
</script>

<style>
  
</style>