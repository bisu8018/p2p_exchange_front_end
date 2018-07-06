<template>
  <v-layout mt-5 mb-5>
    <v-flex xs12  lg4  offset-lg4>
      <v-card flat>
        <v-card-title primary-title>
           <img class="iconLogo mr-2" src="@/assets/img/logo_black.png" >
            <h2 class="headline">{{htmlSignupSubject}}</h2>
        </v-card-title>
        <v-card-text>
          <v-flex>
            <v-text-field prepend-icon="person" name="email" v-model="email" v-bind:label="htmlEmail" type="text" placeholder="guest@allblab.com" required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field prepend-icon="lock" v-bind:label="htmlPassword" v-bind:placeholder="htmlPasswordPlaceholder" v-model="password" :type="'password'" required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field prepend-icon="lock" v-bind:label="htmlPasswordConfirm" v-bind:placeholder="htmlPasswordPlaceholder" v-model="passwordConfirm" :type="'password'" required></v-text-field>
          </v-flex>
          <v-flex>
            <v-checkbox v-bind:label="htmlTermsLabel" v-model="checkbox"></v-checkbox>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-flex text-xs-left>
            <v-btn color="primary" @click="onCheck" large>{{htmlSignupText}}</v-btn>           
          </v-flex>
          <v-flex>
             {{htmlHaveAccount}} <a @click='goLogin'>{{htmlLoginText}}</a>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  import { abUtils } from '@/common/utils';
  import AccountService from '@/service/account/AccountService';
 
  
  export default Vue.extend({
    name: 'home',
    data: () => ({
      htmlSignupSubject: Vue.prototype.$str("signupSubject"), //Sign up to AllB
      htmlEmail: Vue.prototype.$str("email"),
      htmlPassword: Vue.prototype.$str("password"),
      htmlPasswordPlaceholder: Vue.prototype.$str("passwordPlaceholder"), //8 to 20 characters with a mix of letters and numbers
      htmlPasswordConfirm: Vue.prototype.$str("passwordConfirm"), //Password Confirm
      htmlTermsLabel: Vue.prototype.$str("termsLabel"), //I agree to the Terms of Service
      htmlTermsBtn: Vue.prototype.$str("termsBtn"), // Terms of Service
      htmlSignupText: Vue.prototype.$str("signupText"), //SIGN UP
      htmlHaveAccount : Vue.prototype.$str("haveAccount"), //Already have an account ?
      htmlLoginText: Vue.prototype.$str("loginText"),       //LOG IN


      email: "",
      password: "",
      passwordConfirm: "",
      checkbox: false,
      verify_warning: ""
    }),
    methods: { 
      onCheck() { 
        // Warnings in case of error in e-mail or password entry  

        //email null
        if (this.email === "") {
          this.verify_warning = Vue.prototype.$str("emailValue");
          return;
        }
        //email form 
        if (!abUtils.isEmail(this.email)) {
          this.verify_warning = Vue.prototype.$str("emailForm");
          return;
        }
        //password null
        if (this.password === "") {
          this.verify_warning = Vue.prototype.$str("passwordValue");
          return;
        }
        //password digit
        if (this.password.length <= 8) {
          this.verify_warning = Vue.prototype.$str("passwordDigit");
          return;
        }  
        //password form
        if (!abUtils.isPasswd(this.password)) {
          this.verify_warning = Vue.prototype.$str("passwordForm");
          return;
        }  
        //password ~ password confirm match
        if (this.password !== this.passwordConfirm) {
          this.verify_warning = Vue.prototype.$str("passwordMatch");
          return;
        }
        //terms and conditions
        if (this.checkbox === false) {
          this.verify_warning = Vue.prototype.$str("acceptConditions");
          return;
        } 
        
        this.onSignup();
      },
      onSignup() {
        //Send Email verification codes to Server
        AccountService.Account.login({},function(error){
          if(!error){
            console.log("success");
          }else{
            console.log("POST ERROR ::::::: " + error);
          }
        })
      },
      goLogin() {
        this.$router.push("/login");
      }
    }
  });
</script>

<style>
  
</style>