<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-3 login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{$str("changeLinkedPhone")}}</div>
                </div>

                <div class="color-darkgray mb-4 text-xs-left">
                    {{$str("changeLinkedPhoneExplain")}}
                </div>

                <!--새로운 전화번호 입력-->
                <div class="mb-4">
                    <div class="text-xs-left mb-2 color-black">{{$str("newPhoneNumber")}}</div>
                    <div class="p-relative phone-wrapper">
                        <select-box :selectBoxType ="'phone'" v-on:number="setCode" class="selectbox-width selectbox-locale-number"></select-box>
                        <input type="tel" class="input input-phone" v-model="newPhoneNumber" maxlength="18">
                    </div>
                </div>

                <!--문자인증-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("SMSverification")}}
                    </div>
                    <verification-code v-on:verify="onCheckVerificationCode" :phone="getPhoneNumber ? code_number + getPhoneNumber : ''"
                                       :type="'phoneChange'"></verification-code>
                </div>


                <div class="text-xs-right">
                    <button class="btn-white  button-style" @click="goMyPage">{{$str('cancel')}}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onCheck">{{$str('link')}}</button>
                </div>
            </div>
        </v-flex>
        <change-phone-modal
                :show="showModal"
                @close="onCloseModal()"
                @confirm="onConfirm()"
        />
    </v-layout>
</template>

<script>
    import {abUtils} from '@/common/utils';
    import AccountService from "../../../../../service/account/AccountService";
    import SelectBox from "../../../../../components/SelectBox";
    import VerificationCode from '@/components/VerificationCode.vue';
    import ChangePhoneModal from '../item/ChangePhoneModal.vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import Vue from 'vue';

    export default {
        name: 'changePhone',
        components: {SelectBox, VerificationCode, ChangePhoneModal},
        data: function () {
            return {
                newPhoneNumber: '',
                code_number: '+86',
                phoneVerify: false,
                emailVerify: false,
                verificationCode: '',
                showModal: false,
            }
        },
        computed: {
            getPhoneNumber() {
                let numLength = this.newPhoneNumber.length;
                if(this.newPhoneNumber === ''){
                    return false;
                }else{
                    if (this.newPhoneNumber.substr(0, 1) == 0) {
                        return this.newPhoneNumber.substr(1, numLength - 1);
                    } else {
                        return this.newPhoneNumber;
                    }
                }
            },
        },
        created () {
            window.scrollTo(0,0);
        },
        methods: {
            goMyPage() {
                this.$router.push("/myPage");
            },
            onChange() {
                let self = this;
                // AXIOS post 작업 진행
                AccountService.Account.changePassword(this.old_password, this.new_password, () => {
                    this.goMyPage();
                });
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                if (this.phoneVerify) {
                    this.onModal();
                }
            },
            //지역번호 select box 값 get
            setCode(value) {
                this.code_number = value;
            },
            // 인증코드 체크
            onCheckVerificationCode(code) {
                this.phoneVerify = true;
                this.verificationCode = code;
            },
            onCloseModal() {
                this.showModal = false;
            },
            onModal() {
                this.showModal = true;
            },
            onConfirm() {
                this.emailVerify = true;
                let self = this;

                //전화번호 변경 AXIOS
                MainRepository.Service.Account().Account.checkVerificationCode('phone', {
                    email: MainRepository.MyInfo.getUserInfo().email,
                    code: self.code_number + self.verificationCode,
                    phoneNumber: self.newPhoneNumber,
                    status: 'turn_on',
                    isForValidation: false,
                    isForUpdate: true,
                }, (result) => {
                    Vue.prototype.$eventBus.$emit('showAlert', 2251);
                    MainRepository.router().goMyPage();
                }, () => {
                    return false;
                })
            }
        }
    }
</script>
<style scoped>

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

    .selectbox-width {
        width: 80px;
        left: 0;
        bottom: 0;
    }
    .selectbox-locale-number :first-child :first-child{
        border: none !important;
        border-right: solid 1px #8d8d8d !important;
    }
    .input-phone {
        border: none;
        font-size: 12px;
    }

    .phone-wrapper {
        display: flex;
        border: solid 1px #8d8d8d;
    }

    .phone-wrapper:hover{
        border: solid 1px #316ee4;
    }

    .phone-wrapper:hover :first-child :first-child :first-child  {
        border-right: solid 1px #316ee4 !important;
    }
</style>