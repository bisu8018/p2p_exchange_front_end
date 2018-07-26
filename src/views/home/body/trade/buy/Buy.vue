<template>
    <v-layout mt-5 mb-5 column>
        <div class="flex-divide mb-4">
            <div class="color-darkgray h6 text-xs-left mb-3">
                <!--{{order_number}} 주문번호-->
                {{$str('orderText')}} : #{{orderNumber}}

            </div>
            <div class="h1 bold color-black text-xs-left mb-3 line-height-1">
                <!--{{ad_type}} buy/sell -->
                <div>Buy
                    <!--{{volume}} 토큰량 -->
                    {{volumeTotal}}
                    <!--{{token}} 토큰종류-->
                    {{token}}
                </div>
                <!--{{email}} 이메일-->
                <div>From {{email}}</div>
            </div>
            <div class="text-xs-left mb-4 line-height-1">
                <div class="color-black mb-3 ">
                    {{$str('price')}} :
                    <!--{{price}} 가격 -->
                    <span class="ml-3 h3">{{price}}
                        <!--{{currency}} 화폐단위-->  <!--{{currency}} 토큰종류-->
                        {{currency}} / {{token}}</span>
                </div>
                <div class="color-black">
                    {{$str('amount')}} :
                    <!--{{price}} 가격 -->
                    <span class="ml-3 h3 color-orange-price bold">{{price}}
                        <!--{{currency}} 화폐단위-->
                        {{currency}}</span>
                </div>
            </div>
        </div>
        <div class=" mb-4" v-if="status != 'cancel'">
            <!--알리페이 결제-->
            <div class="payment-wrapper mb-3 " v-if="alipay === 'Y'">
                <div class="payment-wrapper width-half">
                    <div class="mr-2">
                        <img src="@/assets/img/method_alipay.png">
                    </div>
                    <div class="color-darkgray">
                        {{$str("alipayText")}}
                    </div>
                </div>
                <div class="text-xs-right width-half color-black">
                    <!--알리페이 정보-->
                    {{alipay_address}}
                </div>
            </div>
            <div class="text-xs-right mb-3 line-height-1">
                <img src="@/assets/img/qr_code.png" class="qr-code-img pointer mr-1">
                <div class="d-inline-block color-black h6"> QR Code</div>
            </div>
            <!--위챗페이 결제-->
            <div class="payment-wrapper mb-3" v-if="wechat === 'Y'">
                <div class="payment-wrapper width-half">
                    <div class="mr-2">
                        <img src="@/assets/img/method_wechatpay.png">
                    </div>
                    <div class="color-darkgray">
                        {{$str("wechatPayText")}}
                    </div>
                </div>
                <div class="text-xs-right width-half color-black">
                    <!--위챗페이정보-->
                    {{wechatpay_address}}
                </div>
            </div>
            <div class="text-xs-right mb-3 ">
                <img src="@/assets/img/qr_code.png" class="qr-code-img pointer mr-1">
                <div class="d-inline-block color-black h6"> QR Code</div>
            </div>
            <!--은행 계좌 결제-->
            <div class="payment-wrapper" v-if="bankAccount === 'Y'">
                <div class="payment-wrapper width-half">
                    <div class="mr-2">
                        <img src="@/assets/img/method_bankaccount.png">
                    </div>
                    <div class="color-darkgray">
                        {{$str("bankAccountText")}}
                    </div>
                </div>
                <div class="text-xs-right width-half color-black">
                    <!--은행계좌 정보-->
                    {{bankaccount_address}}
                </div>
            </div>
        </div>
        <div class="h4 bold color-black text-xs-left mb-4 line-height-1">
            <!--pending 상태 일때-->
            <div class="mb-2" v-if="status === 'pending'">
                {{$str("paymentExplain1")}}

                <!--{{price}} 가격, {{currency}} 화폐단위-->
                <span class="color-orange-price">{{price}} {{currency}}</span>
                {{$str("paymentExplain2")}}

                <!--{{email}} 이메일-->
                {{email}}
                {{$str("paymentExplain3")}}

                <!--{{paymentWindow}} 지불기간-->
                <!--타이머 스크립트 작성 필요-->
                <span class="color-green">{{paymentWindow}}</span>
                {{$str("paymentExplain4")}}
            </div>

            <!--buying 상태 일때-->
            <div class="mb-2" v-else-if="status === 'buying'">
                {{$str("buyingExplain1")}}

                <!--{{volumeTotal}} 가격 , {{token}} 단위-->
                <span class="color-orange-price">{{volumeTotal}} {{token}}</span>
                {{$str("buyingExplain2")}}

                <!--{{email}} 이메일-->
                {{email}}
                {{$str("buyingExplain3")}}
            </div>

            <!--status cancel 일 시 설명 문구-->
            <div  class="mb-2 line-height-apealcode" v-else-if="status === 'appeal'">
                    {{$str("appealCodeExplain")}}
                {{appealCode}}
            </div>

            <!--status cancel 일 시 설명 문구-->
            <div class="cancel-explain mb-4" v-else-if="status ==='cancel'">
                {{$str("cancelExplain")}}
            </div>

            <div>
                <span v-if="status === 'buying'">
                    {{$str("buyingExplain4")}}
                </span>
                <span v-else-if="status === 'paid' || status === 'cancel'">
                    {{$str("complete")}}
                </span>

                {{$str("referenceText")}} :
                <div class="c-pointer tooltip">
                    <span slot="activator" class=" btn-white h5 bold pl-3 pr-3 ml-3 " @click="onCopy()">
                    <!--{{거래번호}}-->
                    {{reference}}
                    </span>
                    <input type="text" :value="reference" id="referenceNum" class="referenceNum">
                    <span class="tooltip-content">Copy</span>
                </div>
            </div>
        </div>


        <div class="mb-4" v-if="status != 'paid' && status != 'cancel'" >
            <!--paid 버튼--><!--pending 상태 일때-->
            <input v-if="status === 'pending'" type="button" class="btn-blue btn-blue-hover"
                   :value="$str('paidText')" @click="onModal('paid')">
            <!--buying process indicator --><!--buying 상태 일때-->
            <span v-else-if="status === 'buying'" class="p-relative">
                <input type="text" class="buying-process"
                       :value="$str('buyingIndicator')"
                       readonly>
                <v-progress-circular indeterminate class="color-blue progress-circular"
                ></v-progress-circular>
            </span>
        </div>

        <!--paid 설명-->
        <div class="payment-explain-wrapper color-orange-price h6 line-height-1 text-xs-left pt-3 pb-3 pr-2 pl-2 mb-4a"
             v-if="status === 'pending'">
            <div class="mr-2">
                <i class="material-icons color-orange-price">info</i>
            </div>
            <div>{{$str('paymentText')}}</div>
        </div>

        <!--취소 및 이의제기 버튼 (paying buying 상태일때)-->
        <div class="mb-4a text-xs-left" v-if="status != 'paid' && status != 'cancel' && status !='appeal'" >
            <input class="btn-rounded-white text-white-hover mr-3" type="button" :value="$str('cancel')" @click="onModal('cancel')">
            <input v-if="status === 'buying'" class="text-white-hover btn-rounded-white" type="button"
                   :value="$str('appeal')" @click="onModal('appeal')">
        </div>

        <!--거래완료 아이콘 및 메세지 (paid 상태일때)-->
        <div class="mb-4 text-xs-left payment-complete-wrapper align-center" v-else-if="status === 'paid'">
            <div><i class="material-icons check-icon">check_circle</i></div>
            <div class="text-xs-left ml-3  ">{{$str('completedPayment')}}
                <a class="color-blue text-white-hover">{{$str('tranferNow')}}</a>
            </div>
        </div>

        <!--거래 취소 아이콘 (cancel 상태일때)-->
        <div class=" cancel-icon-wrapper text-xs-left" v-if="status === 'cancel'" >
            <i class="material-icons cancel-icon">cancel</i>
        </div>

        <!--이의제기 아이콘 및 취소 버튼 (appeal 상태일때)-->
        <div class="align-center payment-complete-wrapper" v-if="status === 'appeal'" >
            <i class="material-icons  warning-icon ">error</i>
            <v-spacer></v-spacer>
            <a class="color-blue btn-blue-hover" @click="onModal('cancelAppeal')">{{$str('cancelModalButton')}}</a>
        </div>
        <div>

            <!--채팅창-->

        </div>
        <div class="h6 text-xs-left color-darkgray line-height-1 mt-4a">
            <p class="mb-1">
                {{$str('transferChecklist1')}}
            </p>
            <p class="mb-1">
                {{$str('transferChecklist2')}}
            </p>
            <p class="mb-0">
                {{$str('transferChecklist3')}}
            </p>
        </div>
        <buy-modal :show="showModal" :type="modalType" v-on:paymentConfirm="onPaid" v-on:close="onClose" v-on:cancel="onCancel" v-on:appeal="onAppeal" v-on:cancelAppeal="onCancelAppeal"></buy-modal>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import BuyModal from './buyModal/BuyModal.vue'

    export default Vue.extend({
        name: 'buy',
        components: {
            BuyModal
        },
        props: ['cancel'], // 외부에서 취소버튼 눌러 접근할 경우 props에 true값 전달
        data: () => ({
            orderNumber: 115294828805587,
            adType: 'BUY',
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
            status: 'pending',     //pending -> buying -> paid   그리고   cancel, appeal
            modalType : '',
            appealCode : 977057
        }),
        created() {
            // 유져 데이터 정보 get

            //취소 일경우 props로 판단 및 status 변경
            if(this.cancel === 'true'){
                this.status = 'cancel';
            }
        },
        methods: {
            onPaid() {
                // pending 구매 전 단계
                // *************************************post작업

                // buying 구매 중 단계
                // post 작업 성공시
                this.status = 'buying';

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
            onCancel() {
                this.showModal = false;
                // *************************************post작업 성공시
                this.status = 'cancel';

            },
            onAppeal() {
                this.showModal = false;
                // *************************************post작업 성공시
                this.status = 'appeal';
            },
            onModal(type) {
                this.showModal = true;
                this.modalType = type;
            },
            onCancelAppeal() {
                this.showModal = false;
                // *************************************post작업 성공시
                this.status = 'buying';
            }
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

    .check-icon{
        font-size: 102px;
        font-weight: bold;
        color: #71aa3a;
        margin : -7px;
    }
    .cancel-icon{
        font-size: 102px;
        font-weight: bold;
        color: #9294A6;
        margin : -7px;
    }
    .warning-icon{
        font-size: 103px;
        color: #F9A825;
        margin : -7px;
    }

    .tooltip-content {
        font-weight: 100;
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

    .cancel-icon-wrapper{
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