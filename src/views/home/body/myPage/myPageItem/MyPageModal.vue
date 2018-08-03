<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    <!--type에 따른 제목 변경-->
                    {{type === 'addPayment' ? $str("addPayment") : (type === 'emailTurnOn' || type ==='phoneTurnOn' ?
                    $str("turnOn") :
                    $str("appeal"))}}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="onClose">close</i>
            </div>
            <div class="line-height-1 modal-subject-2">

                <!--type이 addPayment 상태 일 경우 내용-->
                <span v-if="type === 'addPayment'">
                    <div class=" color-black  mb-2">
                        {{$str("paymentMethod")}}
                    </div>
                      <div class="p-relative mb-4">
                        <select class="comp-selectbox h6" id="paymentMethod" v-model="paymentMethod">
                            <option value="" disabled selected
                                    hidden>{{$str('paymentMethodSelectboxPlaceholder')}}</option>
                            <option value="bank">{{$str("bankAccountText")}}</option>
                            <option value="alipay">{{$str("alipayText")}}</option>
                            <option value="wechat">{{$str("wechatPayText")}}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>
                </span>
            </div>


            <!--******************************************
                            ADD PAYMENT
            ******************************************-->

            <div v-if="type === 'addPayment'">
                <!--실명 입력-->
                <div class="mb-4" v-if="paymentMethod != ''">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("name")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('namePlaceholder')" v-model="realName"
                               v-bind:class="{'warning-border' : warning_name}" @keyup="onCheckName">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_name}">{{verify_warning_name}}</span>
                        </div>
                    </div>
                </div>

                <!--알리페이-->
                <div class="mb-4" v-if="paymentMethod === 'alipay'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("alipayText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('alipayPlaceholder')" v-model="alipay"
                               v-bind:class="{'warning-border' : warning_alipay}" @keyup="onCheckAlipay">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_alipay}">{{verify_warning_alipay}}</span>
                        </div>
                    </div>
                </div>

                <!--위챗페이-->
                <div class="mb-4" v-if="paymentMethod === 'wechat'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("wechatPayText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('wechatPlaceholder')" v-model="wechat"
                               v-bind:class="{'warning-border' : warning_wechat}" @keyup="onCheckWechat">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_wechat}">{{verify_warning_wechat}}</span>
                        </div>
                    </div>
                </div>


                <!--은행이름-->
                <div class="mb-4" v-if="paymentMethod === 'bank'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("bankName")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('bankNamePlaceholder')" v-model="bank"
                               v-bind:class="{'warning-border' : warning_bank}" @keyup="onCheckBank">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_bank}">{{verify_warning_bank}}</span>
                        </div>
                    </div>
                </div>

                <!--은행정보-->
                <div class="mb-4" v-if="paymentMethod === 'bank'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("branchInfo")}}
                    </div>
                    <input type="text" class="input" :placeholder="$str('branchInfoPlaceholder')" v-model="branchInfo">
                </div>

                <!--은행계좌-->
                <div class="mb-4" v-if="paymentMethod === 'bank'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("bankAccountText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('bankPlaceholder')" v-model="bankAccount"
                               v-bind:class="{'warning-border' : warning_bank_accout}" @keyup="onCheckBankAccount">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_bank_accout}">{{verify_warning_bank_account}}</span>
                        </div>
                    </div>
                </div>

                <!--QR코드-->
                <div class="mb-4" v-if="paymentMethod === 'alipay' || paymentMethod === 'wechat'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("qrCode")}}
                    </div>
                    <div class="textarea-style pa-4">
                        <div class="d-inline-block">
                            <div class="sprite-img ic-upload"></div>
                        </div>
                        <div class="color-darkgray h6">
                            {{$str('alipayQrCodeExplain')}} (*.jpg / *.png / *.jpeg)
                        </div>
                    </div>
                </div>

                <!--거래 비밀번호 입력-->
                <div class="mb-4" v-if="paymentMethod != ''">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("tradePwText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('tradePwPlaceholder')"
                               v-model="tradePassword"
                               v-bind:class="{'warning-border' : warning_trade_password}" @keyup="onCheckTradePassword">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_trade_password}">{{verify_warning_trade_password}}</span>
                        </div>
                    </div>
                </div>
            </div>


            <!--******************************************
                          TURN ON
          ******************************************-->
            <div v-else-if="type === 'phoneTurnOn'">
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
                        <input type="text" class="input" v-model="SMSverificationCdoe" maxlength="12">
                        <span class="click-send-text text-white-hover" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
                    </div>
                </div>
            </div>

            <div v-else-if="type === 'emailTurnOn'">
                <!--이메일 입력-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("phoneNumber")}}
                    </div>
                    <div class="input-disabled  vertical-center disabled">{{setPhoneNumber}}</div>
                </div>

                <!--이메일인증-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("emailVerification")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" v-model="SMSverificationCdoe" maxlength="12">
                        <span class="click-send-text text-white-hover" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
                    </div>
                </div>
            </div>


            <div class="text-xs-right">
                <v-spacer></v-spacer>
                <button @click="onClose" class="h6 btn-rounded-white text-white-hover mr-3">
                    {{$str("cancel")}}
                </button>

                <!--결제수단 추가 확인 버튼-->
                <span v-if="type === 'addPayment'">
                    <button @click="onComplete" class="h6 btn-rounded-blue btn-blue-hover">
                        {{$str("complete")}}
                    </button>
                </span>
                
                <!--turn on 확인 버튼-->
                <span v-if="type === 'emailTurnOn' || type === 'phoneTurnOn'">
                    <button @click="onConfirmTurnOn" class="h6 btn-rounded-blue btn-blue-hover">
                        {{$str("confirm")}}
                    </button>
                </span>
            </div>
        </div>
    </v-dialog>
</template>
<script>
    import Vue from 'vue';

    export default {
        name: 'myPageModal',
        props: ['show', 'type', 'phoneNo'],
        data() {
            return {
                paymentMethod: "",
                realName: "",
                alipay: "",
                wechat: "",
                bank: "",
                tradePassword: "",
                branchInfo: "",
                bankAccount: "",
                warning_name: false,
                warning_alipay: false,
                warning_wechat: false,
                warning_bank: false,
                warning_bank_accout: false,
                warning_trade_password: false,
                verify_warning_name: Vue.prototype.$str('warning_name'),
                verify_warning_alipay: Vue.prototype.$str('warning_alipay'),
                verify_warning_wechat: Vue.prototype.$str('warning_wechat'),
                verify_warning_bank: Vue.prototype.$str('warning_bank'),
                verify_warning_bank_account: Vue.prototype.$str('warning_name'),
                verify_warning_trade_password: Vue.prototype.$str('warning_trade_password'),
                SMSverificationCdoe: '',
            }
        },
        computed: {
            setPhoneNumber: function () {
                var phoneNumber = this.phoneNo.substr(0, 3) + '****' + this.phoneNo.substr(7, 5);
                return phoneNumber;
            }
        },
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            onComplete: function () {
                // post 작업 완료 후 진행
                this.$emit('paymentMethod');
            },
            onCheck() {
                // Warnings in case of error in e-mail or password entry
                if (this.onCheckName() && this.onCheckAlipay() && this.onCheckWechat() && this.onCheckBank() && this.onCheckBankAccount() && this.onCheckTradePassword()) {
                    this.onComplete();
                }
            },
            onCheckName: function () {
                if (this.realName === '') {
                    this.warning_name = true;
                    return false;
                }
                this.warning_name = false;
                return true;
            },
            onCheckAlipay: function () {
                if (this.paymentMethod === 'alipay') {
                    if (this.alipay === '') {
                        this.warning_alipay = true;
                        return false;
                    }
                    this.warning_alipay = false;
                }
                return true;
            },
            onCheckWechat: function () {
                if (this.paymentMethod === 'wechat') {
                    if (this.wechat === '') {
                        this.warning_wechat = true;
                        return false;
                    }
                    this.warning_wechat = false;
                }
                return true;
            },
            onCheckBank: function () {
                if (this.paymentMethod === 'bank') {
                    if (this.bank === '') {
                        this.warning_bank = true;
                        return false;
                    }
                    this.warning_bank = false;
                }
                return true;
            },
            onCheckBankAccount: function () {
                if (this.paymentMethod === 'bank') {
                    if (this.bankAccount === '') {
                        this.warning_bank_accout = true;
                        return false;
                    }
                    this.warning_bank_accout = false;
                }
                return true;
            },
            onCheckTradePassword: function () {
                if (this.tradePassword === '') {
                    console.log(1);
                    this.warning_trade_password = true;
                    return false;
                }
                this.warning_trade_password = false;
                return true;
            },
            sendVerificationCode: function () {
                // 문자 전송 코드
            },
            onConfirmTurnOn: function () {
                //AXIOS POST

                // 성공후
                this.$emit('turnon');
            }
        },
    }
</script>
<style scoped>

    .modal-subject-wrapper {
        display: flex;
    }

    .modal-subject-2 {
        text-align: left;
        margin-bottom: 8px;
    }

    .textarea-style {
        width: 100%;
        height: 109px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        padding: 8px;
        resize: none;
    }


</style>