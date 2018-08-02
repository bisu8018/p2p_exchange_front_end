<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    <!--type에 따른 제목 변경-->
                    {{type === 'addPayment' ? $str("addPayment") : (type === 'cancel' || type ==='cancelAppeal' ?
                    $str("confirm") :
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

            <!--실명 입력-->
            <div class="mb-4" v-if="paymentMethod != ''">
                <div class=" color-black  mb-2 text-xs-left">
                    {{$str("name")}}
                </div>
                <div class="p-relative">
                    <input type="text" class="input" :placeholder="$str('namePlaceholder')" v-model="realName"
                           v-bind:class="{'warning-border' : warning_name}" @blur="onCheckName">
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
                           v-bind:class="{'warning-border' : warning_alipay}" @blur="onCheckAlipay">
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
                           v-bind:class="{'warning-border' : warning_wechat}" @blur="onCheckWechat">
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
                           v-bind:class="{'warning-border' : warning_bank}" @blur="onCheckBank">
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
                           v-bind:class="{'warning-border' : warning_bank_accout}" @blur="onCheckBankAccount">
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
            <div class="mb-4" v-if="paymentMethod != ''" >
                <div class=" color-black  mb-2 text-xs-left">
                    {{$str("tradePwText")}}
                </div>
                <div class="p-relative">
                    <input type="text" class="input" :placeholder="$str('tradePwPlaceholder')" v-model="tradePassword"
                           v-bind:class="{'warning-border' : warning_trade_password}" @blur="onCheckTradePassword">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_trade_password}">{{verify_warning_trade_password}}</span>
                    </div>
                </div>
            </div>


            <div class="text-xs-right">
                <v-spacer></v-spacer>
                <button @click="onClose" class="h6 btn-rounded-white text-white-hover mr-3">
                    {{$str("cancel")}}
                </button>

                <span v-if="type === 'addPayment'">
                    <button @click="onComplete" class="h6 btn-rounded-blue btn-blue-hover">
                        {{$str("complete")}}
                    </button>
                </span>
            </div>
        </div>
    </v-dialog>
</template>
<script>
    import Vue from 'vue';

    export default {
        name: 'addPaymentModal',
        props: ['show', 'type'],
        data() {
            return {
                paymentMethod: "",
                realName: "",
                alipay: "",
                wechat: "",
                bank: "",
                tradePassword: "",
                bank: "",
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
                if(this.paymentMethod === 'alipay') {
                    if (this.alipay === '') {
                        this.warning_alipay = true;
                        return false;
                    }
                     this.warning_alipay = false;
                }
                return true;
            },
            onCheckWechat: function () {
                if(this.paymentMethod === 'wechat') {
                if (this.wechat === '') {
                     this.warning_wechat = true;
                    return false;
                }
                 this.warning_wechat = false;
                }
                return true;
            },
            onCheckBank: function () {
                if(this.paymentMethod === 'bank') {
                    if (this.bank === '') {
                         this.warning_bank = true;
                        return false;
                    }
                     this.warning_bank = false;
                }
                return true;
            },
            onCheckBankAccount: function () {
                if(this.paymentMethod === 'bank') {
                    if (this.bankAccount === '') {
                         this.warning_bank_accout = true;
                        return false;
                    }
                     this.warning_bank_accout = false;
                }
                return true;
            },
            onCheckTradePassword: function () {
                if (this.tradePassword === '') {console.log(1);
                     this.warning_trade_password = true;
                    return false;
                }
                 this.warning_trade_password = false;
                return true;
            },
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