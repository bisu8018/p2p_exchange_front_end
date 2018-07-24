<template>
    <v-layout mt-5 mb-5 ml-3 mr-3 column>
        <div class="flex-divide mb-4">
            <div class="text-darkgray caption text-xs-left mb-4">
                <!--{{order_number}} 주문번호-->
                {{$str('orderText')}} : #{{orderNumber}}
            </div>
            <div class="headline-2 text-black text-xs-left mb-4a line-height-1">
                <!--{{ad_type}} buy/sell -->
                <div>Sell
                    <!--{{volume}} 토큰량 -->
                    {{volumeTotal}}
                    <!--{{token}} 토큰종류-->
                    {{token}} To
                </div>
                <!--{{email}} 이메일-->
                <div>{{email}}</div>
            </div>
            <div class="text-xs-left mb-4a">
                <div class="text-black mb-3 ">
                    {{$str('price')}} :
                    <!--{{price}} 가격 -->
                    <span class="ml-3 subheading-2">{{price}}
                        <!--{{currency}} 화폐단위-->  <!--{{currency}} 토큰종류-->
                        {{currency}} / {{token}}</span>
                </div>
                <div class="text-black">
                    {{$str('amount')}} :
                    <!--{{price}} 가격 -->
                    <span class="ml-3 subheading-2 text-price bold">{{price}}
                        <!--{{currency}} 화폐단위-->
                        {{currency}}</span>
                </div>
            </div>

        </div>
        <div class=" mb-4a">
            <!--알리페이 결제-->
            <div class="payment-wrapper mb-3 " v-if="alipay === 'Y'">
                <div class="payment-wrapper width-half">
                    <div class="mr-2">
                        <img src="@/assets/img/method_alipay.png">
                    </div>
                    <div class="text-darkgray">
                        {{$str("alipayText")}}
                    </div>
                </div>
                <div class="text-xs-right width-half text-black">
                    <!--알리페이 정보-->
                    {{alipay_address}}
                </div>
            </div>
            <div class="text-xs-right mb-3">
                <img src="@/assets/img/qr_code.png" class="qr-code-img pointer">
            </div>
            <!--위챗페이 결제-->
            <div class="payment-wrapper mb-3" v-if="wechat === 'Y'">
                <div class="payment-wrapper width-half">
                    <div class="mr-2">
                        <img src="@/assets/img/method_wechatpay.png">
                    </div>
                    <div class="text-darkgray">
                        {{$str("wechatPayText")}}
                    </div>
                </div>
                <div class="text-xs-right width-half text-black">
                    <!--위챗페이정보-->
                    {{wechatpay_address}}
                </div>
            </div>
            <div class="text-xs-right mb-3 ">
                <img src="@/assets/img/qr_code.png" class="qr-code-img pointer">
            </div>
            <!--은행 계좌 결제-->
            <div class="payment-wrapper" v-if="bankAccount === 'Y'">
                <div class="payment-wrapper width-half">
                    <div class="mr-2">
                        <img src="@/assets/img/method_bankaccount.png">
                    </div>
                    <div class="text-darkgray">
                        {{$str("bankAccountText")}}
                    </div>
                </div>
                <div class="text-xs-right width-half text-black">
                    <!--은행계좌 정보-->
                    {{bankaccount_address}}
                </div>
            </div>
        </div>


        <div class="coinselect-1 text-black text-xs-left mb-5 line-height-1">
            <!--paying 상태 일때-->
            <div class="mb-3" v-if="status === 'paying'">
                {{$str("payingExplain1")}}
                {{email}}
                {{$str("payingExplain2")}}
                <span class="text-price">{{price}} {{currency}}</span>
                {{$str("payingExplain3")}}
                <!--타이머 스크립트 작성 필요-->
                <span class="text-success">{{paymentWindow}}</span>
                {{$str("payingExplain4")}}
            </div>

            <!--confirm 상태 일때-->
            <div class="mb-3" v-if="status === 'confirm'">
                {{$str("confirmgExplain1")}}
                {{email}}
                {{$str("confirmgExplain2")}}
                <span class="text-price">{{price}} {{currency}}</span>
                {{$str("confirmgExplain3")}}

            </div>
            <div>
                <span v-if="status === 'paying'">
                    {{$str("buyingExplain4")}}
                </span>
                <span v-if="status === 'complete'">
                    {{$str("complete")}}
                </span>

                {{$str("referenceText")}} :
                <div class="tooltips">
                    <span slot="activator" class=" common-normal-bordered-button name bold pl-3 pr-3 ml-3 "
                          @click="onCopy()">
                    <!--{{거래번호}}-->
                    {{reference}}
                    </span>
                    <input type="text" :value="reference" id="referenceNum" class="referenceNum">
                    <span class="tooltip-content">Copy</span>
                </div>
            </div>
        </div>

        <div class="mb-4a" v-if="status != 'complete'">
            <!--paying process indicator (paying 상태 일때) -->
            <span v-if="status === 'paying'" class="relative">
                <input type="text" class="buying-process"
                       :value="$str('buyingIndicator')"
                       readonly>
                <v-progress-circular indeterminate class="text-blue progress-circular"
                ></v-progress-circular>
            </span>

            <!--거래 성사 버튼 (confirm 상태 일때) -->
            <span  v-if="status === 'confirm'">
                <input type="button" class="common-normal-button common-btn-hover mb-4a"
                       :value="$str('confirmRelease')" @click="onModal('confirm')">
                <div class="text-xs-left">
                    <input class="common-text-hover common-rounded-flat-button button-2" type="button"
                           :value="$str('appeal')" @click="onModal('appeal')">
                </div>
            </span>
        </div>

        <!--거래완료 아이콘 및 메세지 (complete 상태일때)-->
        <div class="mb-4a text-xs-left payment-complete-wrapper align-center" v-else>
            <div><i class="material-icons check-icon">check_circle</i></div>
        </div>
        <div>

            <!--채팅창-->

        </div>
        <div class="caption text-xs-left text-darkgray line-height-1 mt-4a">
            <p class="mb-2">
                {{$str('sellChecklist1')}}
            </p>
            <p>
                {{$str('sellChecklist2')}}
            </p>
            <p class="mb-0">
                {{$str('sellChecklist3')}}
            </p>
        </div>
        <sell-modal :show="showModal" :type="modalType" v-on:confirm="onConfirm" v-on:close="onClose"></sell-modal>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import SellModal from './sellModal/SellModal.vue';

    export default Vue.extend({
        name: 'sell',
        components: {
            SellModal
        },
        props: ['cancel'], // 외부에서 취소버튼 눌러 접근할 경우 props에 true값 전달
        data: () => ({
            orderNumber: 115294828805587,
            adType: 'SELL',
            volumeTotal: 0.1,
            token: 'ETH',
            email: 'Charles',
            price: 3405,
            currency: 'CNY',
            alipay: 'Y',
            wechat: 'Y',
            bankAccount: 'Y',
            alipay_address: '1670191503@qq.com 支付宝付款 直接扫码 安全便捷',
            wechatpay_address: 'wwxx88663   微信支付直接扫码',
            bankaccount_address: '6217001250015304185  建设银行',
            paymentWindow: 15,
            reference: 453534,
            showModal: false,
            status: 'confirm',     //paying -> confirm -> complete
            modalType: '',
            appealCode: 977057
        }),
        created() {
            // 유져 데이터 정보 get

            //취소 일경우 props로 판단 및 status 변경
            if (this.cancel === 'true') {
                this.status = 'cancel';
            }
        },
        methods: {
            onConfirm() {
                // confirm
                // post 작업 성공시
                this.status = 'complete';
                this.onClose();
            },
            onClose() {
                this.showModal = false;
            },
            onCopy() {
                let copyTemp = (document.querySelector('#referenceNum')as HTMLInputElement);
                let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);

                if (!isiOSDevice) {
                    copyTemp.setAttribute('type', 'text');
                    copyTemp.select();
                }
                document.execCommand('copy');
            },
            onModal(type) {
                this.showModal = true;
                this.modalType = type;
            },
        },

    });
</script>

<style scoped>
    .flex-divide {
        border-bottom: solid 1px #d1d1d1;
    }

    .payment-wrapper {
        display: flex;
        line-height: 1;
    }

    .payment-complete-wrapper {
        display: flex;
        line-height: 1.14;
    }

    .width-half {
        width: 50%;
    }

    .payment-explain-wrapper {
        border-radius: 2px;
        background: #f8f8fa;
        display: flex;
    }

    .text-price {
        color: #E25422 !important;
    }

    .buying-process {
        width: 100%;
        height: 40px;
        border-radius: 3px;
        background-color: #f8f8fa;
        border: solid 1px #8d8d8d;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 14px;
        color: #9294a6;
    }

    .progress-circular {
        width: 24px !important;
        height: 24px !important;
        position: absolute;
        right: 10px;
        top: -2px;
    }

    .check-icon {
        font-size: 102px;
        font-weight: bold;
        color: #71aa3a;
        margin: -7px;
    }

    .cancel-icon {
        font-size: 102px;
        font-weight: bold;
        color: #9294A6;
        margin: -7px;
    }

    .warning-icon {
        font-size: 103px;
        color: #F9A825;
        margin: -7px;
    }

    .tooltips .tooltip-content {
        font-weight: 100;
    }

    .tooltips {
        cursor: pointer;
    }

    .cancel-explain {
        border-radius: 3px;
        background-color: #f8f8fa;
        font-size: 14px;
        font-weight: bold;
        line-height: 1;
        text-align: center;
        color: #9294a6;
        padding: 8px;
    }

    .cancel-icon-wrapper {
        height: 88px;
    }

    .referenceNum {
        position: absolute;
        left: -1000px;
    }

    .qr-code-img {
        width: 14px;
        height: 14px;
    }

    .line-height-apealcode {
        line-height: 1.13;
    }


</style>