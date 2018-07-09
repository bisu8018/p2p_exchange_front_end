<template>
  <div id="app">
      <home></home>
  </div>
</template>


<script>
    import Vue from "vue";
    import {setEventBus, setRouter} from "./common/common";    
    import Home from './views/home/Home.vue'

    export default Vue.extend({
        name: "app",
        components: {
           'home' : Home,
        },
        created() {            
            setEventBus(this.$eventBus);
            setRouter(this.$router);
        }
    });
</script>
<style>
#app {
  font-family: 'Noto Sans KR', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
