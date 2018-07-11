<template>
    <v-layout mt-5 mb-5>
        <v-flex xs12 lg4 offset-lg4>
            <v-card flat>
                <v-card-title primary-title>
                    <img class="iconLogo mr-2" src="@/assets/img/logo_black.png">
                    <h2 class="headline">{{$str("signupSubject")}}</h2>
                </v-card-title>
                <v-card-text>
                    <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("country")}}</v-flex>
                    <country-select></country-select>
                    <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("email")}}</v-flex>
                    <v-flex>
                        <v-text-field name="email" v-model="email" type="text" placeholder="guest@allblab.com"
                                      solo></v-text-field>
                    </v-flex>
                    <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("password")}}</v-flex>
                    <v-flex>
                        <v-text-field v-bind:label="$str('password')" v-model="password" :type="'password'"
                                      solo></v-text-field>
                    </v-flex>
                    <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("passwordConfirm")}}</v-flex>
                    <v-flex>
                        <v-text-field v-bind:label="$str('passwordConfirm')" v-model="passwordConfirm"
                                      :type="'password'" solo></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-checkbox v-bind:label="$str('termsLabel')" v-model="checkbox"></v-checkbox>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-flex text-xs-left>
                        <v-btn dark color="blue darken-3" @click="onCheck" large>{{$str("signupText")}}</v-btn>
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

<style>

</style>