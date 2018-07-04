<template>
  <div class="wrapper">
    <span class="subject">{{ msg }}</span>     
    <div class="input-wrapper">
      <input type="text"  class="login-input" v-model="email" placeholder="    E-MAIL" autocomplete=off>
      <input type="password" class="login-input" v-model="password" placeholder="    PASSWORD">
    </div>
    <div class="btn-wrapper">
      <button class="login-btn" @click="onLogin">LOGIN</button>
    </div>
    <div class="text-wrapper">
      <p class="signup-text" @click="goSignup">Create Account</p>      
    </div>
  </div>
</template>

<script>
import VueRouter from "vue-router";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      msg: "WELCOME"
    };
  },
  beforeCreate: function() {
    // Check if there is login session (After 'if/esle', check if login is pass)
  },
  methods: {
    onLogin() {
      var email = this.email.trim();
      var password = this.password.trim();
      var signEmail = function() {
        //Add login fucntion   
      };
       AXIOS.post("/login_post.do", {
        email: this.email,
        password: this.password
      })
        .then(result => {
          console.log(result);
          this.posts = result.data;
          this.$router.push("/mainPage");
        })
        .catch(ex => {
          console.log("err  :::::::::  ", ex);
        });      
    },
    goSignup() {
      this.$router.push("/signup");
    }
  }
};
</script>

<style scoped>
.input-wrapper {
  margin-top: 12px;
  margin-bottom: 20px;
}
.subject {
  font-weight: 800;
  font-size: 33px;
}

.signup-text {
  float: left;
  color: white;
  margin-left: 12px;
  margin-bottom: -10px;
  margin-top: 19px;
  cursor: pointer;
  text-decoration-line: none;
}

.signup-text:hover {
  text-decoration: underline;
  color: #6565ef;
}

.login-btn {
  border: 0;
  width: 135px;
  height: 41px;
  font-size: 16px;
  background: #0078e7;
  color: white;
  font-weight: 700;
}

.login-btn:hover {
  background: #5db1ff;
  cursor: pointer;
}

.wrapper {
  border: solid 12px;
  width: 350px;
  padding: 16px 6px 32px 2px;
  display: inline-block;
  margin-top: 9px;
  margin-bottom: 9px;
}
@media (max-width: 768px) {
  .wrapper {
    border: solid 9px;
    width: 293px;
  }
}

.login-input {
  height: 38px;
  width: 230px;
  background: #003359;
  color: white;
  border: 0;
  margin: 10px;
}

.login-input:focus {
  background: #4d4d4d;
}

.login_template {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  position: relative;
}
</style>
