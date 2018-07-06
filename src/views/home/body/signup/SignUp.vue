<template>
    <v-container>
      <v-layout>
        <v-flex xs12 md6 offset-md3>
          <v-card flat>
            <v-card-title primary-title>
                <h2>Sign up to Allb</h2>
            </v-card-title>
            <v-card-text>
              <v-flex>
                <v-text-field prepend-icon="person" name="email" v-model="email" label="Email" type="text" placeholder="guest@allblab.com" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field prepend-icon="lock" label="Password" placeholder="Min 8 characters" v-model="password" :type="'password'" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field prepend-icon="lock" label="Password Confirm" placeholder="Include characters, numbers, special chracters" v-model="passwordConfirm" :type="'password'" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-checkbox :label="'I agree to the Terms of Service'" v-model="checkbox"></v-checkbox>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-flex text-xs-left>
                <v-btn color="primary" class="signupBtn" @click="onCheck" large>Sign up</v-btn>
              </v-flex>
              <v-flex>
                Already have an account <a @click='goLogin'>Log in</a>
              </v-flex>
              <!-- <v-alert :value="true" type="error" absolute>
                This is a error alert.
              </v-alert> -->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  import { abUtils } from '@/common/utils';
  import AccountService from '@/service/account/AccountService';
 
  
  export default Vue.extend({
    name: 'home',
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
          this.verify_warning = Vue.prototype.$str("Does not fit password format.");
          return;
        }  
        //password ~ password confirm match
        if (this.password !== this.passwordConfirm) {
          this.verify_warning = Vue.prototype.$str("passwordMatch");
          return;
        }
        //terms and conditions
        if (this.checkbox === false) {
          this.verify_warning = Vue.prototype.$str("AcceptConditions");
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