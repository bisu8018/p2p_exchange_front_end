<template>
    <v-layout mt-5 mb-5 ml-3 mr-3 column>
        <div class="flex-divide mb-4">
            <div class="text-darkgray caption text-xs-left mb-3">
                <!--{{order_number}} 주문번호-->
                {{$str('orderText')}} : #{{orderNumber}}

            </div>
            <div class="headline-2 text-black text-xs-left mb-3">
                <!--{{ad_type}} buy/sell -->
                <div>{{adType = 'BUY'? 'Buy' : 'Sell'}}
                    <!--{{volume}} 토큰량 -->
                    {{volumeTotal}}
                    <!--{{token}} 토큰종류-->
                    {{token}}
                </div>
                <!--{{email}} 이메일-->
                <div>From {{email}}</div>
            </div>
            <div class="text-xs-left mb-4">
                <div class="test-black mb-3 ">
                    {{$str('price')}} :
                    <!--{{price}} 가격 -->
                    <span class="ml-3 subheading-2">{{price}}
                        <!--{{currency}} 화폐단위-->  <!--{{currency}} 토큰종류-->
                        {{currency}} / {{token}}</span>
                </div>
                <div>
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
            <div class="payment-wrapper" v-if="alipay === 'Y'">
                <div class="payment-wrapper width-half">
                    <div class="mr-2">
                        <img src="@/assets/img/method_alipay.png">
                    </div>
                    <div class="text-darkgray">
                        {{$str("alipayText")}}
                    </div>
                </div>
                <div class="text-xs-right width-half">
                    <!--알리페이 정보-->
                    {{alipay_address}}
                </div>
            </div>
            <div class="text-xs-right mb-3">
                Alipay QR
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
                <div class="text-xs-right width-half">
                    <!--위챗페이정보-->
                    {{wechatpay_address}}
                </div>
            </div>
            <div class="text-xs-right mb-3">
                Wechatpay QR
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
                <div class="text-xs-right width-half">
                    <!--은행계좌 정보-->
                    {{bankaccount_address}}
                </div>
            </div>
        </div>
        <div class="coinselect-1 text-black text-xs-left mb-4a line-height-1">
            <div class="mb-3">
                <!--<span v-if="status 값 따라 분기 처리">-->
                {{$str("paymentExplain1")}}

                <!--{{price}} 가격 --><!--{{currency}} 화폐단위-->
                <span class="text-price">{{price}} {{currency}}</span>
                {{$str("paymentExplain2")}}

                <!--{{email}} 이메일-->
                {{email}}
                {{$str("paymentExplain3")}}

                <!--{{paymentWindow}} 지불기간-->
                <!--타이머 스크립트 작성 필요-->
                <span class="text-success">{{paymentWindow}}</span>
                {{$str("paymentExplain4")}}
            </div>
            <div>
                {{$str("referenceText")}} :

                <span class="common-normal-bordered-button name bold pl-3 pr-3 ml-3 ">
                    <!--{{거래번호}}-->
                    {{reference}}
                </span>
            </div>
        </div>

        <!--paid 버튼-->
        <div class="mb-3">
            <input type="button" class="common-normal-button" :value="$str('paidText')" @click="onPaid">
        </div>

        <!--paid 설명-->
        <div class="payment-explain-wrapper text-price caption line-height-1 text-xs-left pt-3 pb-3 pr-2 pl-2 mb-4a">
            <div class="mr-2"><v-icon class="icon-style ">error</v-icon></div>
            <div>{{$str('paymentText')}}</div>
        </div>

        <div class="mb-4a text-xs-left">
            <input class="common-rounded-flat-button" type="button" :value="$str('cancel')">
        </div>
        <div>

            <!--채팅창-->

        </div>
        <div class="caption text-xs-left text-darkgray line-height-1">
            <p class="mb-2">
                {{$str('transferChecklist1')}}
            </p>
            <p>
                {{$str('transferChecklist2')}}
            </p>
            <p>
                {{$str('transferChecklist3')}}
            </p>
        </div>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'buy',
        components: {},
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
            reference: 453534

        }),
        methods: {
            onPaid() {
                // post작업
            }
        }
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

    .width-half {
        width: 50%;
    }

    .payment-explain-wrapper {
        border-radius: 2px;
        background: #f8f8fa;
        display: flex;
    }

</style>