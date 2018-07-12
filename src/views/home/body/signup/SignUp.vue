<template>
    <v-layout mt-4 mb-5>
        <v-flex xs12 lg4 offset-lg4>
            <v-card flat>
                <v-card-title  >
                    <img class="iconLogo mr-2" src="@/assets/img/logo_black.png">
                    <div class="headline-2">{{$str("signupSubject")}}</div>
                </v-card-title>
                <v-card-text>
                    <v-flex text-xs-left mb-2  caption>{{$str("country")}}</v-flex>
                    <country-select></country-select>
                    <v-flex text-xs-left mb-2 caption>{{$str("email")}}</v-flex>
                    <v-flex>
                        <input name="email" v-model="email" type="text" class="signupInput">
                    </v-flex>
                    <v-flex text-xs-left mb-2 caption>{{$str("password")}}</v-flex>
                    <v-flex>
                        <input v-bind:label="$str('password')" v-model="password" :type="'password'"  class="signupInput">
                    </v-flex>
                    <v-flex text-xs-left mb-2 caption>{{$str("passwordConfirm")}}</v-flex>
                    <v-flex>
                        <input v-bind:label="$str('passwordConfirm')" v-model="passwordConfirm" :type="'password'" class="signupInput">
                    </v-flex>
                    <v-flex class="checkbox-terms">
                        <v-checkbox v-bind:label="$str('termsLabel')" v-model="checkbox"></v-checkbox>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-flex text-xs-left>
                        <button class="signup-btn" @click="onCheck" large>{{$str("signupText")}}</button>
                    </v-flex>
                    <v-flex>
                        {{$str("haveAccount")}} <a @click='goLogin'>{{$str("loginText")}}</a>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';
    import AccountService from '@/service/account/AccountService';
    import CountrySelect from '@/components/CountrySelect.vue';
    import MainRepository from "@/vuex/MainRepository";

    export default Vue.extend({
        name: 'home',
        components: {
            CountrySelect
        },
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
                AccountService.Account.signup({
                    country: MainRepository.Country.get(),
                    email: this.email,
                    encryptedPassword: this.password
                }, function (error) {
                    if (!error) {
                        console.log("success");
                    } else {
                        console.log("POST ERROR ::::::: " + error);
                    }
                })
            },
            goLogin() {
                //this.$router.push("/login");
            }
        }
    });
</script>

<style scoped>
    .iconLogo {
        width : 32px;
        height: 24px;
    }

    .signupInput {
        height: 36px;
        width: 100%;
        border-radius: 2px;
        background-color: #ffffff;
        border: solid 1px #8d8d8d;
        margin-bottom: 26px;
    }

    .v-label {
        margin-top: -4px;
        height: 20px;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #353535 !important;
    }

    .signup-btn {
        width: 132px;
        height: 44px;
        border-radius: 3px;
        background-color: #214ea1 ;
        color: white;
    }

    .signup-btn:hover {
        background-color: #316ee4 ;
    }

</style>