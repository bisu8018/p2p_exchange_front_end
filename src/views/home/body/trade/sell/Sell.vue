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
                {{currentOrder.coinCount}}
                <!-- 토큰종류-->
                {{currentOrder.cryptocurrency}}
                <span class="mr-2"></span>
                <!-- 닉네임-->
                <div class="d-inline-block"> From {{ currentOrder.merchantNickname }}</div>
            </div>
            <div class="text-xs-left mb-4 line-height-1">
                <div class="color-black mb-3 ">
                    {{$str('price')}} :
                    <!-- 가격 -->
                    <span class="ml-3 h3">{{currentOrder.price}}
                        <!-- 화폐단위-->  <!-- 토큰종류 -->
                        {{currentOrder.currency}} / {{currentOrder.cryptocurrency}}</span>
                </div>
                <div class="color-black">
                    {{$str('amount')}} :
                    <!--{{currentOrder.price}} 가격 -->
                    <div class="c-pointer tooltip d-inline-block">
                 <span slot="activator" class="ml-3 h3 color-orange-price bold" @click="onCopy('amount')">{{currentOrder.price}}
                     <!--{{currentOrder.currency}} 화폐단위-->
                        {{currentOrder.currency}}</span>
                        <input type="text" :value="currentOrder.price" id="amountValue" class="referenceNum">
                        <span class="tooltip-content">Copy</span>
                    </div>
                </div>
            </div>
        </v-layout>
        <div v-if="currentOrder.status != 'cancel'" v-for="item in getMyPaymentMethodSelectList()">

            <trade-item :item="item"></trade-item>

        </div>
        <div class="h4 bold color-black text-xs-left mb-4 line-height-1">
            <!--unpaid 상태 일때-->
            <div class="mb-2" v-if="currentOrder.status === 'unpaid'">
                {{$str("payingExplain1")}}
                {{currentOrder.customerNickname}}
                {{$str("payingExplain2")}}
                <span class="color-orange-price">{{currentOrder.price}} {{currentOrder.currency}}</span>
                {{$str("payingExplain3")}}
                <!--타이머 스크립트 작성 필요-->
                <span class="color-green">{{ limitTime }}</span>
                {{$str("payingExplain4")}}
            </div>

            <!--confirm 상태 일때-->
            <div class="mb-2" v-if="currentOrder.status === 'paid'">
                {{$str("confirmgExplain1")}}
                {{currentOrder.customerNickname}}
                {{$str("confirmgExplain2")}}
                <span class="color-orange-price">{{currentOrder.price}} {{currentOrder.currency}}</span>
                {{$str("confirmgExplain3")}}

            </div>
            <div>
                <span v-if="currentOrder.status === 'unpaid' || currentOrder.status === 'paid' ">
                    {{$str("referenceText")}}
                </span>
                <span v-if="currentOrder.status === 'complete'">
                    {{$str("complete")}},
                </span>

                :
                <div class="c-pointer tooltip">
                    <span slot="activator" class=" btn-white h5 bold pl-3 pr-3 ml-3 " @click="onCopy('reference')">
                    <!--{{거래번호}}-->
                    {{currentOrder.referenceNo}}
                    </span>
                    <input type="text" :value="currentOrder.referenceNo" id="referenceNum" class="referenceNum">
                    <span class="tooltip-content">{{$str("Copy")}}</span>
                </div>
            </div>
        </div>

        <!--unpaid process indicator (unpaid 상태 일때) -->
        <v-flex xs12 mb-4 v-if="currentOrder.status != 'complete'">
            <v-flex md3>
            <span v-if="currentOrder.status === 'unpaid'" class="p-relative">
                <input type="text" class="buying-process"
                       :value="$str('buyingIndicator')"
                       readonly>
                <v-progress-circular indeterminate class="color-blue progress-circular"
                ></v-progress-circular>
            </span>
            </v-flex>
        </v-flex>
        <v-flex xs12 md2 :class="{'mb-3' : isMobile()}" v-if="currentOrder.status === 'paid'">
            <!--거래 성사 버튼 (confirm 상태 일때) -->
            <input type="button" class="btn-blue btn-blue-hover mb-4"
                   :value="$str('confirmRelease')" @click="onModal('confirm')">
        </v-flex>

        <!--거래완료 아이콘 및 메세지 (complete 상태일때)-->
        <div class="mb-4a text-xs-left payment-complete-wrapper align-center" v-if="currentOrder.status === 'complete'">
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
            <div v-if="isInitCompleted">
                <!--채팅창-->
                <message :order = "currentOrder"></message>
            </div>
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

        <v-flex xs6 md12 mb-4a text-md-left text-xs-left v-if="currentOrder.status === 'paid'">
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
    import Message from "@/components/Message.vue";
    import TradeItem from "../item/TradeItem"
    import {getLimitTime} from "../../../../../common/common";

    export default Vue.extend({
        name: 'sell',
        components: {
            SellModal, Message, TradeItem
        },
        props: ['cancel'], // 외부에서 취소버튼 눌러 접근할 경우 props에 true값 전달
        data: () => ({
            orderNo: 0,
            modalType: '',
            appealCode: 977057,
            showModal: false,
            isInitCompleted: false,
            limitTime: '',
            timerInterval: {},
        }),
        computed: {
            currentOrder() {
                return MainRepository.TradeProcess.getCurrentOrder();
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
            setPaymentWindow() {
                let min;
                let sec;
                let t = this.setTime;
                console.log(t);
                // 정수로부터 남은 분, 초 단위 계산
                min = Math.floor(t/ 60);
                sec = Math.floor(t - min*60);

                // mm:ss 형태를 유지하기 위해 한자리 수일 때 0 추가
                if(min < 10) min = "0" + min;
                if(sec < 10) sec = "0" + sec;
                return(min + "분 " + sec + "초");
            },
        },
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

            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }
            let cureentURL = window.location.href;
            let params = cureentURL.split('?');
            if (params[1]) {
                this.orderNo = params[1];
            } else {
                MainRepository.router().goTradeCenter();
            }

            MainRepository.TradeProcess.loadCurrentOrder(this.orderNo, () => {
                this.isInitCompleted = true;
                this.init();
            });
        },
        beforeDestroy() {
            clearInterval(this.timerInterval);
        },
        methods: {
            init() {
                this.limitTime = this.getLimitTime();
                this.timerInterval = setInterval(() => {
                    this.limitTime = this.getLimitTime();
                    // 만료되었을 경우
                    if (this.limitTime === '00:00') {

                    }
                }, 1000)
            },
            getLimitTime() {
                return getLimitTime(this.currentOrder.registerDatetime, this.currentOrder.paymentWindow);
            },

            getPaymentWindow() {
                var startTime = Date.now();
                let _t = MainRepository.TradeProcess.getOrder().registerDatetime;
                let currentPaymentWindow = MainRepository.TradeProcess.getOrder().paymentWindow * 60 * 1000;
                let calcTime = currentPaymentWindow - (startTime - _t); //clacTime < 0, status cancel
                calcTime = calcTime/1000;
                this.setTime = calcTime;
                console.log(calcTime);
                this.getTimer();
            },
            getTimer() {
                this.start = setInterval(() => {
                    if (this.setTime > 0) { console.log(this.setTime)
                        this.setTime--;
                    } else {
                        clearInterval(this.start);
                        //staus GET AXIOS
                    }
                }, 1000);
            },
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