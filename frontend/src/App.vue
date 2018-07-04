<template>   
    <div class="container">   
        <div class="wrapper_bg"></div>
        <router-view></router-view>      
    </div> 
</template>

<script>
import MainPage from "./views/main/MainPage.vue";
import Home from "./views/home/Home.vue";
import VueRouter from "vue-router";

const router = new VueRouter({
  routes: [
    { path: "/home", component: Home },
    { path: "/mainPage", component: MainPage }
  ]
});

export default {
  name: "app",
  router,
  created() {
    this.$router.push("/home");
  }
};
</script>


<style scoped>
.wrapper_bg {
  background-color: black;
  opacity: 0.6;
  min-width: 100%;
  min-height: 100%;
  position: fixed;
  z-index: -1;
}
.container {
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(assets/bg.png) top center;
  z-index: -2;
  background-size: cover;
}
</style>

