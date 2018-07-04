<template>
  <div id="wrapper-container" class="wrapper-container">
      <div id="wrapper-signup">
        <span class="subject">{{ msg }}</span>
        <div class="input-wrapper">
          <input type="text" class="login-input" v-model="email" placeholder="  E-MAIL" autocomplete=off>
          <input type="password" class="login-input" v-model="password" placeholder="  PASSWORD">
          <input type="password" class="login-input" v-model="passwordConfirm" placeholder="  PASSWORD CONFIRM">
          <span class="warning">{{verify_warning}}</span>
        </div>        
        <div>
          <button class="signup-btn" @click="onCheck('next')">NEXT</button>
        </div>
        <router-link to="/login" class="back-btn">← back</router-link>
      </div>
      <div id="wrapper-verify" style="display: none">
        <div class="input-wrapper">
          <span class="subject">{{ msg2 }}</span>
          <div><input type="text" class="email-input" v-model="email" readonly>
            <button class="verify-btn" @click="emailVerify">SEND</button>
          </div>
          <div> <input type="text" class="email-input" v-model="email_verify" placeholder="    VERIFY CODE">
             <button class="verify-btn" @click="verifyCode('verify')">VERIFY</button>
          </div>
          <div>
            <span class="warning">{{verify_warning}}</span>
          </div>
        </div>
        <div>
          <button class="signup-btn" @click="onCheck('signup')">SIGNUP</button>
        </div>
        <div class="back-btn" @click="verifyCode('signup')">← back</div>
     </div>
  </div>    
</template>

<script>
import VueRouter from "vue-router";
import AXIOS from 'axios';
//import VuexTypes from "../../../vuex/config/VuexTypes"

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      verify_warning: "",
      email_verify: "",
      msg: "JOIN US",
      msg2: "CHECK EMAIL"
    };
  },
  methods: {
    onCheck(flag) {
      // Warnings in case of error in e-mail or password entry

      if (this.email === "") {
        this.verify_warning = "pleaes enter email value.";
        return;
      }

      if (!this.emailCheck(this.email)) {
        this.verify_warning = "Does not fit email format.";
        return;
      }

      if (this.password === "" || this.passwordConfirm === "") {
        this.verify_warning = "pleaes enter password value.";
        return;
      }

      if (!this.passwordCheck(this.password)) {
        this.verify_warning = "Does not fit password format.";
        return;
      }

      if (this.password.length <= 8) {
        this.verify_warning = "Please enter at least eight digits.";
        return;
      }

      if (this.password !== this.passwordConfirm) {
        this.verify_warning = "password is not matching.";
        return;
      }

      if(flag === "next"){
        this.changeContainer("verify");
      }else{
        this.signup();
      }

      
      //this.verify_warning = "Email verification is not yet done.";
    },
    emailCheck(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    },
    passwordCheck(password) {
      //Password verification function
      if (
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(password)
      ) {
        return true;
      }
      return false;
    },
    emailVerify() {
       //Send Email verification codes to Server
      AXIOS.post("/kyc_verify_update.do", {
        email: this.email
      })
        .then(result => {
          console.log(result);
          this.posts = result.data;
        })
        .catch(ex => {
          console.log("err  :::::::::  ", ex);
        });
    },
    changeContainer(flag) {
      // Hide the signup component, display the email verification component
      var wrapperSignup = document.getElementById("wrapper-signup");
      var wrapperVerify = document.getElementById("wrapper-verify");
      this.verify_warning = "";

      // If the flag value is not null, display the signup component
      if (flag === "verify") {
        wrapperSignup.style.display = "none";
        wrapperVerify.style.display = "inline-block";
      } else {
        wrapperSignup.style.display = "inline-block";
        wrapperVerify.style.display = "none";
      }
    },
    signup () {
      // Signup logic, 
      // DB communication required
    },
    verifyCode () {
       // vefiry code logic, 
      // DB communication required
    }
  }
};
</script>

<style scoped>
.input-wrapper {
  margin-top: 12px;
  margin-bottom: 20px;
}

.verify-btn {
  width: 59px;
  height: 40px;
  border: none;
  background: white;
  font-size: 11px;
}

.logo_img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  margin-bottom: 40px;
}

.back-btn {
  float: left;
  margin-left: 12px;
  margin-bottom: -10px;
  margin-top: 19px;
  color: white;
  text-decoration-line: none;
}

.back-btn:hover {
  text-decoration: underline;
  color: #6565ef;
}

.subject {
  font-weight: 800;
  font-size: 31px;
}

.signup-btn {
  border: 0;
  width: 135px;
  height: 41px;
  font-size: 16px;
  background: #0078e7;
  color: white;
  font-weight: 700;
}

.signup-btn:hover {
  background: #5db1ff;
  cursor: pointer;
}

.wrapper-container {
  border: solid 12px;
  width: 350px;
  padding: 16px 6px 32px 2px;
  display: inline-block;
  margin-top: 9px;
  margin-bottom: 9px;
}

@media (max-width: 768px) {
  .wrapper-container {
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

.email-input {
  height: 38px;
  width: 169px;
  background: #003359;
  color: white;
  border: 0;
  margin: 10px;
}
</style>
