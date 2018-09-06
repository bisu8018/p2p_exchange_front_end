<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-4a login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{$str("welcome")}}</div>
                </div>
                <form action="/login" method="post" id="loginForm">
                    <div class="text-xs-left mb-2 h5 color-black">{{$str("email")}}</div>
                    <div class="p-relative mb-4"><input type="text" class="input" name="username" v-model="email"
                                                        @change="onCheckEmail"
                                                        :placeholder="loginEmailPlaceholder"
                                                        v-bind:class="{'warning-border' : warning_email}">
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_email}">{{verify_warning_email}}</span>
                        </div>
                    </div>
                    <div class="text-xs-left mb-2 h5 color-black">{{$str("password")}}</div>
                    <div class="p-relative mb-4">
                        <input name="password" v-model="password" type="password" class="input"
                               @change="onCheckPassword"
                               :placeholder="loginPasswordPlaceholder"
                               v-bind:class="{'warning-border' : warning_password}">
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_password}">{{verify_warning_password}}</span>
                        </div>
                    </div>

                    <div class="mb-4 " v-if="email.length>0 && password.length>=8">
                        <!--<v-flex class="verifySlider" mb-4>-->
                        <div class="text-xs-left mb-2 h6 color-black">{{$str("verify")}}</div>
                        <verify-slider v-on:passcallback="putVerified"></verify-slider>
                    </div>
                    <!--<v-btn color="primary" type="submit" >Log In</v-btn>-->
                </form>
                <!--go to the page 'find password' -->
                <div class="goForgetPwdWrapper text-xs-left h6 ">
                    <span @click="goFindPassword" class="color-blue-active goForgetPwd h5">{{$str("forgetPassword")}}</span>
                </div>
                <button class="btn-blue-hover btn-blue" @click='onCheck'>
                    {{$str("loginText")}}
                </button>
                <div class="mt-4a mb-4a orWrapper">
                    <div class="orTextWrapper"><span class="orText h6">or</span></div>
                </div>
                <button @click='goSignup' class="btn-white">{{$str("signupText")}}
                </button>
                <!-- vuex 기능을 위한 코드 : 기능 없음 -->
                <div v-if="isLogin"></div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import VerifySlider from "@/components/VerifySlider";
    import {abUtils} from '@/common/utils';
    import AxiosService from "@/service/AxiosService";
    import axios from 'axios'
    import MainRepository from "../../../../vuex/MainRepository";

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
        computed: {
            isLogin() {
                if (MainRepository.MyInfo.isLogin()) {
                    MainRepository.router().goMain();
                }
                return MainRepository.MyInfo.isLogin();
            }
        },
        methods: {
            serializeserialize(form) {
                var field,
                    l,
                    s = [];

                if (typeof form == 'object' && form.nodeName == "FORM") {
                    var len = form.elements.length;

                    for (var i = 0; i < len; i++) {
                        field = form.elements[i];
                        if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'hidden' && field.type != 'reset' && field.type != 'submit') {
                            if (field.type == 'select-multiple') {
                                l = form.elements[i].options.length;

                                for (var j = 0; j < l; j++) {
                                    if (field.options[j].selected) {
                                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                                    }
                                }
                            }
                            else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                            }
                        }
                    }
                }
                return s.join('&').replace(/%20/g, '+');
            },
            goSignup() {
                this.$router.push("/signup");
            },
            goFindPassword() {
                this.$router.push("/findPassword");
            },
            onLogin() {
                // document.getElementById("loginForm").submit();
                let self = this;
                axios({
                    method: 'POST',
                    url: '/login',
                    data: self.serializeserialize(document.getElementById("loginForm")),
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((response) => {
                    window.location.replace(AxiosService.getRootUrl() + '/tradeCenter')
                }).catch(error => {
                    Vue.prototype.$eventBus.$emit('showAlert', 4011);
                });
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

    .goForgetPwd {
        cursor: pointer;
    }

    .goForgetPwdWrapper {
        margin-bottom: 9px !important;
    }

    .goForgetPwd:hover {
        color: #316ee4 !important;
    }

    /*verify slider warning CSS*/
    /*.warning-text-slider-wrapper {
        position: absolute;
        bottom: -16px;
        right: 0;
    }*/
</style>