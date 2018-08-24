<!--
[html element 추가]
<verification-code :verify="onCheckVerificationCode"></verification-code>

[data 추가]
verify: false,

[함수 추가]
onCheckVerificationCode() {
this.verify = true;
},

필요에 따라  함수 추가!
-->




<template>
    <div class="p-relative" v-bind:class="{'pe-none' : verifyStatus === 'verified'}">
        <input name="verificationCode" v-model="verificationCode" type="text" class="input mb-4" maxlength="7"
               autocomplete="off" v-bind:class="{'warning-border' : warning_verification_code, 'input-disabled' : verifyStatus === 'verified'}"
               @keyup="onCheckVerificationCode" @blur="onCheckVerificationCode">
        <span class="cs-click-send text-white-hover" @click="sendVerificationCode"
              v-if="verifyStatus === 'unverified'">{{$str("clickToSend")}}</span>
        <span class="cs-timer"
              v-else-if="verifyStatus === 'verifying'">{{$str('timerExplain1')}}  {{setTime}}  {{$str('timerExplain2')}}</span>
        <span class="cs-code-verified "
              v-else>{{$str("verifySliderSuccess")}}</span>
        <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_verification_code}"
                    >{{verify_warning_verification_code}}</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import AccountService from '@/service/account/AccountService';
    import {abUtils} from "../common/utils";
    import MainRepository from "../vuex/MainRepository";

    export default Vue.extend({
        name: 'verificationCode',
        props: {
            email: {
                type: String,
                default: ''
            },
            phone: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'signup'
            },
        },
        data: () => ({
            setTime: 60,
            verifyStatus: 'unverified',        //unverified -> verifying -> verified
            verify_warning_verification_code: "",
            verificationCode: "",
            warning_verification_code: false,
        }),
        methods: {
            // 시간 타이머 설정
            getTimer() {
                var start = setInterval(() => {
                    if (this.setTime > 0) {
                        this.setTime--;
                        if(this.verifyStatus === 'verified'){
                            clearInterval(start);
                            this.setTime = 60;
                        }
                    } else {
                        clearInterval(start);
                        this.verifyStatus = 'unverified';
                        this.setTime = 60;
                    }
                }, 1000);
            },
            // 인증코드 체크
            onCheckVerificationCode() {
                let self = this;
                if (this.verifyStatus === 'verifying') {
                    if (this.verificationCode === "") {
                        self.verify_warning_verification_code = Vue.prototype.$str("verificationCode");
                        self.warning_verification_code = true;
                        return false;
                    } else if (this.verificationCode.length >= 6) {
                        this.checkVerificationCode();
                    }
                }
                self.warning_verification_code = false;
                return true;

            },
            // 인증 코드 전송
            sendVerificationCode() {
                if(this.onCheckEmail() || this.onCheckPhone()){
                    let self = this;
                    let email = self.email;

                    if (self.type === 'phone') {
                        email = MainRepository.MyInfo.getUserInfo().email;
                    }

                    AccountService.Account.sendVerificationCode(self.type, {
                        email: email,
                        phoneNumber: self.phone,
                    }, function (result) {
                        self.verifyStatus = 'verifying';
                        self.getTimer();
                    })
                }
            },
            //인증코드 체크
            checkVerificationCode() {
                let self = this;
                AccountService.Account.checkVerificationCode(self.type, {
                    email: self.email,
                    code: self.verificationCode,
                    phoneNumber: self.phone,
                    status: 'requested'
                }, function (result) {
                    self.verifyStatus = 'verified';
                    self.$emit('verify', self.verificationCode);
                })
            },
            // 이메일 체크
            onCheckEmail() {
                //email null
                if (this.email === "" || !abUtils.isEmail(this.email)) {
                    return false;
                }
                return true;
            },
            //전화 번호 체크
            // 문자전송은 유로이므로, 미리 체크 할 수 있도록 추가 필요
            onCheckPhone() {
                // if(!abUtils.isPhone(this.phone)){
                //     return false;
                // }
                return true;
            }
        }
    });
</script>

<style scoped>
</style>