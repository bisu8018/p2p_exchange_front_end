<template>
    <div class="mt-5 mb-5  p-relative" v-if="isInitCompleted" :class="{'ml-3' : !isMobile(),'mr-3' : !isMobile()}">


        <!--***************      첫번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout column mb-4 flex-divide>
            <div class="color-darkgray h6 text-xs-left mb-3">
                {{ $str('order') }} : #{{ getOrderNumber }}         <!--{{ order_number }} 주문번호-->
            </div>
            <div class="h1 bold color-black text-xs-left mb-3  vertical-center">
                {{ $str('buy') }}
                {{ currentOrder.cryptocurrency==='custom' ? currentOrder.coinWithoutFeeCount :
                this.$fixed(currentOrder.coinWithoutFeeCount, currentOrder.cryptocurrency) }}
                {{ getTokenName }}
                <br v-if="isMobile()"/>
                {{ $str('from') }} {{ counterPartyNickname }}
            </div>
            <div class="text-xs-left mb-4 ">
                <div class="color-black mb-3 ">
                    {{ $str('price') }} :            <!-- 가격 -->
                    <span class="ml-3 h3">{{ toMoneyFormat(currentOrder.price) }}
                        {{ currentOrder.currency }} / {{ getTokenName }}
                    </span>
                </div>
                <div class="color-black">
                    {{ $str('amount') }} :           <!--{{ currentOrder.price }} 가격 -->
                    <div class="c-pointer tooltip d-inline-block">
                        <span slot="activator" class="ml-3 h3 color-orange-price bold" @click="onCopy('amount')">
                             {{ toMoneyFormat(currentOrder.amount) }} {{ currentOrder.currency }}</span>
                        <!--{{ currentOrder.currency }} 화폐단위-->
                        <input type="text" :value="currentOrder.amount" id="amountValue" class="referenceNum">
                        <span class="tooltip-content">{{ $str("Copy") }}</span>
                    </div>
                </div>
            </div>
        </v-layout>


        <!--***************      두번째       *********-->
        <!--***************       섹션        *********-->

        <div v-if="currentOrder.status !== 'cancelled' && currentOrder.status !== 'expired'"
             v-for="item in getMyPaymentMethodSelectList()">
            <trade-item :item="item"></trade-item>
        </div>

        <v-layout wrap row>
            <!--*******************  expired, cancelled 상태  ******************-->
            <v-flex xs12 md4 cancel-explain mb-4
                    v-if="currentOrder.status ==='cancelled' || currentOrder.status ==='expired'">
                <!--status cancel 일 시 설명 문구-->
                {{ $str("cancelExplain") }}
            </v-flex>

            <v-flex xs12 mb-4>
                <v-flex xs12 md6 h4 bold color-black text-xs-left class="buy-content">

                    <!--*******************  unpaid 상태  ******************-->

                    <span v-if="currentOrder.status !== 'cancelled' && currentOrder.status !== 'expired' && currentOrder.status === 'unpaid'"
                          class="mb-3">
                        {{ $str("paymentExplain1") }}
                        <span class="color-orange-price">{{ toMoneyFormat(currentOrder.amount) }} {{ currentOrder.currency }}</span>
                        <!--{{ currentOrder.price }} 가격, {{ currentOrder.currency }} 화폐단위-->
                        {{ $str("paymentExplain2") }}
                        {{ counterPartyNickname }}            <!-- 닉네임-->
                        {{ $str("paymentExplain3") }}
                        <span class="color-green">{{  limitTime  }}</span>          <!-- 지불기간-->
                        {{ $str("paymentExplain4") }}
                    </span>

                    <!--*******************  buying 상태  ******************-->

                    <span v-if="currentOrder.status === 'paid'">
                        {{ $str("buyingExplain1") }}
                        <span class="color-orange-price">
                            {{ currentOrder.cryptocurrency==='custom' ? currentOrder.coinWithoutFeeCount : this.$fixed(currentOrder.coinWithoutFeeCount, currentOrder.cryptocurrency) }} {{ getTokenName }}
                        </span>
                        {{ $str("buyingExplain2") }}
                        {{ counterPartyNickname }}       <!--{{ counterPartyNickname }} 닉네임-->
                        {{ $str("buyingExplain3") }}
                    </span>

                    <!--*******************  expired, cancelled 상태  ******************-->

                    <span v-else-if="currentOrder.status === 'cancelled'">
                    {{ $str("cancel") }}
                    </span>
                    <span v-else-if="currentOrder.status === 'expired'">
                    {{ $str("expired") }},
                    </span>


                    <!--*******************  complete, Cancel, expired 상태  ******************-->

                    <span v-if="currentOrder.status === 'complete' || currentOrder.status === 'cancelled'" class="bold">
                    {{ $str("complete") }},
                    </span>

                    <!--*******************  Complaining 상태  ******************-->

                    <span v-if="currentOrder.status === 'complaining'">
                        {{ $str("appealCodeExplain") }}
                        {{ getAppeal.appealNo }} ,
                    </span>

                    <span>
                        {{ $str("referenceText") }} :
                    </span>
                    <div class="c-pointer tooltip d-inline-block">
                        <span slot="activator" class=" btn-white h5 bold pl-3 pr-3 ml-3 " @click="onCopy('reference')"
                              :class="{'d-ruby': checkFirefox}">
                            {{ currentOrder.referenceNo }}       <!--{{ 거래번호 }}-->
                       </span>
                        <input type="text" :value="currentOrder.referenceNo" id="referenceNum" class="referenceNum">
                        <span class="tooltip-content">{{ $str("Copy") }}</span>
                    </div>
                </v-flex>
            </v-flex>

            <!--******************* unpaid 상태  ******************-->

            <v-flex xs12 md2 :class="{'mb-3' : isMobile()}" v-if="currentOrder.status === 'unpaid'">
                <!--paid 버튼-->
                <input type="button" class=" btn-blue btn-blue-hover"
                       :value="$str('paidText')" @click="onModal('paid')">
            </v-flex>


            <v-flex xs12 md10 text-md-left vertical-center>
                <span :class="{'ml-2' : !isMobile()} " v-if="currentOrder.status === 'unpaid'"
                      class="vertical-center mb-4 payment-explain-wrapper color-orange-price h6 text-xs-left pt-2 pb-2 pr-2 pl-2">
                        <i class="material-icons color-orange-price mr-2 ">info</i>
                        {{ $str('paymentText') }}       <!--paid 설명-->
                </span>
            </v-flex>

            <!--******************* paid  상태  ******************-->

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

            <!--******************* complete  상태  ******************-->

            <v-flex xs12 md12 mb-4 text-xs-left payment-complete-wrapper align-center
                    v-else-if="currentOrder.status === 'complete'">     <!--거래완료 아이콘 및 메세지-->
                <div><i class="material-icons check-icon">check_circle</i></div>
                <div class="text-xs-left ml-3 ">{{ $str('completedPayment') }}
                    <a class="color-blue text-white-hover" @click="goWallet()">{{ $str('tranferNow') }}</a>
                </div>
            </v-flex>

            <!--******************* cancel  상태  ******************-->

            <v-flex xs12 md12 mb-4 cancel-icon-wrapper text-xs-left
                    v-if="currentOrder.status === 'cancelled' || currentOrder.status === 'expired'">
                <!--거래 취소 아이콘 -->
                <i class="material-icons cancel-icon">cancel</i>
            </v-flex>

            <!--******************* appeal  상태  ******************-->

            <v-flex xs6 md12 mb-4 cancel-icon-wrapper text-xs-left v-if="currentOrder.status === 'complaining'">
                <!--이의제기 아이콘 및 취소 버튼 -->
                <i class="material-icons  warning-icon ">error</i>
            </v-flex>


            <v-flex xs12 md6 mb-4 h6 text-xs-left color-darkgray v-if="!isMobile()">        <!--데스크탑 환경에서 설명-->
                <p class="mb-1 h6 ">{{ $str('transferChecklist1') }}</p>
                <p class="mb-1 h6 ">{{ $str('transferChecklist2') }}</p>
                <p class="mb-0 h6 ">{{ $str('transferChecklist3') }}</p>
            </v-flex>


            <v-flex xs12 mb-4a text-md-left text-xs-left
                    v-if="currentOrder.status != 'complete' && currentOrder.status != 'cancelled' && currentOrder.status != 'expired' &&currentOrder.status !='complaining'">
                <!--취소 및 이의제기 버튼-->
                <input class="btn-rounded-white text-white-hover mr-3" type="button" :value="$str('cancel')"
                       @click="onModal('cancel')">
                <input v-if="currentOrder.status === 'paid'" class="text-white-hover btn-rounded-white" type="button"
                       :value="$str('appeal')" @click="onModal('appeal')">
            </v-flex>

            <!--******************* appeal  상태  ******************-->

            <v-flex xs6 md12 mb-4a text-md-left text-xs-right
                    v-if="currentOrder.status === 'complaining' && checkAppealBtn"
                    :class="{'pt-4' : isMobile()}"><!--이의제기 취소 버튼 -->
                <a class="color-blue text-white-hover"
                   @click="onModal('cancelAppeal')">{{ $str('cancelModalButton') }}</a>
            </v-flex>
        </v-layout>

        <div>
            <message :order="currentOrder"></message>        <!--채팅창-->
        </div>
        <div class="h6 text-xs-left color-darkgray  mt-4a" v-if="isMobile()">       <!--모바일 환경에서 설명-->
            <p class="mb-1 h6">{{ $str('transferChecklist1') }}</p>
            <p class="mb-1 h6">{{ $str('transferChecklist2') }}</p>
            <p class="mb-0 h6">{{ $str('transferChecklist3') }}</p>
        </div>

        <buy-modal :show="showModal" :type="modalType" v-on:paymentConfirm="onPaid" v-on:close="onClose"
                   v-on:cancel="onCancel" v-on:appeal="onAppeal" v-on:cancelAppeal="onCancelAppeal"></buy-modal>
        <!--buy modal-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import BuyModal from './buyModal/BuyModal.vue'
    import MainRepository from "../../../../../vuex/MainRepository";
    import Message from "@/components/Message.vue";
    import TradeItem from "../item/TradeItem"
    import {getLimitTime, transCryptocurrencyName, findCustomTokenName} from "../../../../../common/common";
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
            checkAppealBtn() {
                if (this.getAppeal.registerMemberNo === MainRepository.MyInfo.getUserInfo().memberNo && this.getAppeal.status === 'registered') {
                    return true
                } else {
                    return false
                }
            },
            getTokenName() {
                if (this.currentOrder.cryptocurrency !== 'custom') {         //general token 이름 찾기
                    return transCryptocurrencyName(this.currentOrder.cryptocurrency)
                } else {                                        //custom token 이름 찾기
                    let data = MainRepository.CustomToken.controller().getCustomTokenList();
                    return findCustomTokenName(data, this.currentOrder.tokenNo);
                }
            },
            checkFirefox() {
                return navigator.userAgent.toLowerCase().indexOf('firefox') > -1
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
                    MainRepository.router().goGeneralTrade();
                } else {
                    this.orderNo = urlParam;
                }
                MainRepository.TradeProcess.setCurrentOrder(this.orderNo, () => {
                    this.currentOrder = MainRepository.TradeProcess.getCurrentOrder();

                    // 부적합한 유저 접근시 거래소 강제 이동
                    let myInfo = MainRepository.MyInfo.getUserInfo();
                    let tradeType = this.currentOrder.tradeType;
                    let merchantMemberNo = this.currentOrder.merchantMemberNo;
                    let customerMemberNo = this.currentOrder.customerMemberNo;

                    // 판매자 or 고객이 아닌 경우
                    if (myInfo.memberNo !== customerMemberNo && myInfo.memberNo !== merchantMemberNo) {
                        MainRepository.router().goGeneralTrade();
                    }
                    // 판매자인 경우 Buy -> Sell 일 경우
                    else if (myInfo.memberNo === merchantMemberNo && tradeType === 'sell') {
                        MainRepository.router().goGeneralTrade();
                    }
                    // 고객인 경우 Buy -> Buy 일 경우
                    else if (myInfo.memberNo === customerMemberNo && tradeType === 'buy') {
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
                        }
                    }, 1000)
                }
                if (this.currentOrder.status !== 'complete') {
                    this.checkStatus = setInterval(() => {
                        this.getOrderStatus();
                        if (this.currentOrder.status === 'complete') {
                            clearInterval(this.checkStatus);
                        }
                        if (this.currentOrder.status === 'complaining') {
                            this.getAppealData();
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
            getAppealData() {
                let self = this;
                MainRepository.TradeProcess.getAppeal({
                    email: MainRepository.MyInfo.getUserInfo().email,
                    orderNo: self.orderNo
                }, (result) => {

                })
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            onClose() {
                this.showModal = false;
            },
            onCopy(type) {
                let isiOSDevice = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                let value;
                if (type === 'reference') {
                    value = this.currentOrder.referenceNo;
                } else {
                    value = this.currentOrder.amount;
                }


                if (isiOSDevice) {
                    let textArea = document.createElement('textArea');
                    textArea.value = value;
                    document.body.appendChild(textArea);

                    let range = document.createRange();
                    range.selectNodeContents(textArea);
                    let selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                    textArea.setSelectionRange(0, 999999);
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                } else {
                    this.$clipboard(value);
                }

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
                        this.getAppealData();
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
                    Vue.prototype.$eventBus.$emit('showAlert', 2156);
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
                        this.getOrderStatus();
                        this.getAppealData();
                        this.onClose();
                    }, () => {
                        return false;
                    });
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

    .buy-content > span, .buy-content > span > span {
        font-size: 18px;
        font-weight: bold;
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
        font-weight: 400;
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