<template>
    <!--Vertical, horizontal alignment-->
    <v-layout mt-4a>
        <v-flex class="card-flex" xs12 md6 lg4 offset-md3 offset-lg4 pa-2 pt-1>
            <v-card flat>
                <v-card-title title class="cardTitle" >
                    <img class="iconLogo mr-2" src="@/assets/img/logo_black.png">
                    <h2 class="Welcome">{{$str("welcome")}}</h2>
                </v-card-title>
                <v-card-text>
                    <form action="/signin" method="post" id="loginForm">
                        <v-flex text-xs-left mb-2 caption>{{$str("email")}}</v-flex>
                        <input type="text" class="Login-input" name="email" v-model="email"
                               :placeholder="loginEmailPlaceholder">
                        <v-flex text-xs-left mb-2 caption>{{$str("password")}}</v-flex>
                        <input name="encryptedPassword" v-model="password" type="password" class="Login-input"
                               :placeholder="loginPasswordPlaceholder">
                        <!--<v-flex class="verifySlider" v-if="email.length>0 && password.length>=8" mb-5>-->
                        <v-flex class="verifySlider" mb-5>
                            <v-flex text-xs-left mb-2 caption>{{$str("verify")}}</v-flex>
                            <VerifySlider v-on:passcallback="putVerified"></VerifySlider>
                        </v-flex>
                        <!--<v-btn color="primary" type="submit" >Log In</v-btn>-->
                    </form>
                    <!--go to the page 'find password' -->
                    <v-flex text-xs-left caption>
                        <span @click="goFindPassword" class="textBlue goForgetPwd">{{$str("forgetPassword")}}</span>
                    </v-flex>
                    <v-btn dark color="Button" class="btnHover elevation-0" @click='onCheck' large block>{{$str("loginText")}}</v-btn>
                    <v-flex mt-4a mb-4a orWrapper >
                        <div class="orTextWrapper"><span class="orText caption">or</span></div>
                    </v-flex>
                    <v-btn @click='goSignup' flat large block class="textBlue btnHover btnSignup">{{$str("signupText")}}</v-btn>
                </v-card-text>
            </v-card>
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
                verify_warning: "",
                loginEmailPlaceholder: Vue.prototype.$str("loginEmailPlaceholder"),
                loginPasswordPlaceholder: Vue.prototype.$str("loginPasswordPlaceholder")
            }
        },
        components: {
            'VerifySlider': VerifySlider,
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
                // AccountService.Account.login({
                //     email: this.email,
                //     encryptedPassword: this.password
                // }, function (error) {
                //     if (!error) {
                //         console.log("success");
                //     } else {
                //         console.log("POST ERROR ::::::: " + error);
                //     }
                // })
            },
            putVerified: function () {
                this.isVerified = true;
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                //email null
                if (this.email === "") {
                    this.verify_warning = $str("emailValue");
                    return;
                }
                //email form
                if (!abUtils.isEmail(this.email)) {
                    this.verify_warning = $str("emailForm");
                    return;
                }
                //password null
                if (this.password === "") {
                    this.verify_warning = $str("passwordValue");
                    return;
                }
                //password form
                if (!abUtils.isPasswd(this.password)) {
                    this.verify_warning = $str("passwordForm");
                    return;
                }
                //verify slider
                if (this.isVerified === false) {
                    this.verify_warning = $str("verifySlider");
                    return;
                }
                this.onLogin();
            }
        }
    }
</script>
<style scopped>
    .card-flex {
        border-radius: 3px;
        border: solid 1px #8d8d8d;
        padding-bottom: 40px !important;
    }

    .Login-input {
        height: 44px;
        border-radius: 2px;
        background-color: #f8f8fa;
        border: solid 1px #8d8d8d;
        width: 100%;
        margin-bottom: 22px;
        padding-left: 12px;
    }

    .Welcome {
        height: 33px;
        font-size: 22px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #353535;
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

    .btnSignup{
        border : 1px solid #214ea1 !important;
    }

    .goForgetPwd{
        cursor: pointer;
    }

    .goForgetPwd:hover{
        color: #316ee4 !important;
    }

    .cardTitle{
        margin-top: 3px;
    }
</style>