<template>
 <p>
  <v-toolbar flat dark class="indigo " fixed style="height:64px">   
    <v-toolbar-title @click="goMain()">AllB</v-toolbar-title>    
    <v-spacer></v-spacer>
  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>  
  </v-toolbar>  
 
  <v-navigation-drawer v-model="drawer" temporary right app>
     <v-list class="pa-1">
          <v-list-tile>        
            <v-list-tile-content>
              <v-list-tile-title class="title" @click="goMain()">ALLB</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.name" @click="item.name=='login' ? goLogin() : (item.name=='signup' ? goSignup() : (item.name=='tradeCenter' ? goTradeCenter() : goPostAd()))">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</p>
</template>

<script lang="ts">
  import Vue from 'vue';
  
  export default Vue.extend({
    name: 'abHeader',
    data: () => ({        
        title : 'header',
        drawer: null,
        items: [
          { title: 'Log In' ,name: 'login'},
          { title: 'Sign Up', name: 'signup'},
          { title: 'Trade Center', name: 'tradeCenter'},
          { title: 'Post AD', name: 'postAd'}
        ]
    }),
     methods: {      
        goSignup(){
            this.$router.push("/signup");
        },
        goLogin() {
             this.$router.push("/login");
        },
        goMain() {
          this.$router.push("/abMain");
        },
        goTradeCenter() {
          this.$router.push("/tradeCenter");
        },
        goPostAd() {
          this.$router.push("/postAd");
        }        
    }
  });
</script>

<style>
  
</style>