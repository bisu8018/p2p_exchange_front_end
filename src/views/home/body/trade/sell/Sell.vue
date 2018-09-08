<template>
    <div class="mt-5 mb-5 mr-3 ml-3 p-relative">
        <v-layout column mb-4 flex-divide>
            <div class="color-darkgray h6 text-xs-left mb-3">

                <!--{{ order_number }} 주문번호-->
                {{ $str('order') }} : #{{ getOrderNumber }}

            </div>

            <div class="h1 bold color-black text-xs-left mb-3  vertical-center">

                <!--buy/sell -->
                {{ $str('sell') }}

                <!--토큰량 -->
                {{ this.$fixed(currentOrder.coinWithoutFeeCount, currentOrder.cryptocurrency) }}

                <!-- 토큰종류-->
                {{ currentOrder.cryptocurrency }}
                <span class="mr-2"></span>

                <!-- 닉네임-->
                <div class="d-inline-block">  {{ $str('from') }} {{ counterPartyNickname }}</div>

            </div>


            <div class="text-xs-left mb-4 ">
                <div class="color-black mb-3 ">

                    {{ $str('price') }} :

                    <!-- 가격 -->
                    <span class="ml-3 h3">{{ toMoneyFormat(currentOrder.price) }}

                        <!-- 화폐단위-->  <!-- 토큰종류 -->
                        {{ currentOrder.currency }} / {{ currentOrder.cryptocurrency }}

                    </span>
                </div>

                <div class="color-black">

                    {{ $str('amount') }} :

                    <!--{{ currentOrder.price }} 가격 -->

                    <div class="c-pointer tooltip d-inline-block">

                        <span slot="activator" class="ml-3 h3 color-orange-price bold" @click="onCopy('amount')">

                          {{ toMoneyFormat(currentOrder.amount) }}

                            <!--{{ currentOrder.currency }} 화폐단위-->
                            {{ currentOrder.currency }}

                        </span>

                        <input type="text" :value="currentOrder.amount" id="amountValue" class="referenceNum">

                        <span class="tooltip-content">{{ $str("Copy") }}</span>

                    </div>
                </div>
            </div>
        </v-layout>

        <div v-if="currentOrder.status !== 'cancelled' && currentOrder.status !== 'expired'"
             v-for="item in getMyPaymentMethodSelectList()">
            <trade-item :item="item"></trade-item>
        </div>
        <div class="h4 bold color-black text-xs-left mb-4">
            <v-flex xs12 md4>

                <!--status cancel 일 시 설명 문구-->
                <div class="cancel-explain mb-4 "
                     v-if="currentOrder.status ==='cancelled' || currentOrder.status ==='expired'">
                    {{ $str("cancelExplain") }}
                </div>
            </v-flex>

            <!--unpaid 상태 일때-->
            <div class="mb-2" v-if="currentOrder.status === 'unpaid'">

                {{ $str("payingExplain1") }}
                {{ counterPartyNickname }}
                {{ $str("payingExplain2") }}

                <span class="color-orange-price">{{ toMoneyFormat(currentOrder.amount) }} {{ currentOrder.currency }}</span>

                {{ $str("payingExplain3") }}

                <!--타이머 스크립트 작성 필요-->
                <span class="color-green">{{  limitTime  }}</span>

                {{ $str("payingExplain4") }}
            </div>


            <!--paid 상태 일때-->
            <div class="mb-2" v-if="currentOrder.status === 'paid'">

                {{ $str("confirmgExplain1") }}
                {{ counterPartyNickname }}
                {{ $str("confirmgExplain2") }}

                <span class="color-orange-price">{{ toMoneyFormat(currentOrder.amount) }} {{ currentOrder.currency }}</span>
            </div>


            <div>
                <!-- complete / Cancel 상태 -->
                <span v-if="currentOrder.status === 'cancelled' || currentOrder.status === 'expired'">
                    {{ $str("cancel") }}
                </span>

                <!-- complete / Cancel 상태 -->
                <span v-if="currentOrder.status === 'complete' || currentOrder.status === 'cancelled' || currentOrder.status === 'expired'">
                    {{ $str("complete") }},
                </span>

                <!-- Complaining 일 때 -->
                <span v-if="currentOrder.status === 'complaining'">
                    {{ $str("appealCodeExplain") }}
                    {{ getAppeal.appealNo }} ,
                </span>

                {{ $str("referenceText") }} :

                <div class="c-pointer tooltip">
                    <span slot="activator" class=" btn-white h5 bold pl-3 pr-3 ml-3 " @click="onCopy('reference')">

                        <!--{{ 거래번호 }}-->
                        {{ currentOrder.referenceNo }}

                    </span>
                    <input type="text" :value="currentOrder.referenceNo" id="referenceNum" class="referenceNum">
                    <span class="tooltip-content">{{ $str("Copy") }}</span>
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


        <!--거래 성사 버튼 (confirm 상태 일때) -->
        <v-flex xs12 md2 :class="{'mb-3' : isMobile()}" v-if="currentOrder.status === 'paid'">
            <input type="button" class="btn-blue btn-blue-hover mb-4"
                   :value="$str('confirmRelease')" @click="onModal('confirm')">
        </v-flex>

        <!--거래완료 아이콘 및 메세지 (complete 상태일때)-->
        <v-flex xs12 md12 mb-4 text-xs-left payment-complete-wrapper align-center
                v-else-if="currentOrder.status === 'complete'">
            <div><i class="material-icons check-icon">check_circle</i></div>
        </v-flex>

        <!--거래 취소 아이콘 (cancel 상태일때)-->
        <v-flex xs12 md12 mb-4 cancel-icon-wrapper text-xs-left
                v-if="currentOrder.status === 'cancelled' || currentOrder.status === 'expired'">
            <i class="material-icons cancel-icon">cancel</i>
        </v-flex>

        <!--이의제기 아이콘 및 취소 버튼 (appeal 상태일때)-->
        <v-flex xs6 md12 mb-4 cancel-icon-wrapper text-xs-left v-if="currentOrder.status === 'complaining'">
            <i class="material-icons  warning-icon ">error</i>
        </v-flex>


        <!--데스크탑 환경에서 설명-->
        <v-flex xs12 md6 mb-4 h6 text-xs-left color-darkgray v-if="!isMobile()">
            <p class="mb-1 h6 ">
                {{ $str('sellChecklist1') }}
            </p>
            <p class="mb-1 h6 ">
                {{ $str('sellChecklist2') }}
            <p class="mb-0 h6 ">
                {{ $str('sellChecklist3') }}
            </p>
        </v-flex>


        <!--이의제기 취소 버튼 (appeal 상태일때)-->
        <v-flex xs6 md12 mb-4a text-md-left text-xs-right
                v-if="currentOrder.status === 'complaining' && checkAppealBtn() === true "
                :class="{'pt-4' : isMobile()}">
            <a class="color-blue-active"
               @click="onModal('cancelAppeal')">{{ $str('cancelModalButton') }}</a>
        </v-flex>


        <!--채팅창-->
        <div>
            <div v-if="isInitCompleted">
                <message :order="currentOrder"></message>
            </div>
        </div>


        <!--모바일 환경에서 설명-->
        <div class="h6 text-xs-left color-darkgray  mt-4a" v-if="isMobile()">
            <p class="mb-1 h6">
                {{ $str('sellChecklist1') }}
            </p>
            <p class="mb-1 h6">
                {{ $str('sellChecklist2') }}
            </p>
            <p class="mb-0 h6">
                {{ $str('sellChecklist3') }}
            </p>
        </div>


        <!--거래 성사 버튼 (confirm 상태 일때) -->
        <v-flex xs6 md12 mb-4a text-md-left text-xs-left v-if="currentOrder.status === 'paid'">
            <input class="text-white-hover btn-rounded-white h5" type="button"
                   :value="$str('appeal')" @click="onModal('appeal')" v-on:appeal="onAppeal"
                   v-on:cancelAppeal="onCancelAppeal">
        </v-flex>


        <sell-modal :show="showModal" :type="modalType" v-on:confirm="onConfirm" v-on:close="onClose"
                    v-on:appeal="onAppeal" v-on:cancelAppeal="onCancelAppeal"></sell-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import SellModal from './sellModal/SellModal.vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import Message from "@/components/Message.vue";
    import TradeItem from "../item/TradeItem"
    import {getLimitTime} from "../../../../../common/common";
    import {abUtils} from "../../../../../common/utils";

    export default Vue.extend({
        name: 'sell',
        components: {
            SellModal, Message, TradeItem
        },
        props: ['cancel'], // 외부에서 취소버튼 눌러 접근할 경우 props에 true값 전달
        data: () => ({
            orderNo: 0,
            modalType: '',
            showModal: false,
            isInitCompleted: false,
            limitTime: '',
            timerInterval: {},
            checkStatus: {},
            currentOrder: '',
        }),
        computed: {
            counterPartyNickname() {    //상대방 닉네임 GET
                let merchantNickname = this.currentOrder.merchantNickname;
                let customerNickname = this.currentOrder.customerNickname;
                let customerMemberNo = this.currentOrder.customerMemberNo;
                let myNickname = MainRepository.MyInfo.getUserInfo().nickname;


                if (merchantNickname === myNickname) {
                    return customerNickname; //판매자 닉네임
                } else {
                    return merchantNickname; //고객 닉네임
                }
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
            getAppeal() {
                return this.currentOrder.appealList[this.currentOrder.appealList.length - 1];
            },
        },
        created() {
            this.$eventBus.$on('refreshSell', () => {
                this.init();
            });

            this.$eventBus.$emit('refreshSell');
        },
        beforeDestroy() {
            clearInterval(this.timerInterval);
            clearInterval(this.checkStatus);

            this.$eventBus.$off('refreshSell');
        },
        methods: {
            //초기화 작업
            init() {
                this.isInitCompleted = false;

                // 로그인 확인 -> Login 으로
                if (!MainRepository.MyInfo.isLogin()) {
                    MainRepository.router().goLogin();
                    return;
                }

                // URL param 검사
                let urlParam = this.getUrlParam();
                if (urlParam === '') {
                    MainRepository.router().goGeneralTrade();
                } else {
                    this.orderNo = urlParam;
                }

                MainRepository.TradeProcess.setCurrentOrder(this.orderNo, () => {
                    this.currentOrder =  MainRepository.TradeProcess.getCurrentOrder();

                    // 부적합한 유저 접근시 거래소 강제 이동
                    let myInfo = MainRepository.MyInfo.getUserInfo();
                    let tradeType = this.currentOrder.tradeType;
                    let merchantMemberNo = this.currentOrder.merchantMemberNo;
                    let customerMemberNo = this.currentOrder.customerMemberNo;

                    // 판매자 or 고객이 아닌 경우
                    if (myInfo.memberNo !== customerMemberNo && myInfo.memberNo !== merchantMemberNo) {
                        MainRepository.router().goGeneralTrade();
                    }
                    // 판매자인 경우 Sell -> Buy 일 경우
                    else if (myInfo.memberNo === merchantMemberNo && tradeType === 'buy') {
                        MainRepository.router().goGeneralTrade();
                    }
                    // 고객인 경우 Sell -> Sell 일 경우
                    else if (myInfo.memberNo === customerMemberNo && tradeType === 'sell') {
                        MainRepository.router().goGeneralTrade();
                    }

                    this.isInitCompleted = true;
                    this.initInterval();
                }, () => {
                    // 없는 orderNo일 경우
                    MainRepository.router().goGeneralTrade();
                });
            },
            initInterval() {
                clearInterval(this.timerInterval);
                clearInterval(this.checkStatus);

                //payment window timer
                if (this.currentOrder.status === 'unpaid') {
                    this.limitTime = this.getLimitTime();
                    this.timerInterval = setInterval(() => {
                        this.limitTime = this.getLimitTime();
                        // 만료되었을 경우
                        if (this.limitTime === '0 Min 0 Sec') {
                            this.getOrderStatus();
                            clearInterval(this.timerInterval);
                            Vue.prototype.$eventBus.$emit('showAlert', 2155);
                        }
                    }, 1000)
                }
                if (this.currentOrder.status !== 'complete') {
                    this.checkStatus = setInterval(() => {
                        this.getOrderStatus();
                        if (this.currentOrder.status === 'complete') {
                            clearInterval(this.checkStatus);
                        }
                    }, 3000)
                }
            },
            getUrlParam() {
                let currentURL = window.location.href;
                let params = currentURL.split('?');
                if (params[1]) {
                    return params[1];
                } else {
                    return '';
                }
            },
            getLimitTime() {
                let time = getLimitTime(this.currentOrder.registerDatetime, this.currentOrder.paymentWindow);
                let min = time.split(':')[0];
                let sec = time.split(':')[1];
                return min + ' ' + this.$str('minuteText') + ' ' + sec + ' ' + this.$str('sec');
            },
            getMyPaymentMethodSelectList() {
                return this.currentOrder.filteredPaymentMethod
            },
            getOrderStatus() {
                let self = this;
                MainRepository.TradeProcess.getOrderStatus(self.orderNo
                    , (result) => {

                    })
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            onClose() {
                this.showModal = false;
            },
            onCopy(type) {
                let copyTemp;
                if (type == 'reference') {
                    this.$clipboard(this.currentOrder.referenceNo)
                    //copyTemp = document.querySelector('#referenceNum');
                } else {
                    this.$clipboard(this.currentOrder.amount)
                    //copyTemp = document.querySelector('#amountValue');
                }
                /*
                let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);

                if (!isiOSDevice) {
                    copyTemp.setAttribute('type', 'text');
                    copyTemp.select();
                    Vue.prototype.$eventBus.$emit('showAlert', 2001);
                }
                document.execCommand('copy');
                */
                Vue.prototype.$eventBus.$emit('showAlert', 2001);

            },
            onModal(type) {
                this.showModal = true;
                this.modalType = type;
            },
            // 거래완료
            onConfirm(pw) {
                MainRepository.TradeProcess.onConfirm({
                    orderNo: this.orderNo,
                    tradePassword: pw
                }, (result) => {
                    this.onClose();
                    this.currentOrder();
                    Vue.prototype.$eventBus.$emit('showAlert', 2150);
                }, () => {
                    return false;
                });
            },
            //appeal 한 후
            onAppeal(data) {
                let self = this;
                data['orderNo'] = Number(self.orderNo);
                MainRepository.TradeProcess.onAppeal(
                    data
                    , function (result) {
                        self.getOrderStatus();
                        self.onClose();
                        Vue.prototype.$eventBus.$emit('showAlert', 2153);
                    }, () => {
                        return false;
                    });
            },
            //이의 제기 취소
            onCancelAppeal() {
                this.showModal = false;
                let self = this;
                //이의제기 최신
                let appealList = this.currentOrder.appealList[this.currentOrder.appealList.length - 1];
                if (this.currentOrder.status === 'complaining' && appealList.status === 'registered') {
                    MainRepository.TradeProcess.onAppealCancel({
                        orderNo: self.orderNo,
                        appealNo: appealList.appealNo
                    }, function () {
                        self.getOrderStatus();
                        Vue.prototype.$eventBus.$emit('showAlert', 2154);
                    }, () => {
                        return false;
                    })
                }
            },
            checkAppealBtn() {
                if (this.getAppeal.registerMemberNo === MainRepository.MyInfo.getUserInfo().memberNo) {
                    return true;
                } else {
                    return false;
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
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
        text-align: center;
        color: #9294a6;
        padding: 8px;
    }

    .cancel-icon-wrapper {
        height: 88px;
    }

    .referenceNum {
        position: absolute !important;
        left: -1000px;
        visibility: hidden;
    }

    .flex {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>