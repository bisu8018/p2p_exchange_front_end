<template>
    <v-layout mt-5 mb-5 ml-3 mr-3>
        <v-flex xs12 lg4 offset-lg4>
            <div class="mb-4a signup-flex">
                <div class="pt-1">
                    <img class="iconLogo mr-2" src="@/assets/img/logo_black.png"></div>
                <div class="title-2">{{$str("signupSubject")}}</div>
            </div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("country")}}</div>
            <select-box></select-box>
            <div class="text-xs-left mb-2 caption input-label mt-4">{{$str("email")}}</div>
            <div>
                <input name="email" v-model="email" type="text" class="common-input mb-4">
            </div>
            <div class="text-xs-left mb-2 caption input-label">{{$str("password")}}</div>
            <div>
                <input v-bind:label="$str('password')" v-model="password" :type="'password'"
                       class="common-input mb-4" :placeholder="$str('passwordPlaceholder')">
            </div>
            <div class="text-xs-left mb-2 caption input-label">{{$str("passwordConfirm")}}</div>
            <div>
                <input v-bind:label="$str('passwordConfirm')" v-model="passwordConfirm" :type="'password'"
                       class="common-input mb-4" :placeholder="$str('passwordPlaceholder')">
            </div>
            <div class="mb-4 text-xs-left">
                <label class="caption"><input type="checkbox" v-model="checkbox"
                                              class="mr-2">{{$str('termsLabel')}}</label>
            </div>
            <div class="signup-flex">
                <v-flex mr-2 xs6>
                    <button class="signup-btn btnHover block" @click="onCheck">{{$str("signupText")}}</button>
                </v-flex>
                <v-flex text-xs-left xs6 caption>
                    <div>{{$str("haveAccount")}}</div>
                    <div><a @click='goLogin' class="layer-text signup-a">{{$str("loginText")}}</a></div>
                </v-flex>
            </div>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';
    import AccountService from '@/service/account/AccountService';
    import SelectBox from '@/components/SelectBox.vue';
    import MainRepository from "@/vuex/MainRepository";

    export default Vue.extend({
        name: 'home',
        components: {
            SelectBox
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
                    country: MainRepository.SelectBox.controller().getCountry(),
                    email: this.email,
                    encryptedPassword: this.password
                }, function (error) {
                    if (!error) {
                        //console.log("success");
                        alert("Thank you");
                        location.href = "/abMain";

                    } else {
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

<style scoped>
    .signup-flex {
        display: flex;
    }

    .iconLogo {
        width: 30px;
        height: 24px;
    }

    .signup-btn {
        border-radius: 3px;
        background-color: #214ea1;
        color: white;
        height: 40px;
        width: 100%;

    }

    .input-label {
        color: #9294a6;
    }

    .common-input {
        background: white;
    }

    .signup-a {
        font-size: 14px;
        color: #214ea1;
    }

    .signup-a:hover {
        color: #316ee4;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        font-size: 10px;
        color: #c8c8c8;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size: 10px;
        color: #c8c8c8;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        font-size: 10px;
        color: #c8c8c8;
    }

</style>