<template>
    <v-layout mt-5 mb-5 ml-3 mr-3>
        <v-flex xs12 lg4 offset-lg4>
            <div class="mb-4a signup-flex">
                <div class="pt-1">
                    <img class="iconLogo mr-2" src="@/assets/img/logo_black.png"></div>
                <div class="title-2">{{$str("signupSubject")}}</div>
            </div>

            <!--국가 select box-->
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("country")}}</div>
            <select-box></select-box>

            <!--Email 입력필드-->
            <div class="text-xs-left mb-2 caption input-label mt-4">{{$str("email")}}</div>
            <div class="text-input-wrapper">
                <input name="email" v-model="email" type="text" class="common-input mb-4"
                       v-bind:class="{'warning_border' : warning_email}" @blur="onCheckEmail">
                <div class="warning-text-wrapper">
                    <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_email}">{{verify_warning_email}}</span>
                </div>
            </div>

            <!--인증코드 입력필드-->
            <div class="text-xs-left mb-2 caption input-label">{{$str("emailVerificationCdoe")}}</div>
            <div class="verification-wrapper">
                <input name="verificationCode" v-model="verificationCode" type="text" class="common-input mb-4"
                       autocomplete="off" v-bind:class="{'warning_border' : warning_verification_code}"
                       @blur="onCheckVerificationCode">
                <span class="click-send-text" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
                <div class="warning-text-wrapper">
                    <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_verification_code}"
                    >{{verify_warning_verification_code}}</span>
                </div>
            </div>

            <!--비밀번호 입력필드-->
            <div class="text-xs-left mb-2 caption input-label">{{$str("password")}}</div>
            <div class="text-input-wrapper">
                <input v-bind:label="$str('password')" v-model="password" :type="'password'"
                       class="common-input mb-4" :placeholder="$str('passwordPlaceholder')"
                       v-bind:class="{'warning_border' : warning_password}" @blur="onCheckPassword">
                <div class="warning-text-wrapper">
                    <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_password}">{{verify_warning_password}}</span>
                </div>
            </div>

            <!--비밀번호 확인 입력필드-->
            <div class="text-xs-left mb-2 caption input-label">{{$str("passwordConfirm")}}</div>
            <div class="text-input-wrapper">
                <input v-bind:label="$str('passwordConfirm')" v-model="passwordConfirm" :type="'password'"
                       class="common-input mb-4" :placeholder="$str('passwordPlaceholder')"
                       v-bind:class="{'warning_border' : warning_password_confirm}" @blur="onCheckPasswordConfirm">
                <div class="warning-text-wrapper">
                    <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_password_confirm}">{{verify_warning_password_confirm}}</span>
                </div>
            </div>

            <!--이용약관 체크박스-->
            <div class="mb-4 text-xs-left">
                <label class="caption"><input id="termsCheckbox" type="checkbox" v-model="checkbox"
                                              @click="onCheckTerms()"
                                              class="mr-2">{{$str('termsLabel')}}</label>
                <div class="warning_terms_text">
                    <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_verify_terms}">{{verify_terms}}</span>
                </div>
            </div>

            <!--로그인/ 회원가입 버튼-->
            <div class="signup-flex">
                <v-flex mr-2 xs6>
                    <button class="signup-btn btnHover block" @click="onCheck">{{$str("signupText")}}</button>
                </v-flex>
                <v-flex text-xs-left xs6 caption>
                    <div>{{$str("haveAccount")}}</div>
                    <div><a @click='goLogin' class="layer-text signup-a">{{$str("loginText")}}</a></div>
                </v-flex>
            </div>
        </v-flex>
        <verification-modal :show="showModal" v-on:verifyConfirm="onSignup"></verification-modal>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';
    import AccountService from '@/service/account/AccountService';
    import SelectBox from '@/components/SelectBox.vue';
    import VerificationModal from '@/components/VerificationModal.vue';
    import MainRepository from "@/vuex/MainRepository";

    export default Vue.extend({
        name: 'home',
        components: {
            SelectBox, VerificationModal
        },
        data: () => ({
            email: "",
            password: "",
            passwordConfirm: "",
            checkbox: false,
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
            // 전체 값 체크
            onCheck() {this.showModal = true;
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
                if (this.verificationCode === "") {
                    this.verify_warning_verification_code = Vue.prototype.$str("verificationCode");
                    this.warning_verification_code = true;
                    return false;
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
                //Send Email verification codes to Server
                AccountService.Account.signup({
                    country: MainRepository.SelectBox.controller().getCountry(),
                    email: this.email,
                    encryptedPassword: this.password,
                    verificationCode: this.verificationCode
                }, function (error) {
                    if (!error) {
                        //console.log("success");
                        alert("Thank you");
                        location.href = "/abMain";

                    } else {
                        console.log("POST ERROR ::::::: " + error);
                    }
                })
            },
            // 로그인 페이지 이동
            goLogin() {
                this.$router.push("/login");
            },
            // 인증 코드 이메일 전송
            sendVerificationCode() {
                if (this.onCheckEmail() === true) {
                    AccountService.Account.sendVerificationCode({
                        email: this.email
                    }, function (error) {
                        if (!error) {
                            console.log("code send success");
                        } else {
                            console.log("POST ERROR ::::::: " + error);
                        }
                    })
                }
            }
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

    .signup-btn {
        border-radius: 3px;
        background-color: #214ea1;
        color: white;
        height: 40px;
        width: 100%;

    }

    .input-label {
        color: #9294a6;
    }

    .common-input {
        background: white;
    }

    .signup-a {
        font-size: 14px;
        color: #214ea1;
    }

    .signup-a:hover {
        color: #316ee4;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        font-size: 10px;
        color: #c8c8c8;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size: 10px;
        color: #c8c8c8;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        font-size: 10px;
        color: #c8c8c8;
    }

    .verification-wrapper {
        position: relative;
    }

    .click-send-text {
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #214ea1;
        position: absolute;
        right: 11px;
        top: 10px;
        cursor: pointer;
    }

    .click-send-text:hover {
        color: #316ee4;
    }

    .warning_terms_text {
        position: absolute;
    }


</style>