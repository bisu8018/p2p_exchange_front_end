<template>
    <!--Vertical, horizontal alignment-->
    <v-layout pt-5 pb-5>
        <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
            <div>
                <div class="mb-3 login-title align-center">
                    <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
                    <div class="h2 bold">{{$str("changePhoneNumber")}}</div>
                </div>

                <!--새로운 전화번호 입력-->
                <div v-if="status === 'phone'" class="mb-4">
                    <div class="text-xs-left mb-2 color-black">{{$str("newPhoneNumber")}}</div>
                    <div class="p-relative phone-wrapper">
                        <select-box :selectBoxType ="'phone'" v-on:number="setCode" class="selectbox-width"></select-box>
                        <input type="tel" class="input input-phone" v-model="newPhoneNumber" maxlength="18">
                    </div>
                </div>

                <!--인증 슬라이더-->
                <!--<div class="mb-4 " v-if="email.length>0 && status === 'email'">-->
                    <!--&lt;!&ndash;<v-flex class="verifySlider" mb-4>&ndash;&gt;-->
                    <!--<div class="text-xs-left mb-2 h6 color-black">{{$str("verify")}}</div>-->
                    <!--<verify-slider v-on:passcallback="putVerified"></verify-slider>-->
                <!--</div>-->


                <div class="text-xs-right">
                    <button class="btn-white  button-style" @click="goMyPage">{{$str('cancel')}}</button>
                    <button class="btn-blue btn-blue-hover button-style ml-4a" @click="onCheck">{{$str('change')}}</button>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import {abUtils} from '@/common/utils';
    import AccountService from "../../../../../service/account/AccountService";
    import SelectBox from "../../../../../components/SelectBox";
    import VerificationCode from '@/components/VerificationCode.vue';

    export default {
        name: 'changePhone',
        components: {SelectBox, VerificationCode},
        data: function () {
            return {
                status: 'phone',             //phone -> verification
                newPhoneNumber: '',
            }
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
                if (this.onCheckOldPassword() && this.onCheckNewPassword() && this.onCheckPasswordConfirm()) {
                    this.onChange();
                }
            },
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
    .input-phone {
        border: none;
        font-size: 12px;
    }

    .phone-wrapper {
        display: flex;
        border: solid 1px #8d8d8d;
    }
</style>