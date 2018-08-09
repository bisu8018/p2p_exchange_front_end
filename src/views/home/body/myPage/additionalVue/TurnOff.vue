<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-3 login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{type === 'email' ? $str("email") : $str("phone")}} {{$str("turnOff")}}</div>
                </div>
                <div class="color-darkgray mb-4 text-xs-left">
                    {{$str("emailTurnOffExplain")}}
                </div>
                <!--******************************************
                                    TURN ON
                 ******************************************-->
                <div >
                    <!--전화 번호 입력-->
                    <div class="mb-4">
                        <div class=" color-black  mb-2 text-xs-left">
                            {{$str("phoneNumber")}}
                        </div>
                        <div class="input-disabled  vertical-center disabled">{{setPhoneNumber}}</div>
                    </div>

                    <!--문자인증-->
                    <div class="mb-4">
                        <div class=" color-black  mb-2 text-xs-left">
                            {{$str("SMSverification")}}
                        </div>
                        <div class="p-relative">
                            <input type="text" class="input" v-model="SMSVerificationCode" maxlength="12">
                            <span class="cs-click-send text-white-hover" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <!--이메일 입력-->
                    <div class="mb-4">
                        <div class=" color-black  mb-2 text-xs-left">
                            {{$str("email")}}
                        </div>
                        <div class="input-disabled  vertical-center disabled">{{setEmail}}</div>
                    </div>

                    <!--이메일인증-->
                    <div class="mb-4">
                        <div class=" color-black  mb-2 text-xs-left">
                            {{$str("emailVerification")}}
                        </div>
                        <div class="p-relative">
                            <input type="text" class="input" v-model="emailVerificationCode" maxlength="12">
                            <span class="cs-click-send text-white-hover" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
                        </div>
                    </div>
                </div>
                <div class="text-xs-right">
                    <button class="btn-white  button-style" @click="goMyPage">{{$str('cancel')}}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onChange">{{$str('change')}}</button>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';

    export default {
        name: 'turnOff',
        data: function () {
            return {
                type : '',
                user : {
                    member_no : 0,
                    phoneNo : '01012341234',
                    email: 'test@naver.com'
                },
                SMSVerificationCode : '',
                emailVerificationCode : ''

            }
        },
        created () {
            window.scrollTo(0,0);
            var url = location.href;
            var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
            this.type = parameters[0];
        },
        computed: {
            setPhoneNumber: function () {
                var phoneNumber = this.user.phoneNo.substr(0, 3) + '****' + this.user.phoneNo.substr(7, 5);
                return phoneNumber;
            },
            setEmail: function () {
                var emailSplit = this.user.email.split('@');
                var emailValue = emailSplit[0].substr(0,2) + '****' + '@' + emailSplit[1];
                return emailValue;
            }
        },
        methods: {
            goMyPage() {
                this.$router.push("/myPage");
            },
            onChange() {
                // type 별로 AXIOS post 작업 진행

                // 성공후 push
                this.goMyPage();
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                if (this.onCheckOldPassword() && this.onCheckNewPassword() && this.onCheckPasswordConfirm()) {
                    this.onChange();
                }
            },
            sendVerificationCode() {

            }
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
</style>