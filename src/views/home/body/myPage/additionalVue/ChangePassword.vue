<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-3 login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{$str("changePassword")}}</div>
                </div>
                <div class="color-darkgray mb-4 text-xs-left">
                    {{$str("changePasswordExplain")}}
                </div>
                <div class="text-xs-left mb-2 h5 color-black">{{$str("oldPassword")}}</div>
                <div class="p-relative mb-4"><input type="text" class="input" v-model="old_password"
                                                    :placeholder="loginEmailPlaceholder"
                                                    v-bind:class="{'warning-border' : warning_old_password}">
                    <div class="warning-text-wrapper">
                        <span class="d-none" v-bind:class="{'warning-text' : warning_old_password}">{{verify_warning_old_password}}</span>
                    </div>
                </div>

                <div class="text-xs-left mb-2 h5 color-black">{{$str("newPassword")}}</div>
                <div class="p-relative mb-4">
                    <input v-model="new_password" type="password" class="input"
                           @blur="onCheckPassword"
                           :placeholder="loginPasswordPlaceholder"
                           v-bind:class="{'warning-border' : warning_new_password}">
                    <div class="warning-text-wrapper">
                        <span class="d-none" v-bind:class="{'warning-text' : warning_new_password}">{{verify_warning_new_password}}</span>
                    </div>
                </div>

                <div class="text-xs-left mb-2 h5 color-black">{{$str("passwordConfirm")}}</div>
                <div class="p-relative mb-4">
                    <input v-model="confirm_password" type="password" class="input"
                           @blur="onCheckPasswordConfirm"
                           :placeholder="loginPasswordPlaceholder"
                           v-bind:class="{'warning-border' : warning_confirm_password}">
                    <div class="warning-text-wrapper">
                        <span class="d-none" v-bind:class="{'warning-text' : warning_confirm_password}">{{verify_warning_confirm_password}}</span>
                    </div>
                </div>
               <div>
                   <button class="btn-blue">{{$str('change')}}</button>
                   <button class="btn-white">{{$str('cancel')}}</button>
               </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import VerifySlider from "@/components/VerifySlider";
    import {abUtils} from '@/common/utils';

    export default {
        name: 'changePassword',
        data: function () {
            return {
                old_password: '',
                new_password: '',
                confirm_password: '',
                isVerified: false,
                verify_warning_old_password: "",
                verify_warning_new_password: "",
                verify_warning_confirm_password: "",
                verify_warning_slider: "",
                loginEmailPlaceholder: Vue.prototype.$str("loginEmailPlaceholder"),
                loginPasswordPlaceholder: Vue.prototype.$str("loginPasswordPlaceholder"),

                warning_old_password: false,
                warning_new_password: false,
                warning_confirm_password: false,
                warning_slider: false,
            }
        },
        components: {
            VerifySlider,
        },
        methods: {
            onChange() {
                //Send Email verification codes to Server
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                if (this.onCheckPassword()) {
                    this.onChange();
                }
            },
            onCheckPassword() {
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
            onCheckPasswordConfirm() {

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