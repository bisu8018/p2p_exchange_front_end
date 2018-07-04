<template>
  <div class="signup-container">
    <div class="signup-header">
      <div class="signup-subject">
        <h2>Reset Login Password</h2>
      </div>
    </div>
    <div class="signup-contents">
      <div class="email-container">
        <v-flex>
          <v-text-field label="Email" placeholder="Email" v-model="email" required></v-text-field>
        </v-flex>
      </div>
      <div class="password-container ">
        <v-flex>
          <v-text-field label="Password" placeholder="Min 8 characters" v-model="password" :type="'password'" required></v-text-field>
        </v-flex>
      </div>
      <div class="passwordConfirm-container">
        <v-flex>
          <v-text-field label="Password Confirm" placeholder="Include characters, numbers, special chracters" v-model="passwordConfirm" :type="'password'" required></v-text-field>
        </v-flex>
      </div>
    </div>
    <div class="signup-footer">
      <div class="checkbox-container">
        <v-checkbox :label="'I agree to the Terms of Service'" v-model="checkbox"></v-checkbox>
      </div>
      <div class="signupBtn-container">
        <div class="signupBtn-wrapper">
          <v-btn color="blue" class="signupBtn" @click="onSignup">Sign up</v-btn>
        </div>
        <div class="back-container">
          <a>← BACK</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  
  export default Vue.extend({
    name: 'forgetPassword',
    data: () => ({
      email: "",
      password: "",
      passwordConfirm: "",
      checkbox: false,
      verify_warning: ""
    }),
    methods: {
      onCheck() {
        // Warnings in case of error in e-mail or password entry
  
        if (this.email === "") {
          this.verify_warning = "pleaes enter email value.";
          return;
        }
  
        if (!this.emailCheck(this.email)) {
          this.verify_warning = "Does not fit email format.";
          return;
        }
  
        if (this.password === "") {
          this.verify_warning = "pleaes enter password value.";
          return;
        }
  
        if (this.password.length <= 8) {
          this.verify_warning = "Please enter at least eight digits.";
          return;
        }
  
  
        if (!this.passwordCheck(this.password)) {
          this.verify_warning = "Does not fit password format.";
          return;
        }
  
  
        if (this.password !== this.passwordConfirm) {
          this.verify_warning = "password is not matching.";
          return;
        }  

        if(this.checkbox === false) {
           this.verify_warning = "Please accept the terms and conditions.";
          return;
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
      onSignup() {
        //Send Email verification codes to Server
        AXIOS.post("api/user", {
            email: this.email,
            encryptedPassword: this.password
          })
          .then(result => {
            console.log(result);
          })
          .catch(ex => {
            console.log("err  :::::::::  ", ex);
          });
      }
    }
  });
</script>

<style>
  .signup-contents {
    padding-left: 12px;
  }
  
  .signup-subject {
    margin-bottom: 44px;
  }
  
  .signup-container {
    width: 432px;
    margin: 0 auto;
    background: #efefef;
    border: 1px solid;
    padding: 16px;
  }
  
  .nation-label-container {
    text-align: left;
    padding-left: 12px;
  }
  
  .signupBtn {
    color: white;
  }
  
  .back-container {
    text-align: left;
  }
</style>