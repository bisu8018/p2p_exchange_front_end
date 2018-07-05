<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex xs12 md6 offset-md3>
          <v-card flat>
            <v-card-title primary-title>
              <div class="signup-subject">
                <h2>Sign up to Allb</h2>
              </div>
            </v-card-title>
            <v-card-text>
              <v-flex>
                <v-text-field prepend-icon="person" name="email" v-model="email" label="Email" type="text" required></v-text-field>
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
                <v-btn color="primary" class="signupBtn" @click="onSignup" large>Sign up</v-btn>
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
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AXIOS from 'axios';
  
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
  
        if (this.checkbox === false) {
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
      },
      goLogin() {
        this.$router.push("/login");
      }
    }
  });
</script>

<style>
  
</style>