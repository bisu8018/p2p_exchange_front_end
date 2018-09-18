<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-4a login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{type === 'email' ? $str("linkEmail") : $str("linkPhone")}}</div>
                </div>
                <div v-if="type === 'phone'">
                    <!--전화 번호 입력-->
                    <div class="mb-4">
                        <div class=" color-black  mb-2 text-xs-left">
                            {{$str("phoneNumber")}}
                        </div>
                        <div class="p-relative selectbox-wrapper">
                            <phone-select-box :selectBoxType="'phone'" v-on:phone="setCode"
                                        class="selectbox-width-part"></phone-select-box>
                            <input type="tel" class="input input-phone" v-model="phone_number" maxlength="18">
                        </div>
                    </div>

                    <!--문자인증-->
                    <div class="mb-4">
                        <div class=" color-black  mb-2 text-xs-left">
                            {{$str("SMSverification")}}
                        </div>
                        <verification-code v-on:verify="onCheckVerificationCode" :phone="code_number + getPhoneNumber"
                                           :type="'phone'"></verification-code>
                    </div>
                </div>
                <div class="text-xs-right">
                    <button class="btn-white  button-style" @click="goMyPage">{{$str('cancel')}}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onLink">{{$str('link')}}</button>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import {abUtils} from '@/common/utils';
    import PhoneSelectBox from "../item/phoneSelectBox.vue";
    import VerificationCode from '@/components/VerificationCode.vue';
    import MainRepository from "../../../../../vuex/MainRepository";

    export default {
        name: 'linkAccount',
        components: {PhoneSelectBox, VerificationCode},
        computed: {
            getPhoneNumber() {
                let numLength = this.phone_number.length;
                if (this.phone_number.substr(0, 1) == 0) {
                    return this.phone_number.substr(1, numLength - 1);
                } else {
                    return this.phone_number;
                }
            },
        },
        data: function () {
            return {
                type: '',
                phone_number: '',
                code_number: '+86',
                verify: false,
                verificationCode: '',

            }
        },
        created() {
            window.scrollTo(0, 0);
            let url = location.href;
            let parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
            this.type = parameters[0];
        },
        methods: {

            goMyPage() {
                MainRepository.router().goMyPage();
            },
            onLink() {
                let self = this;
                MainRepository.Service.Account().Account.checkVerificationCode('phone', {
                    email: MainRepository.MyInfo.getUserInfo().email,
                    phoneNumber: self.code_number + self.phone_number,
                    code: self.verificationCode,
                    status: 'turn_on',
                }, (result) => {
                    this.verifyStatus = 'verified';
                    this.goMyPage();
                }, () => {
                    return false;
                });
            },
            //지역번호 select box 값 get
            setCode(value) {
                this.code_number = value;
            },
            // 인증코드 체크
            onCheckVerificationCode(code) {
                this.verify = true;
                this.verificationCode = code;
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

    .input-phone {
        border: none;
        font-size: 12px;
    }
</style>