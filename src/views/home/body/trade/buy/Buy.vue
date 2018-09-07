<template>
    <div class="mt-5 mb-5 mr-3 ml-3 p-relative"  v-if="isInitCompleted">
        <v-layout column mb-4 flex-divide>
            <div class="color-darkgray h6 text-xs-left mb-3">
                <!--{{ order_number }} 주문번호-->
                {{ $str('order') }} : #{{ getOrderNumber }}
            </div>
            <div class="h1 bold color-black text-xs-left mb-3  vertical-center">
                <!-- buy/sell -->
                {{ $str('buy') }}

                <!-- 토큰량 -->
                {{ this.$fixed(currentOrder.coinWithoutFeeCount, currentOrder.cryptocurrency) }}

                <!-- 토큰종류-->
                {{ currentOrder.cryptocurrency }}

                <span class="mr-2"></span>

                <!-- 닉네임-->
                <div class="d-inline-block"> {{ $str('from') }} {{ counterPartyNickname }}</div>
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
                            {{ currentOrder.currency }}</span>

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

        <v-layout wrap row>
            <v-flex xs12 md4>
                <!--status cancel 일 시 설명 문구-->
                <div class="cancel-explain mb-4 "
                     v-if="currentOrder.status ==='cancelled' || currentOrder.status ==='expired'">
                    {{ $str("cancelExplain") }}
                </div>
            </v-flex>
            <v-flex xs12 mb-4>
                <v-flex xs12 md5 h4 bold color-black text-xs-left>
                    <span v-if="currentOrder.status !== 'cancelled' && currentOrder.status !== 'expired' && currentOrder.status === 'unpaid'"
                          class="mb-3">

                        <!--unpaid 상태 일때-->
                        {{ $str("paymentExplain1") }}

                        <!--{{ currentOrder.price }} 가격, {{ currentOrder.currency }} 화폐단위-->
                        <span class="color-orange-price">{{ toMoneyFormat(currentOrder.amount) }} {{ currentOrder.currency }}</span>
                        {{ $str("paymentExplain2") }}

                        <!-- 닉네임-->
                        {{ counterPartyNickname }}
                        {{ $str("paymentExplain3") }}

                        <!-- 지불기간-->
                        <span class="color-green">{{  limitTime  }}</span>
                        {{ $str("paymentExplain4") }}
                    </span>

                    <!--buying 상태 일때-->
                    <span v-if="currentOrder.status === 'paid'" class="mb-2">
                    {{ $str("buyingExplain1") }}

                    <!--{{ currentOrder.coinWithoutFeeCount }} 가격 , {{ currentOrder.cryptocurrency }} 단위-->
                    <span class="color-orange-price">{{ this.$fixed(currentOrder.coinWithoutFeeCount, currentOrder.cryptocurrency) }} {{ currentOrder.cryptocurrency }}</span>
                    {{ $str("buyingExplain2") }}

                    <!--{{ counterPartyNickname }} 닉네임-->
                    {{ counterPartyNickname }}
                    {{ $str("buyingExplain3") }}
                    </span>

                    <!-- complete / Cancel 상태 -->
                    <span v-else-if="currentOrder.status === 'cancelled' || currentOrder.status === 'expired'">
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
                    <div class="c-pointer tooltip d-inline-block">
                        <span slot="activator" class=" btn-white h5 bold pl-3 pr-3 ml-3 " @click="onCopy('reference')">

                            <!--{{ 거래번호 }}-->
                            {{ currentOrder.referenceNo }}
                       </span>

                        <input type="text" :value="currentOrder.referenceNo" id="referenceNum" class="referenceNum">
                        <span class="tooltip-content">Copy</span>
                    </div>
                </v-flex>
            </v-flex>

            <!--paid 버튼--><!--unpaid 상태 일때-->
            <v-flex xs12 md2 :class="{'mb-3' : isMobile()}" v-if="currentOrder.status === 'unpaid'">
                <input type="button" class=" btn-blue btn-blue-hover"
                       :value="$str('paidText')" @click="onModal('paid')">
            </v-flex>

            <!--paid 설명-->
            <v-flex xs12 md10 text-md-left vertical-center>
                <span :class="{'ml-2' : !isMobile()} " v-if="currentOrder.status === 'unpaid'"
                      class="vertical-center mb-4 payment-explain-wrapper color-orange-price h6 text-xs-left pt-2 pb-2 pr-2 pl-2">
                        <i class="material-icons color-orange-price mr-2 ">info</i>
                        {{ $str('paymentText') }}
                </span>
            </v-flex>

            <!--buying process indicator buying 상태 일때-->
            <v-flex xs12 mb-4 v-if="currentOrder.status === 'paid'">
                <v-flex md3>
                    <span class="p-relative">
                    <input type="text" class="buying-process"
                           :value="$str('sellingIndicator')"
                           readonly>
                    <v-progress-circular indeterminate class="color-blue progress-circular"></v-progress-circular>
                    </span>
                </v-flex>
            </v-flex>

            <!--거래완료 아이콘 및 메세지 (complete 상태일때)-->
            <v-flex xs12 md12 mb-4 text-xs-left payment-complete-wrapper align-center
                    v-else-if="currentOrder.status === 'complete'">
                <div><i class="material-icons check-icon">check_circle</i></div>
                <div class="text-xs-left ml-3 ">{{ $str('completedPayment') }}
                    <a class="color-blue text-white-hover" @click="goWallet()">{{ $str('tranferNow') }}</a>
                </div>
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
                    {{ $str('transferChecklist1') }}
                </p>
                <p class="mb-1 h6 ">
                    {{ $str('transferChecklist2') }}
                </p>
                <p class="mb-0 h6 ">
                    {{ $str('transferChecklist3') }}
                </p>
            </v-flex>

            <!--취소 및 이의제기 버튼 (paying buying 상태일때)-->
            <v-flex xs12 mb-4a text-md-left text-xs-left
                    v-if="currentOrder.status != 'complete' && currentOrder.status != 'cancelled' && currentOrder.status != 'expired' &&currentOrder.status !='complaining'">

                <input class="btn-rounded-white text-white-hover mr-3" type="button" :value="$str('cancel')"
                       @click="onModal('cancel')">
                <input v-if="currentOrder.status === 'paid'" class="text-white-hover btn-rounded-white" type="button"
                       :value="$str('appeal')" @click="onModal('appeal')">
            </v-flex>

            <!--이의제기 취소 버튼 (appeal 상태일때)-->
            <v-flex xs6 md12 mb-4a text-md-left text-xs-right
                    v-if="currentOrder.status === 'complaining' && checkAppealBtn() === true "
                    :class="{'pt-4' : isMobile()}">
                <a class="color-blue text-white-hover"
                   @click="onModal('cancelAppeal')">{{ $str('cancelModalButton') }}</a>
            </v-flex>
        </v-layout>


        <div>
            <!--채팅창-->
            <message :order="currentOrder"></message>
        </div>

        <!--모바일 환경에서 설명-->
        <div class="h6 text-xs-left color-darkgray  mt-4a" v-if="isMobile()">
            <p class="mb-1 h6">
                {{ $str('transferChecklist1') }}
            </p>
            <p class="mb-1 h6">
                {{ $str('transferChecklist2') }}
            </p>
            <p class="mb-0 h6">
                {{ $str('transferChecklist3') }}
            </p>
        </div>

        <!--buy modal-->
        <buy-modal :show="showModal" :type="modalType" v-on:paymentConfirm="onPaid" v-on:close="onClose"
                   v-on:cancel="onCancel" v-on:appeal="onAppeal" v-on:cancelAppeal="onCancelAppeal"></buy-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import BuyModal from './buyModal/BuyModal.vue'
    import MainRepository from "../../../../../vuex/MainRepository";
    import Message from "@/components/Message.vue";
    import TradeItem from "../item/TradeItem"
    import {getLimitTime} from "../../../../../common/common";
    import {abUtils} from "../../../../../common/utils";

    export default Vue.extend({
        name: 'buy',
        components: {
            BuyModal, Message, TradeItem
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
            this.$eventBus.$on('refreshBuy', () => {
                this.init();
            });

            this.$eventBus.$emit('refreshBuy');
        },
        beforeDestroy() {
            clearInterval(this.timerInterval);
            clearInterval(this.checkStatus);

            this.$eventBus.$off('refreshBuy');
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
                    MainRepository.router().goTradeCenter();
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
                        MainRepository.router().goTradeCenter();
                    }
                    // 판매자인 경우 Buy -> Sell 일 경우
                    else if (myInfo.memberNo === merchantMemberNo && tradeType === 'sell') {
                        MainRepository.router().goTradeCenter();
                    }
                    // 고객인 경우 Buy -> Buy 일 경우
                    else if (myInfo.memberNo === customerMemberNo && tradeType === 'buy') {
                        MainRepository.router().goTradeCenter();
                    }

                    this.isInitCompleted = true;
                    this.initInterval();
                }, () => {
                    // 없는 orderNo일 경우
                    MainRepository.router().goTradeCenter();
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
                if (type === 'reference') {
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
                }

                document.execCommand('copy');
                */
                Vue.prototype.$eventBus.$emit('showAlert', 2001);

            },
            onModal(type) {
                this.showModal = true;
                this.modalType = type;
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
                    }, () => {
                        self.getOrderStatus();
                        Vue.prototype.$eventBus.$emit('showAlert', 2154);
                    }, () => {
                        return false;
                    })
                }

            },
            //paid 버튼 클릭 후
            onPaid() {
                let self = this;
                MainRepository.TradeProcess.onPaid(
                    Number(self.orderNo)
                    , (result) => {
                        Vue.prototype.$eventBus.$emit('showAlert', 2151);
                        self.getOrderStatus();
                        self.onClose();
                    }, () => {
                        return false;
                    });
            },
            //cancel 버튼 클릭 후
            onCancel() {
                let self = this;
                MainRepository.TradeProcess.onCancel({
                    orderNo: Number(self.orderNo),
                    email: MainRepository.MyInfo.getUserInfo().email
                }, (result) => {
                    Vue.prototype.$eventBus.$emit('showAlert', 2102);
                    self.getOrderStatus();
                    self.onClose();
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
                    , (result) => {
                        Vue.prototype.$eventBus.$emit('showAlert', 2153);
                        self.getOrderStatus();
                        self.onClose();
                    }, () => {
                        return false;
                    });
            },
            checkAppealBtn() {
                if (this.getAppeal.registerMemberNo === MainRepository.MyInfo.getUserInfo().memberNo) {
                    return true
                } else {
                    return false
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
            goWallet() {
                MainRepository.router().goWallet();
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
        display: none;
    }

    .flex {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>