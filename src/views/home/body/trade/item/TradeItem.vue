<template v-if="item.activeYn === true">
    <v-layout wrap row :class="{'mb-4' : isMobile()}" vertical-center>
        <v-flex xs6 md2 mb-3>
            <div class="text-xs-left vertical-center">
                <div class="sprite-img d-inline-block" v-bind:class="getIcon"></div>
                <span class="ml-2 color-darkgray">
                        {{initItem}}
                    </span>
            </div>
        </v-flex>
        <!-- 정보-->
        <v-flex xs6 md4 mb-3>
            <div class="text-xs-left color-black line-height-1 text-xs-right text-md-left">
                {{getInfo}}
            </div>
        </v-flex>
        <!-- QR코드-->
        <v-flex xs12 md6 mb-3 text-xs-right c-pointer vertical-center v-if="item.type != 'bank'"
                @click="onQRcode('alipay')">
            <img src="@/assets/img/qr_code.png" class="qr-code-img pointer mr-1">
            <div class="d-inline-block color-black h6"> QR Code</div>
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
        },
        data() {
            return {
                itemId: '',
                wechatpay_address: 'wwxx8888888888   微信支付直接扫码',
                bankaccount_address: '8888888888  建设银行',
            }
        },
        computed: {
            initItem() {
                switch (this.item.type) {
                    case  'alipay':
                        return Vue.prototype.$str('alipayText');

                    case 'wechat':
                        return Vue.prototype.$str('wechatPayText');

                    default:
                        return Vue.prototype.$str('bankAccountText');
                }
            },
            getIcon() {
                switch (this.item.type) {
                    case  'alipay':
                        return 'ic-alipay';

                    case 'wechat':
                        return 'ic-wechatpay';

                    default:
                        return 'ic-bank';
                }
            },
            getInfo() {
                switch (this.item.type) {
                    case  'alipay':
                        return this.item.alipayId;

                    case 'wechat':
                        return this.item.wechatId;

                    default:
                        let value = this.item.ownerName + ', ' + this.item.bankName + this.item.bankBranchInfo + this.item.bankAccount;
                        return value;
                }
            }
        },
        created() {
        },
        methods: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        }
    });
</script>

<style scoped>
    .qr-code-img {
        width: 14px;
        height: 14px;
    }

    .flex {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>