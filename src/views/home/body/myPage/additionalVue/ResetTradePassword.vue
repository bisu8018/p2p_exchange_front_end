<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-4 login-title ">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold text-xs-left subject-wrapper">{{$str("resetTradePassword")}}</div>
                </div>

                <!--새로운 비밀번호-->
                <div class="text-xs-left mb-2 h5 color-black">{{$str("newTradePassword")}}</div>
                <div class="p-relative mb-4">
                    <input v-model="new_password" type="password" class="input"
                           @keyup="onCheckNewPassword" maxlength="24"
                           v-bind:class="{'warning-border' : warning_new_password}">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_new_password}">{{warning_password}}</span>
                    </div>
                </div>

                <!--비밀번호 확인-->
                <div class="text-xs-left mb-2 h5 color-black">{{$str("confirmTradePassword")}}</div>
                <div class="p-relative mb-4">
                    <input v-model="confirm_password" type="password" class="input"
                           @keyup="onCheckPasswordConfirm" maxlength="24"
                           v-bind:class="{'warning-border' : warning_confirm_password}">
                    <div class="warning-text-wrapper">
                        <span class="d-none" v-bind:class="{'warning-text' : warning_confirm_password}">{{$str('passwordMatch')}}</span>
                    </div>
                </div>
                <div v-if="emailVerification.status === 'turn_on'">
                    <!--이메일인증-->
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("emailVerification")}}
                    </div>
                    <verification-code v-on:verify="onCheckVerificationCode('email')" :email="email"
                                       :type="'email'"></verification-code>
                </div>
                <div v-if="phoneVerification.status === 'turn_on'">
                    <!--문자인증-->
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("SMSverification")}}
                    </div>
                    <verification-code v-on:verify="onCheckVerificationCode('phone')" :phone="phone"
                                       :type="'phone'"></verification-code>

                </div>
                <div class="text-xs-right">
                    <button class="btn-white  button-style" @click="goMyPage">{{$str('cancel')}}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onCheck">{{$str('confirm')}}
                    </button>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';
    import VerificationCode from '@/components/VerificationCode.vue';
    import MainRepository from "@/vuex/MainRepository";
    import EmailVerification from "@/vuex/model/EmailVerification";
    import PhoneVerification from "@/vuex/model/PhoneVerification";
    import AccountService from "../../../../../service/account/AccountService";

    export default {
        name: 'resetTradePassword',
        components: {
            VerificationCode
        },
        data: function () {
            return {
                emailVerify: false,
                phoneVerify: false,

                new_password: '',
                confirm_password: '',
                warning_password: "",
                warning_new_password: "",
                warning_confirm_password: "",

                emailVerification: new EmailVerification(''),
                phoneVerification: new PhoneVerification(''),
            }
        },
        created() {
            window.scrollTo(0, 0);
            // 유저 인증 정보 GET
            let self = this;
            MainRepository.MyPage.getMemberVerification(function (email, phone) {
                self.emailVerification = email;
                self.phoneVerification = phone;
            });
        },
        methods: {
            goMyPage() {
                this.$router.push("/myPage");
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                if (this.onCheckNewPassword() && this.onCheckPasswordConfirm()) {
                    if ((this.emailVerification.status === 'turn_on' && this.phoneVerification.status != 'turn_on' && this.emailVerify === true) ||
                        (this.phoneVerification.status === 'turn_on' && this.emailVerification.status != 'turn_on' && this.phoneVerify === true) ||
                        (this.phoneVerification.status === 'turn_on' && this.emailVerification.status === 'turn_on' && this.phoneVerify === true && this.emailVerify === true)) {
                        this.onConfirm();
                    }
                }
            },
            onConfirm() {
                // AXIOS POST 성공 후
                let self = this;
                AccountService.Account.setNickName({
                    email : MainRepository.MyInfo.getUserInfo().email,
                    nickName : MainRepository.MyInfo.getUserInfo().nickName,
                    tradePassword : self.new_password
                },function (result) {
                    goMyPage();
                });
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
            onCheckNewPassword() {
                //new password null
                if (this.new_password === "") {
                    this.warning_new_password = true;
                    this.warning_password = Vue.prototype.$str('passwordValue');
                    return false;
                }
                if (!abUtils.isPasswd(this.new_password)) {
                    this.warning_new_password = true;
                    this.warning_password = Vue.prototype.$str('passwordForm');
                    return false;
                }
                this.warning_new_password = false;
                return true;
            },
            // 인증코드 체크
            onCheckVerificationCode(type) {
                if (type === 'email') {
                    this.emailVerify = true;
                } else {
                    this.phoneVerify = true;
                }

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

    .button-style {
        width: 96px;
    }

    .warning-characters {
        color: #71aa3a !important;
        font-size: 10px;
        display: block !important;
    }

    .subject-wrapper {
        margin-top: -9px;
        line-height: 2;
    }
</style>