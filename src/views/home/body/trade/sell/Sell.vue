<template>
    <div class="mt-5 mb-5 mr-3 ml-3 p-relative">
        <v-layout column mb-4 flex-divide>
            <div class="color-darkgray h6 text-xs-left mb-3">
                <!--{{order_number}} 주문번호-->
                Order : #{{getOrderNumber}}

            </div>
            <div class="h1 bold color-black text-xs-left mb-3  vertical-center">
                <!--{{ad_type}} buy/sell -->
                Sell
                <!--{{volume}} 토큰량 -->
                {{order.coinCount}}
                <!--{{order.cryptocurrency}} 토큰종류-->
                {{order.cryptocurrency}}
                <span class="mr-2"></span>
                <!--{{order.merchantNickname}} 닉네임-->
                <div class="d-inline-block"> From {{ order.merchantNickname }}</div>
            </div>
            <div class="text-xs-left mb-4 line-height-1">
                <div class="color-black mb-3 ">
                    {{$str('price')}} :
                    <!--{{order.price}} 가격 -->
                    <span class="ml-3 h3">{{order.price}}
                        <!--{{order.currency}} 화폐단위-->  <!--{{order.currency}} 토큰종류-->
                        {{order.currency}} / {{order.cryptocurrency}}</span>
                </div>
                <div class="color-black">
                    {{$str('amount')}} :
                    <!--{{order.price}} 가격 -->
                    <div class="c-pointer tooltip d-inline-block">
                 <span slot="activator" class="ml-3 h3 color-orange-price bold" @click="onCopy('amount')">{{order.price}}
                     <!--{{order.currency}} 화폐단위-->
                        {{order.currency}}</span>
                        <input type="text" :value="order.price" id="amountValue" class="referenceNum">
                        <span class="tooltip-content">Copy</span>
                    </div>
                </div>
            </div>
        </v-layout>
        <div v-if="order.status != 'cancel'" v-for="item in getMyPaymentMethodSelectList()">

            <trade-item :item="item"></trade-item>

        </div>
        <div class="h4 bold color-black text-xs-left mb-4 line-height-1">
            <!--unpaid 상태 일때-->
            <div class="mb-2" v-if="order.status === 'unpaid'">
                {{$str("payingExplain1")}}
                {{order.customerNickname}}
                {{$str("payingExplain2")}}
                <span class="color-orange-price">{{order.price}} {{order.currency}}</span>
                {{$str("payingExplain3")}}
                <!--타이머 스크립트 작성 필요-->
                <span class="color-green">{{order.paymentWindow}}</span>
                {{$str("payingExplain4")}}
            </div>

            <!--confirm 상태 일때-->
            <div class="mb-2" v-if="order.status === 'paid'">
                {{$str("confirmgExplain1")}}
                {{order.customerNickname}}
                {{$str("confirmgExplain2")}}
                <span class="color-orange-price">{{order.price}} {{order.currency}}</span>
                {{$str("confirmgExplain3")}}

            </div>
            <div>
                <span v-if="order.status === 'unpaid' || order.status === 'paid' ">
                    {{$str("referenceText")}}
                </span>
                <span v-if="order.status === 'complete'">
                    {{$str("complete")}},
                </span>

                :
                <div class="c-pointer tooltip">
                    <span slot="activator" class=" btn-white h5 bold pl-3 pr-3 ml-3 " @click="onCopy('reference')">
                    <!--{{거래번호}}-->
                    {{order.referenceNo}}
                    </span>
                    <input type="text" :value="order.referenceNo" id="referenceNum" class="referenceNum">
                    <span class="tooltip-content">{{$str("Copy")}}</span>
                </div>
            </div>
        </div>

        <!--unpaid process indicator (unpaid 상태 일때) -->
        <v-flex xs12 mb-4 v-if="order.status != 'complete'">
            <v-flex md3>
            <span v-if="order.status === 'unpaid'" class="p-relative">
                <input type="text" class="buying-process"
                       :value="$str('buyingIndicator')"
                       readonly>
                <v-progress-circular indeterminate class="color-blue progress-circular"
                ></v-progress-circular>
            </span>
            </v-flex>
        </v-flex>
        <v-flex xs12 md2 :class="{'mb-3' : isMobile()}" v-if="order.status === 'paid'">
            <!--거래 성사 버튼 (confirm 상태 일때) -->
            <input type="button" class="btn-blue btn-blue-hover mb-4"
                   :value="$str('confirmRelease')" @click="onModal('confirm')">
        </v-flex>

        <!--거래완료 아이콘 및 메세지 (complete 상태일때)-->
        <div class="mb-4a text-xs-left payment-complete-wrapper align-center" v-if="order.status === 'complete'">
            <div><i class="material-icons check-icon">check_circle</i></div>
        </div>
        <!--데스크탑 환경에서 설명-->
        <v-flex xs12 md6 mb-4 h6 text-xs-left color-darkgray v-if="!isMobile()">
            <p class="mb-1 h6 line-height-1">
                {{$str('sellChecklist1')}}
            </p>
            <p class="mb-1 h6 line-height-1">
                {{$str('sellChecklist2')}}
            </p>
            <p class="mb-0 h6 line-height-1">
                {{$str('sellChecklist3')}}
            </p>
        </v-flex>
        <div>
            <!--채팅창-->
            <chat :orderNo="orderNo" :merchantEmail="order.merchantEmail" :customerEmail="order.customerEmail"
                  :merchant_member_no="order.merchantMemberNo" :merchantNickname="order.merchantNickname"
                  :customerNickname="order.customerNickname"
                  :customer_member_no="order.customerMemberNo"></chat>
        </div>

        <!--모바일 환경에서 설명-->
        <div class="h6 text-xs-left color-darkgray line-height-1 mt-4a" v-if="isMobile()">
            <p class="mb-1 h6">
                {{$str('sellChecklist1')}}
            </p>
            <p class="mb-1 h6">
                {{$str('sellChecklist2')}}
            </p>
            <p class="mb-0 h6">
                {{$str('sellChecklist3')}}
            </p>
        </div>

        <v-flex xs6 md12 mb-4a text-md-left text-xs-left v-if="order.status === 'paid'">
            <!--거래 성사 버튼 (confirm 상태 일때) -->
            <input class="text-white-hover btn-rounded-white h5" type="button"
                   :value="$str('appeal')" @click="onModal('appeal')">
        </v-flex>

        <sell-modal :show="showModal" :type="modalType" v-on:confirm="onConfirm" v-on:close="onClose"></sell-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import SellModal from './sellModal/SellModal.vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import Chat from "@/components/Chat.vue";
    import TradeItem from "../item/TradeItem"

    export default Vue.extend({
        name: 'sell',
        components: {
            SellModal, Chat, TradeItem
        },
        props: ['cancel'], // 외부에서 취소버튼 눌러 접근할 경우 props에 true값 전달
        data: () => ({
            orderNo: 0,
            modalType: '',
            appealCode: 977057,
            showModal: false,
        }),
        created() {
            //order no GET from url param
            var url = location.href;
            var parameters = url.slice(url.indexOf('?') + 1, url.length);
            if (parameters.substr(0, 4) != 'http') {
                this.orderNo = parameters;
            } else {
                //order number 없을 시, 거래소 페이지 이동
                this.$router.push("tradeCenter");
            }

            // 유져 데이터 정보 get
            this.getOrderData();

            //취소 일경우 props로 판단 및 status 변경
            if (this.cancel === 'true') {

            }

            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }
        },
        computed: {
            order() {
                return MainRepository.TradeProcess.getOrder();
            },
            getOrderNumber() {
                let orderNoDigits = this.orderNo.length;
                let zeroDigits = 8 - orderNoDigits;
                let addZero = '';
                for (let i = 0; i < zeroDigits; i++) {
                    addZero += "0"
                }
                let temp = addZero + this.orderNo;
                return temp;
            },
        },
        methods: {
            getMyPaymentMethodSelectList() {
                return MainRepository.TradeProcess.getOrder().filteredPaymentMethod
            },
            getOrderData() {
                let self = this;
                MainRepository.TradeProcess.setOrder({
                    email: MainRepository.MyInfo.getUserInfo().email,
                    orderNo: self.orderNo
                }, function (result) {
                })
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            onConfirm(pw) {
                let self = this;
                MainRepository.TradeProcess.onConfirm({
                    email: MainRepository.MyInfo.getUserInfo().email,
                    orderNo: self.orderNo,
                    tradePassword: pw
                }, function (result) {
                    self.getOrderData();
                    self.onClose();
                });

            },
            onClose() {
                this.showModal = false;
            },
            onCopy(type) {
                let copyTemp;
                if (type == 'reference') {
                    copyTemp = document.querySelector('#referenceNum');
                } else {
                    copyTemp = document.querySelector('#amountValue');
                }

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
            onQRcode(type) {
                if (type === "alipay") {
                    console.log("alipay qr code");
                } else {
                    console.log("wechat qr code");
                }
            }
        },

    });
</script>

<style scoped>
    .flex-divide {
        border-bottom: solid 1px #d1d1d1;
    }

    .payment-complete-wrapper {
        display: flex;
    }

    .payment-explain-wrapper {
        border-radius: 2px;
        background: #f8f8fa;
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

    .cancel-icon-wrapper {
        height: 88px;
    }

    .referenceNum {
        position: absolute;
        left: -1000px;
    }


    .flex {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>