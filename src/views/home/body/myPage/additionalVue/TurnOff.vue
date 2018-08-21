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

                    <!--전화 번호-->
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("phoneNumber")}}
                    </div>
                    <div class="input-disabled  vertical-center disabled mb-4">{{setPhoneNumber}}</div>

                    <!--문자인증-->
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("SMSverification")}}
                    </div>
                    <verification-code v-on:verify="onCheckVerificationCode(code,'phone')" :phone="phone"
                                       :type="'phone'" />

                    <!--이메일 -->
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("email")}}
                    </div>
                    <div class="input-disabled  vertical-center disabled mb-4">{{setEmail}}</div>


                    <!--이메일인증-->
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("emailVerification")}}
                    </div>
                    <verification-code v-on:verify="onCheckVerificationCode(code,'email')" :email="email"
                                       :type="'email'" />


                <div class="text-xs-right">
                    <button class="btn-white  button-style" @click="goMyPage">{{$str('cancel')}}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onChange">{{$str('change')}}
                    </button>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import VerificationCode from '@/components/VerificationCode.vue';
    import AccountService from "../../../../../service/account/AccountService";

    export default {
        name: 'turnOff',
        components: {
            VerificationCode
        },
        data: function () {
            return {
                type: '',
                email: MainRepository.MyInfo.getUserInfo().email,
                phone: MainRepository.MyInfo.getUserInfo().phoneNumber,
                emailVerify: false,
                phoneVerify: false,
                phoneCode: '',
                emailCode : ''
            }
        },
        created() {
            window.scrollTo(0, 0);
            var url = location.href;
            var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
            this.type = parameters[0];
        },
        computed: {
            setPhoneNumber: function () {
                var phoneNumber = this.phone.substr(0, 3) + '****' + this.phone.substr(7, 5);
                return phoneNumber;
            },
            setEmail: function () {
                var emailSplit = this.email.split('@');
                var emailValue = emailSplit[0].substr(0, 2) + '****' + '@' + emailSplit[1];
                return emailValue;
            }
        },
        methods: {
            goMyPage() {
                this.$router.push("/myPage");
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                if ( this.emailVerify === true && this.phoneVerify === true) {
                    this.onChange();
                }
            },
            onChange() {
                let self = this;
                // type 별로 AXIOS post 작업 진행
                AccountService.Account.checkVerificationCode('phone',{
                    email : self.email,
                    phoneNumber : self.phoneNumber,
                    code : self.phoneCode
                },function (result) {
                    this.goMyPage();
                });
            },
            // 인증코드 체크
            onCheckVerificationCode(code,type) {
                if (type === 'email') {
                    this.emailVerify = true;
                    this.emailCode = code;
                } else {
                    this.phoneVerify = true;
                    this.phoneCode = code;
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
</style>