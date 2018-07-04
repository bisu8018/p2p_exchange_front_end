<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>
    import Vue from "vue";
    import {setEventBus, setRouter} from "./common/common";

    export default Vue.extend({
        name: "app",
        components: {
        },

        data: function () {
            return {
                spriteImg: {
                    'sprite_img' : true,
                },
            }
        },
        created() {
            setEventBus(this.$eventBus);
            setRouter(this.$router);
        },
        mounted() {
        },
    });
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
