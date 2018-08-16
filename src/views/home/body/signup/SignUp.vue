<template>
    <v-layout pt-5 pb-5>
        <v-flex xs12 lg4 offset-lg4>
            <div class="mb-4a signup-flex align-center">
                <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                <div class="h2 bold">{{$str("signupSubject")}}</div>
            </div>

            <!--국가 select box-->
            <div class="text-xs-left mb-2 color-black mt-1">{{$str("country")}}</div>
            <select-box :selectBoxType="'signupCountry'"></select-box>

            <!--Email 입력필드-->
            <div class="text-xs-left mb-2 color-black mt-4">{{$str("email")}}</div>
            <div class="p-relative">
                <input name="email" v-model="email" type="text" class="input mb-4"
                       v-bind:class="{'warning-border' : warning_email}" @keyup="onCheckEmail">
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_email}">{{verify_warning_email}}</span>
                </div>
            </div>

            <!--인증코드 입력필드-->
            <div class="text-xs-left mb-2 color-black">{{$str("emailVerificationCode")}}</div>
            <div class="p-relative">
                <input name="verificationCode" v-model="verificationCode" type="text" class="input mb-4" maxlength="7"
                       autocomplete="off" v-bind:class="{'warning-border' : warning_verification_code}"
                       @keyup="onCheckVerificationCode">
                <span class="cs-click-send text-white-hover" @click="sendVerificationCode"
                      v-if="verifyStatus === 'unverified'">{{$str("clickToSend")}}</span>
                <span class="cs-timer" @click="sendVerificationCode"
                      v-else-if="verifyStatus === 'verifying'">{{$str('timerExplain1')}}  {{setTime}}  {{$str('timerExplain2')}}</span>
                <span class="cs-code-verified " @click="sendVerificationCode"
                      v-else>{{$str("verifySliderSuccess")}}</span>
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_verification_code}"
                    >{{verify_warning_verification_code}}</span>
                </div>
            </div>

            <!--비밀번호 입력필드-->
            <div class="text-xs-left mb-2 color-black">{{$str("password")}}</div>
            <div class="p-relative">
                <input v-bind:label="$str('password')" v-model="password" :type="'password'"
                       class="input mb-4" :placeholder="$str('passwordPlaceholder')"
                       v-bind:class="{'warning-border' : warning_password}" @keyup="onCheckPassword">
                <div class="warning-text-wrapper">
                    <span class="d-none"
                          v-bind:class="{'warning-text' : warning_password}">{{verify_warning_password}}</span>
                </div>
            </div>

            <!--비밀번호 확인 입력필드-->
            <div class="text-xs-left mb-2 color-black">{{$str("passwordConfirm")}}</div>
            <div class="p-relative">
                <input v-bind:label="$str('passwordConfirm')" v-model="passwordConfirm" :type="'password'"
                       class="input mb-4" :placeholder="$str('passwordPlaceholder')"
                       v-bind:class="{'warning-border' : warning_password_confirm}" @keyup="onCheckPasswordConfirm">
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_password_confirm}">{{verify_warning_password_confirm}}</span>
                </div>
            </div>

            <!--이용약관 체크박스-->
            <div class="mb-4 text-xs-left">
                <v-layout>
                <input id="termsCheckbox" type="checkbox" v-model="termsAgreeYn"
                       @click="onCheckTerms()"
                       class="mr-2">
                <label for="termsCheckbox"><span><i class="material-icons">done</i></span>{{$str('termsLabel1')}}</label>
                <span class="color-blue text-white-hover" @click="go_Terms_of_Service()">&nbsp;{{$str('termsLabel2')}}</span>
                </v-layout>
                <div class="p-absolute">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_verify_terms}">{{verify_terms}}</span>
                </div>
            </div>

            <!--로그인/ 회원가입 버튼-->
            <div class="signup-flex ">
                <v-flex mr-2 xs6 padding-none>
                    <button class="btn-blue btn-blue-hover" @click="onCheck">{{$str("signupText")}}</button>
                </v-flex>
                <v-flex text-xs-left xs6 h6 padding-none>
                    <div class="color-black">{{$str("haveAccount")}}</div>
                    <div><a @click='goLogin' class="h6 color-blue text-white-hover">{{$str("loginText")}}</a></div>
                </v-flex>
            </div>
        </v-flex>
        <verification-modal ref="child" :show="showModal" v-on:verifyConfirm="onSignup"
                            v-on:close="onClose"></verification-modal>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';
    import AccountService from '@/service/account/AccountService';
    import SelectBox from '@/components/SelectBox.vue';
    import VerificationModal from '@/components/VerificationModal.vue';
    import Alerts from '@/components/Alerts.vue';
    import MainRepository from "@/vuex/MainRepository";

    export default Vue.extend({
        name: 'home',
        components: {
            SelectBox, VerificationModal, Alerts
        },
        data: () => ({
            setTime: 60,
            email: "",
            password: "",
            passwordConfirm: "",
            termsAgreeYn: false,
            verifyStatus: 'unverified',        //unverified -> verifying -> verified
            verify_warning_email: "",
            verify_warning_verification_code: "",
            verify_warning_password: "",
            verify_warning_password_confirm: "",
            verify_terms: "",
            verificationCode: "",
            warning_email: false,
            warning_verification_code: false,
            warning_password: false,
            warning_password_confirm: false,
            warning_verify_terms: false,
            showModal: false
        }),
        methods: {
            // 시간 타이머 설정
            getTimer() {
                var start = setInterval(() => {
                    if (this.setTime > 0) {
                        this.setTime--;
                    } else {
                        clearInterval(start);
                        this.verifyStatus = 'unverified';
                        this.setTime = 5;
                    }
                }, 1000);
            },
            verifyComplete() {
                this.verifyStatus = 'verified';
            },
            // 전체 값 체크
            onCheck() {
                if (this.onCheckEmail() && this.onCheckVerificationCode() && this.onCheckPassword() && this.onCheckTerms()) {
                    this.showModal = true;
                }
            },
            // 이메일 체크
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
            // 인증코드 체크
            onCheckVerificationCode() {
                if (this.verifyStatus === 'verifying') {
                    if (this.verificationCode === "") {
                        this.verify_warning_verification_code = Vue.prototype.$str("verificationCode");
                        this.warning_verification_code = true;
                        return false;
                    } else if (this.verificationCode.length >= 6) {
                        this.checkVerificationCode();
                    }
                }
                this.warning_verification_code = false;
                return true;

            },
            // 비밀번호 체크
            onCheckPassword() {
                //password null
                if (this.password === "") {
                    this.verify_warning_password = Vue.prototype.$str("passwordValue");
                    this.warning_password = true;
                    return false;
                }
                //password digit
                if (this.password.length <= 8) {
                    this.verify_warning_password = Vue.prototype.$str("passwordDigit");
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
            // 비밀번호 확인 체크
            onCheckPasswordConfirm() {
                if (this.password === "") {
                    this.verify_warning_password = Vue.prototype.$str("passwordValue");
                    this.warning_password = true;
                    return false;
                }
                //password ~ password confirm match
                if (this.password !== this.passwordConfirm) {
                    this.verify_warning_password_confirm = Vue.prototype.$str("passwordMatch");
                    this.warning_password_confirm = true;
                    return false;
                }
                this.warning_password_confirm = false;
                return true;
            },
            // 이용약관 체크
            onCheckTerms() {
                var checked = (document.getElementById("termsCheckbox") as HTMLInputElement).checked;

                //terms and conditions
                if (checked === false) {
                    this.verify_terms = Vue.prototype.$str("acceptConditions");
                    this.warning_verify_terms = true;
                    return false;
                }
                this.warning_verify_terms = false;
                return true;
            },
            // 회원가입
            onSignup() {
                let self = this;
                //Send Email verification codes to Server
                AccountService.Account.signup({
                    bgColor: '',
                    email: this.email,
                    encryptedPassword: this.password,
                    membershipLevel: 'none',
                    nationality: MainRepository.SelectBox.controller().getCountry(),
                    //nickname : '',
                    //phoneNumber : '',
                    role: 'ROLE_CUSTOMER',
                    termsAgreeYn: this.termsAgreeYn,
                    tradePassword: ''
                }, function (error) {
                    if (!error) {
                        //console.log("success");
                        //성공 alert 추가

                        // self.showWarning(1);
                        //location.href = "/abMain";
                    } else {
                        console.log("POST ERROR ::::::: " + error);
                    }
                })
            },
            // 모달 종료
            onClose() {
                this.showModal = false;
            },
            // 로그인 페이지 이동
            goLogin() {
                this.$router.push("/login");
            },
            // 인증 코드 이메일 전송
            sendVerificationCode() {
                this.verifyStatus = 'verifying';
                this.getTimer();
                if (this.onCheckEmail() === true) {
                    let self = this;
                    AccountService.Account.sendVerificationCode({
                        email: this.email
                    }, function (error) {
                        if (!error) {
                            self.verifyStatus = 'verifying';
                            self.getTimer();
                        } else {
                            console.log("ERROR ::::::: " + error);
                        }
                    })
                }
            },
            //인증코드 체크
            checkVerificationCode() {
                let self = this;
                AccountService.Account.checkVerificationCode({
                    email: this.email,
                    code: this.verificationCode
                }, function (error) {
                    if (!error) {
                        console.log("code check success");
                        self.verifyStatus = 'verified';
                    } else {
                        console.log("ERROR ::::::: " + error);
                    }
                })
            },
            go_Terms_of_Service(){          //terms of service 누를시 zendisk로 이동
                if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
            },
            /*showWarning(code) {
                this.$eventBus.$emit('showAlert', code);
            }*/
        }
    });
</script>

<style>
    .selectbox-width {
        width: 100%;
    }

    .signup-flex {
        display: flex;
    }

    .iconLogo {
        width: 30px;
        height: 24px;
    }

    .padding-none {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }


</style>