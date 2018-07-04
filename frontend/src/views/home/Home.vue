<template>
  <div class="home_template">    
    <div class="img-container">
      <img class="logo_img" src="../../assets/logo_main.png">   
    </div>
       <div class="wrapper2">
           <router-view></router-view>  
        </div>        
  </div>
</template>

<script>
import VueRouter from "vue-router";
import Login from "./login/Login.vue";
import Signup from "./signup/Signup.vue";

const router = new VueRouter({
  routes: [
    { path: "/login", component: Login },
    { path: "/signup", component: Signup }
  ]
});

export default {
  name: "home",
  router,
  created() {
    this.$router.push("/login");
  }
};
</script>

<style scoped>
.logo_img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  margin-bottom: 60px;
}

.wrapper2 {
  border: solid 14px #731515;
  width: 400px;
  display: inline-block;
}

@media (max-width: 768px) {
  .wrapper2 {
    border: solid 10px #731515 !important;
    width: 337px !important;
  }
}

.home_template {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  position: relative;
}
</style>
