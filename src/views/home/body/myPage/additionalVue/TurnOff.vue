<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-3 login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{ type === 'email' ? $str("email") : $str("phone") }} {{ $str("turnOff") }}</div>
                </div>
                <div class="color-darkgray mb-4 text-xs-left">
                    {{ type === 'email' ? $str("emailTurnOffExplain") : $str("phoneTurnOffExplain") }}
                </div>
                    <span v-if="type === 'email'">

                        <!--이메일 -->
                        <div class=" color-black  mb-2 text-xs-left">
                            {{ $str("email") }}
                        </div>
                        <div class="input-disabled  vertical-center disabled mb-4">{{ setEmail }}</div>


                        <!--이메일인증-->
                        <div class=" color-black  mb-2 text-xs-left">
                            {{ $str("emailVerification") }}
                        </div>
                        <verification-code v-on:verify="onCheckVerificationCode" :email="email"
                                           :type="'email'" />
                    </span>

                    <span v-if="type === 'phone'">

                        <!--전화 번호-->
                        <div class=" color-black  mb-2 text-xs-left">
                            {{ $str("phoneNumber") }}
                        </div>
                        <div class="input-disabled  vertical-center disabled mb-4">{{ setPhoneNumber }}</div>

                        <!--문자인증-->
                        <div class=" color-black  mb-2 text-xs-left">
                            {{ $str("SMSverification") }}
                        </div>
                        <verification-code v-on:verify="onCheckVerificationCode" :phone="phone"
                                           :type="'phone'" />
                    </span>


                <div class="text-xs-right">
                    <button class="btn-white  button-style" @click="goMyPage">{{ $str('cancel') }}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onChange">{{ $str('change') }}
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
                verificationCode: '',
            }
        },
        created() {
            window.scrollTo(0, 0);
            let url = location.href;
            let parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
            this.type = parameters[0];
        },
        computed: {
            setPhoneNumber: function () {
                let phoneNumber = this.phone.substr(0, 5) + '****' + this.phone.substr(10, 7);
                return phoneNumber;
            },
            setEmail: function () {
                let emailSplit = this.email.split('@');
                let emailValue = emailSplit[0].substr(0, 2) + '****' + '@' + emailSplit[1];
                return emailValue;
            }
        },
        methods: {
            goMyPage() {
                MainRepository.router().goMyPage();
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
                MainRepository.Service.Account().Account.checkVerificationCode(this.type,{
                    email : self.email,
                    phoneNumber : self.phone,
                    code : self.verificationCode,
                    status : 'turn_off',
                    isForValidation: false,
                }, (result) => {
                    this.goMyPage();
                }, () => {
                    return false;
                });
            },
            // 인증코드 체크
            onCheckVerificationCode(code) {
                if (this.type === 'email') {
                    this.emailVerify = true;
                    this.verificationCode = code;
                } else {
                    this.phoneVerify = true;
                    this.verificationCode = code;
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