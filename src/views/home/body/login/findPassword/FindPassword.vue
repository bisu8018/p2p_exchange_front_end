<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-3 login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{$str("resetLoginPassword")}}</div>
                </div>
                <div class="color-darkgray mb-4 text-xs-left">
                    {{$str("resetPasswordExplain")}}
                </div>

                <!--이메일 계정 입력-->
                <div v-if="status === 'email'">
                    <div class="text-xs-left mb-2 h5 color-black">{{$str("account")}}</div>
                    <div class="p-relative mb-4">
                        <input type="text" class="input" v-model="email">
                    </div>
                </div>

                <!--인증 슬라이더-->
                <div class="mb-4 " v-if="email.length>0 && status === 'email'">
                    <!--<v-flex class="verifySlider" mb-4>-->
                    <div class="text-xs-left mb-2 h6 color-black">{{$str("verify")}}</div>
                    <verify-slider v-on:passcallback="putVerified"></verify-slider>
                </div>


                <!--인증코드 입력-->
                <div v-if="status === 'verification'">
                    <div class="text-xs-left mb-2 h5 color-black">{{$str("account")}}</div>
                    <div class="p-relative mb-4">
                        <input type="text" class="input verification-account color-darkgray" v-model="email" disabled>
                    </div>
                    <div class="text-xs-left mb-2 color-black">{{$str("emailVerificationCode")}}</div>
                    <verification-code v-on:verify="onCheckVerificationCode()" :email="email" :type="'email'"></verification-code>
                </div>

                <!--비밀번호 입력-->
                <div v-if="status ==='password'">
                    <div class="text-xs-left mb-2 h5 color-black">{{$str("newPassword")}}</div>
                    <div class="p-relative mb-4">
                        <input v-model="new_password" type="password" class="input"
                               @keyup="onCheckNewPassword" maxlength="20"
                               v-bind:class="{'warning-border' : warning_new_password_border}">
                        <div class="warning-text-wrapper">
                           <span class="d-none"
                                 v-bind:class="{'warning-text' : warning_new_password}">{{$str('passwordValue')}}</span>
                            <span class="d-none"
                                  v-bind:class="{'warning-text' : warning_new_password_char_first,'warning-characters' : warning_new_password_char_second}">{{$str('warningPasswordCharacters')}}</span>
                            <span class="d-none"
                                  v-bind:class="{'warning-text' : warning_new_password_num_first,'warning-characters' : warning_new_password_num_second}">/ {{$str('passwordForm')}}</span>
                        </div>
                    </div>

                    <div class="text-xs-left mb-2 h5 color-black">{{$str("passwordConfirm")}}</div>
                    <div class="p-relative mb-4">
                        <input v-model="confirm_password" type="password" class="input"
                               @keyup="onCheckPasswordConfirm" maxlength="20"
                               v-bind:class="{'warning-border' : warning_confirm_password}">
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_confirm_password}">{{$str('passwordMatch')}}</span>
                        </div>
                    </div>
                </div>


                <div class="text-xs-right">
                    <button class="btn-white button-style" @click="goMyPage">{{$str('cancel')}}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onCheck()">{{$str('submit')}}
                    </button>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import {abUtils} from '@/common/utils';
    import VerifySlider from "@/components/VerifySlider";
    import VerificationCode from '@/components/VerificationCode.vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import Vue from "vue";

    export default {
        name: 'findPassword',
        data: function () {
            return {
                status: 'password',             //email -> verification -> password
                email: '',
                new_password: '',
                confirm_password: '',
                verify_warning_new_password: "",
                verify: false,
                isVerified: false,
                warning_email: false,
                warning_new_password: false,
                warning_verification_code: false,
                warning_confirm_password: false,
                warning_new_password_char_first: false,
                warning_new_password_char_second: false,
                warning_new_password_num_first: false,
                warning_new_password_num_second: false,
                warning_new_password_border: false,
            }
        },
        components: {
            VerifySlider,VerificationCode
        },
        created() {
            window.scrollTo(0, 0);
        },
        methods: {
            putVerified: function () {
                this.isVerified = true;
            },
            goMyPage : function () {
              MainRepository.router().goMyPage();
            },
            onCheck() {
                if(this.status === 'email' && this.isVerified){     //해당 이메일 계정 존재 체크 (1단계)
                    MainRepository.Users.isDuplicated({
                        email : this.email
                    }, (result) => {
                        if(result){
                            this.status = 'verification';
                            Vue.prototype.$eventBus.$emit('showAlert', 2051);
                        }
                    });
                }else if(this.status === 'verification' && this.verify){            //인증코드 체크 (2단계)
                    this.status = 'password';
                }else if(this.status === 'password' && this.onCheckNewPassword() && this.onCheckPasswordConfirm()){
                    this.onChange();
                }
            },
            // 인증코드 체크
            onCheckVerificationCode() {
                this.verify = true;
            },
            onCheckNewPassword() {
                //new password null
                if (this.new_password === "") {
                    this.warning_new_password_char_first = false;
                    this.warning_new_password_char_second = false;
                    this.warning_new_password_num_first = false;
                    this.warning_new_password_num_second = false;
                    this.warning_new_password = true;
                    this.warning_new_password_border = true;
                    return false;
                }

                if (this.new_password.length < 8 || this.new_password.length > 20 || !abUtils.isPasswd(this.new_password)) {

                    this.warning_new_password_border = true;
                    this.warning_new_password = false;
                    // 8-20 자
                    if (this.new_password.length < 8 || this.new_password.length > 20) {
                        this.warning_new_password_char_first = true;
                        this.warning_new_password_char_second = false;
                    } else {
                        this.warning_new_password_char_first = true;
                        this.warning_new_password_char_second = true;
                    }
                    // 비밀번호 양식
                    if (!abUtils.isPasswd_ignoreLength(this.new_password)) {
                        this.warning_new_password_num_first = true;
                        this.warning_new_password_num_second = false;
                    } else {
                        this.warning_new_password_num_first = true;
                        this.warning_new_password_num_second = true;
                    }
                    return false;
                }
                this.warning_new_password_border = false;
                this.warning_new_password = false;
                this.warning_new_password_char_first = false;
                this.warning_new_password_char_second = false;
                this.warning_new_password_num_first = false;
                this.warning_new_password_num_second = false;
                return true;

            },
            onCheckPasswordConfirm() {
                //confirm password null
                if (this.new_password != this.confirm_password) {
                    this.warning_confirm_password = true;
                    return false;
                }
                this.warning_confirm_password = false;
                return true;
            },
            onChange() {
                // AXIOS post 작업 진행
                MainRepository.Users.resetPassword({
                    email : this.email,
                    password: this.new_password,
                    verificationMethod : 'email'
                }, (result) => {
                    Vue.prototype.$eventBus.$emit('showAlert', 2052);
                    MainRepository.router().goLogin();
                })
            },
        }
    }
</script>
<style scoped>
    .iconLogo {
        width: 30px;
        height: 24px;
    }

    .card-flex {
        border-radius: 3px;
        border: solid 1px #8d8d8d;
        padding-bottom: 40px !important;
    }

    .login-title {
        display: flex;
    }

    .verification-account {
        background: #f8f8fa;
    }

    .button-style {
        width: 96px;
    }

    .warning-characters {
        color: #71aa3a !important;
        font-size: 10px;
        display: block !important;
    }
</style>