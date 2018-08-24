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
        <v-flex xs6 md4 mb-3 text-xs-right text-md-left>
            <div class="text-xs-left color-black line-height-1  c-pointer tooltip">
                <span slot="activator" @click="onCopy('getInfo')">{{getInfo}}</span>
                <input type="text" :value="getInfo" id="getInfo" class="referenceNum">
                <span class="tooltip-content">Copy</span>
            </div>
        </v-flex>
        <!-- QR코드-->
        <v-flex xs12 md6 mb-3  c-pointer   v-if="item.type != 'bank' && getImg !== ''">

            <!--MyOrder-->
            <div class="dropdown">
                <div class="vertical-center text-xs-right text-md-left dropbtn">
                    <img src="@/assets/img/qr_code.png" class="qr-code-img pointer mr-1">
                    <div class="d-inline-block color-black h6"> QR Code</div>
                </div>
                <!-- ongoing order 드롭다운 -->
                <div class="dropdown-content myorder-dropdown">
                    <div class="pa-2" >
                        <img :src="getImg" class="attachment-img-style"/>
                    </div>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";

    export default Vue.extend({
        name: 'trade-item',
        props: ['item'],
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
            },
            getImg(){
                switch (this.item.type) {
                    case  'alipay':
                        return this.item.alipayQrCodeImgUrl;

                    case 'wechat':
                        return this.item.wechatQrCodeImgUrl;
                }
            }
        },
        methods: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            onCopy() {
                let copyTemp = document.querySelector('#getInfo');


                let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);

                if (!isiOSDevice) {
                    copyTemp.setAttribute('type', 'text');
                    copyTemp.select();
                }
                document.execCommand('copy');
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
    .referenceNum {
        position: absolute;
        left: -1000px;
    }
    .tooltip-content {
        font-weight: 100;
    }


    .dropdown {
        position: relative;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        color: black;
        min-width: 104px;
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        z-index: 1;
        border-radius: 2px;
        font-weight: 400;
        background-color: white;
        left: -200px;
        top: 30px;
    }

    .dropdown-content a {
        color: black;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content,
    .dropdown-content button {
        display: block;
    }
    .myorder-dropdown:after{
        content: '';
        position: absolute;
        bottom: 100%;
        width: 0; height: 0;
        border-style: solid;
        border-bottom: 4px solid  #ffffff;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-color: transparent transparent  #ffffff transparent ;
        right: 16px;
    }

    .attachment-img-style {
        height: 200px;
        margin: 5px;
    }
</style>