<template>
    <!--Vertical, horizontal alignment-->
    <v-layout mt-5 mb-5 ml-3 mr-3>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-4a login-title">
                    <div class="pt-1"><img class="iconLogo mr-2" src="@/assets/img/logo_black.png"></div>
                    <h2 class="title-2">{{$str("welcome")}}</h2>
                </div>
                <form action="/signin" method="post" id="loginForm">
                    <div class="text-xs-left mb-2 caption">{{$str("email")}}</div>
                    <div class="text-input-wrapper"><input type="text" class="common-input" name="email" v-model="email"
                                                           @blur="onCheckEmail"
                                                           :placeholder="loginEmailPlaceholder"
                                                           v-bind:class="{'warning_border' : warning_email}">
                        <div class="warning-text-wrapper">
                            <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_email}">{{verify_warning_email}}</span>
                        </div>
                    </div>
                    <div class="text-xs-left mb-2 caption">{{$str("password")}}</div>
                    <div class="text-input-wrapper">
                        <input name="encryptedPassword" v-model="password" type="password" class="common-input"
                               @blur="onCheckPassword"
                               :placeholder="loginPasswordPlaceholder"
                               v-bind:class="{'warning_border' : warning_password}">
                        <div class="warning-text-wrapper">
                            <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_password}">{{verify_warning_password}}</span>
                        </div>
                    </div>

                    <div class="mb-4 verifySlider" v-if="email.length>0 && password.length>=8">
                        <!--<v-flex class="verifySlider" mb-4>-->
                        <div class="text-xs-left mb-2 caption">{{$str("verify")}}</div>
                        <verify-slider v-on:passcallback="putVerified"></verify-slider>
                    </div>
                    <!--<v-btn color="primary" type="submit" >Log In</v-btn>-->
                </form>
                <!--go to the page 'find password' -->
                <div class="goForgetPwdWrapper text-xs-left caption ">
                    <span @click="goFindPassword" class="textBlue goForgetPwd">{{$str("forgetPassword")}}</span>
                </div>
                <v-btn dark color="Button" class="btnHover elevation-0" @click='onCheck' large block>
                    {{$str("loginText")}}
                </v-btn>
                <div class="mt-4a mb-4a orWrapper">
                    <div class="orTextWrapper"><span class="orText caption">or</span></div>
                </div>
                <v-btn @click='goSignup' flat large block class="textBlue btnHover btnSignup">{{$str("signupText")}}
                </v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import VerifySlider from "@/components/VerifySlider";
    import {abUtils} from '@/common/utils';
    import AccountService from '@/service/account/AccountService';

    export default {
        name: 'login',
        data: function () {
            return {
                email: '',
                password: '',
                isVerified: false,
                verify_warning_email: "",
                verify_warning_password: "",
                verify_warning_slider: "",
                loginEmailPlaceholder: Vue.prototype.$str("loginEmailPlaceholder"),
                loginPasswordPlaceholder: Vue.prototype.$str("loginPasswordPlaceholder"),
                warning_email: false,
                warning_password: false,
                warning_slider: false,
            }
        },
        components: {
            VerifySlider,
        },
        methods: {
            goSignup() {
                this.$router.push("/signup");
            },
            goFindPassword() {
                this.$router.push("/findPassword");
            },
            onLogin() {
                //Send Email verification codes to Server
                document.getElementById("loginForm").submit();
            },
            putVerified: function () {
                this.isVerified = true;
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                if (this.onCheckEmail() && this.onCheckPassword() && this.onCheckSlider()) {
                    this.onLogin();
                }
            },
            onCheckEmail() {
                //email null
                if (this.email === "") {
                    this.verify_warning_email = Vue.prototype.$str("emailValue");
                    this.warning_email = true;
                    return false;
                }
                //email form
                if (!abUtils.isEmail(this.email)) {
                    this.verify_warning_email = Vue.prototype.$str("emailForm");
                    this.warning_email = true;
                    return false;
                }
                this.warning_email = false;
                return true;
            },
            onCheckPassword() {
                //password null
                if (this.password === "") {
                    this.verify_warning_password = Vue.prototype.$str("passwordValue");
                    this.warning_password = true;
                    return false;
                }
                //password form
                if (!abUtils.isPasswd(this.password)) {
                    this.verify_warning_password = Vue.prototype.$str("passwordForm");
                    this.warning_password = true;
                    return false;
                }
                this.warning_password = false;
                return true;
            },
            onCheckSlider() {
                //verify slider
                if (this.isVerified === false) {
                    this.verify_warning_slider = Vue.prototype.$str("verifySlider");
                    this.warning_slider = true;
                    return false;
                }
                this.warning_slider = false;
                return true;
            }
        }
    }
</script>
<style scoped>
    .iconLogo {
        width: 30px;
        height: 24px;
    }

    .login-title {
        display: flex;
    }

    .card-flex {
        border-radius: 3px;
        border: solid 1px #8d8d8d;
        padding-bottom: 40px !important;
    }

    .textBlue {
        color: #214ea1 !important;
    }

    .orWrapper {
        border-bottom: 1px solid #d1d1d1;
        position: relative;
    }

    .orTextWrapper {
        width: 100%;
        position: absolute;
        top: -10px;
    }

    .orText {
        background: white;
        padding-left: 15px;
        padding-right: 15px;
        color: #9294a6;
    }

    .btnSignup {
        border: 1px solid #214ea1 !important;
        margin-bottom: -10px;
    }

    .goForgetPwd {
        cursor: pointer;
    }

    .goForgetPwdWrapper {
        margin-bottom: 9px !important;
    }

    .goForgetPwd:hover {
        color: #316ee4 !important;
    }

    .cardTitle {
        margin-top: 3px;
    }



    /*verify slider warning CSS*/
    /*.warning-text-slider-wrapper {
    position: absolute;
    bottom: -16px;
    right: 0;
    }*/
</style>