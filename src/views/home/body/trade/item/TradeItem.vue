<template>
    <v-layout wrap row v-if="status != 'cancel'" :class="{'mb-4' : isMobile()}">
        <!--  <div v-for="item in paymentMethods">

          </div>-->
        <!--알리페이 결제-->
        <v-flex xs6 md2 mb-3 v-if="alipay === 'Y'">
            <div class="text-xs-left vertical-center">
                <div class="sprite-img ic-alipay d-inline-block"></div>
                <span class="ml-2 color-darkgray">
                        {{$str("alipayText")}}
                    </span>
            </div>
        </v-flex>
        <!--알리페이 정보-->
        <v-flex xs6 md4 mb-3 v-if="alipay === 'Y'">
            <div class="text-xs-left color-black line-height-1 text-xs-right text-md-left">
                {{alipay_address}}
            </div>
        </v-flex>
        <!--알리페이 QR코드-->
        <v-flex xs12 md6 mb-3 text-md-left text-xs-right v-if="alipay === 'Y'">
            <label @click="onQRcode('alipay')" class="c-pointer vertical-center d-block">
                <img src="@/assets/img/qr_code.png" class="qr-code-img pointer mr-1">
                <div class="d-inline-block color-black h6"> QR Code</div>
            </label>
        </v-flex>
        <!--위챗페이 결제-->
        <v-flex xs6 md2 mb-3 v-if="wechat === 'Y'">
            <div class="text-xs-left vertical-center ">
                <div class="sprite-img ic-wechatpay d-inline-block"></div>
                <span class="ml-2 color-darkgray">
                        {{$str("wechatPayText")}}
                    </span>
            </div>
        </v-flex>
        <!--위챗페이정보-->
        <v-flex xs6 md4 mb-3 v-if="wechat === 'Y'">
            <div class="text-xs-left color-black line-height-1 text-xs-right text-md-left">
                {{wechatpay_address}}
            </div>
        </v-flex>
        <!--위챗페이 QR코드-->
        <v-flex xs12 md6 mb-3 text-md-left text-xs-right v-if="wechat === 'Y'">
            <label @click="onQRcode('wechat')" class="c-pointer  d-block vertical-center">
                <img src="@/assets/img/qr_code.png" class="qr-code-img pointer mr-1">
                <div class="d-inline-block color-black h6"> QR Code</div>
            </label>
        </v-flex>
        <!--은행 계좌 결제-->
        <v-flex xs6 md2 mb-3 v-if="bankAccount === 'Y'">
            <div class="text-xs-left vertical-center">
                <div class="sprite-img ic-bank d-inline-block"></div>
                <span class="ml-2 color-darkgray">
                        {{$str("bankAccountText")}}
                    </span>
            </div>
        </v-flex>
        <!--은행계좌 정보-->
        <v-flex xs6 md10 mb-3 v-if="bankAccount === 'Y'">
            <div class="text-xs-left color-black line-height-1 text-xs-right text-md-left">
                {{bankaccount_address}}
            </div>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";

    export default Vue.extend({
        name: 'trade-item',
        props: {
            item: {},
            status: {}
        },
        data() {
            return {
                itemId: '',
                type: {
                    alipay: 'alipay',
                    wechat: 'wechat',
                    bank: 'bank'
                },
                alipay: 'Y',
                wechat: 'Y',
                bankAccount: 'Y',
                alipay_address: '8888888888@qq.com 支付宝付款 直接扫码 安全便捷',
                wechatpay_address: 'wwxx8888888888   微信支付直接扫码',
                bankaccount_address: '8888888888  建设银行',
            }
        },
        computed: {},
        created() {

        },
        methods: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            /*
            initItem(item) {
                switch (item.type) {
                    case this.type.alipay:
                        return Vue.prototype.$str('alipayText');

                    case this.type.wechat:
                        return Vue.prototype.$str('wechatPayText');

                    default:
                        return Vue.prototype.$str('bankAccountText');
                }
            },
            onModify() {

            },
            onToggle() {
                switch (this.item.type) {
                    case this.type.alipay:
                        // Server 요청 -> 콜백 -> vuex 바꾸기
                        return Vue.prototype.$str('alipayText');

                    case this.type.wechat:
                        return Vue.prototype.$str('wechatPay');

                    default:
                        return Vue.prototype.$str('bankAccountText');
                }
            }*/
        }
    });
</script>

<style scoped>
    .qr-code-img {
        width: 14px;
        height: 14px;
    }
</style>