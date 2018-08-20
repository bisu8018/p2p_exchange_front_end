<template>
    <div class="mt-5 mb-5 p-relative">
        <v-layout column mb-4 flex-divide>
            <div class="color-darkgray h6 text-xs-left mb-3">
                <!--{{order_number}} 주문번호-->
                Order : #{{getOrderNumber}}

            </div>
            <div class="h1 bold color-black text-xs-left mb-3 line-height-1 ">
                <!--{{ad_type}} buy/sell -->
                Buy
                <!--{{volume}} 토큰량 -->
                {{volumeTotal}}
                <!--{{token}} 토큰종류-->
                {{token}}
                <!--{{email}} 이메일-->
                <div class="d-inline-block">From {{email}}</div>
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
                    <div class="c-pointer tooltip d-inline-block">
                 <span slot="activator" class="ml-3 h3 color-orange-price bold" @click="onCopy('amount')">{{price}}
                     <!--{{currency}} 화폐단위-->
                        {{currency}}</span>
                        <input type="text" :value="price" id="amountValue" class="referenceNum">
                        <span class="tooltip-content">Copy</span>
                    </div>
                </div>
            </div>
        </v-layout>
        <v-layout wrap row v-if="status != 'cancel'" :class="{'mb-4' : isMobile()}">
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
        <v-layout wrap row >
            <v-flex xs12 md3>
                <!--status cancel 일 시 설명 문구-->
                <div class="cancel-explain mb-4" v-if="status ==='cancel'">
                    {{$str("cancelExplain")}}
                </div>
            </v-flex>
            <v-flex xs12 mb-4>
                <v-flex xs12 md5 h4 bold color-black text-xs-left>
                <span v-if="status != 'cancel' && status === 'pending'" class="mb-3">
                    <!--pending 상태 일때-->
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
                </span>
                    <!--buying 상태 일때-->
                    <span v-if="status === 'buying'" class="mb-2">
                    {{$str("buyingExplain1")}}

                        <!--{{volumeTotal}} 가격 , {{token}} 단위-->
                    <span class="color-orange-price">{{volumeTotal}} {{token}}</span>
                    {{$str("buyingExplain2")}}

                        <!--{{email}} 이메일-->
                    {{email}}
                    {{$str("buyingExplain3")}}
                    </span>

                    <span v-if="status === 'buying'">
                      <!--{{$str("buyingExplain4")}}-->
                    </span>
                    <span v-else-if="status === 'paid' || status === 'cancel'">
                    {{$str("cancel")}} {{$str("complete")}},
                    </span>

                    <!--status cancel 일 시 설명 문구-->
                    <span v-if="status === 'appeal'">
                        {{$str("appealCodeExplain")}}
                        {{appealCode}} ,
                    </span>
                    {{$str("referenceText")}} :
                    <div class="c-pointer tooltip d-inline-block">
                        <span slot="activator" class=" btn-white h5 bold pl-3 pr-3 ml-3 " @click="onCopy('reference')">
                    <!--{{거래번호}}-->
                    {{reference}}
                    </span>
                        <input type="text" :value="reference" id="referenceNum" class="referenceNum">
                        <span class="tooltip-content">Copy</span>
                    </div>
                </v-flex>
            </v-flex>
            <!--paid 버튼--><!--pending 상태 일때-->
            <v-flex xs12 md2 :class="{'mb-3' : isMobile()}" v-if="status === 'pending'">
                <input type="button" class=" btn-blue btn-blue-hover"
                       :value="$str('paidText')" @click="onModal('paid')">
            </v-flex>
            <!--paid 설명-->
            <v-flex xs12 md10 text-md-left vertical-center>
                <span :class="{'ml-2' : !isMobile()} " v-if="status === 'pending'"
                      class="vertical-center mb-4 payment-explain-wrapper color-orange-price h6 line-height-1 text-xs-left pt-2 pb-2 pr-2 pl-2">
                        <i class="material-icons color-orange-price mr-2 ">info</i>
                        {{$str('paymentText')}}
                </span>
            </v-flex>


            <!--buying process indicator buying 상태 일때-->
            <v-flex xs12 mb-4 v-if="status === 'buying'" >
                <v-flex md3>
                    <span class="p-relative">
                    <input type="text" class="buying-process"
                           :value="$str('buyingIndicator')"
                           readonly>
                    <v-progress-circular indeterminate class="color-blue progress-circular"></v-progress-circular>
                    </span>
                </v-flex>
            </v-flex>

            <!--거래완료 아이콘 및 메세지 (paid 상태일때)-->
            <v-flex xs12 md12  mb-4 text-xs-left payment-complete-wrapper align-center v-else-if="status === 'paid'">
                <div><i class="material-icons check-icon">check_circle</i></div>
                <div class="text-xs-left ml-3  ">{{$str('completedPayment')}}
                    <a class="color-blue text-white-hover">{{$str('tranferNow')}}</a>
                </div>
            </v-flex>

            <!--거래 취소 아이콘 (cancel 상태일때)-->
            <v-flex  xs12 md12 mb-4  cancel-icon-wrapper text-xs-left v-if="status === 'cancel'">
                <i class="material-icons cancel-icon">cancel</i>
            </v-flex>


            <!--이의제기 아이콘 및 취소 버튼 (appeal 상태일때)-->
            <v-flex xs6 md12 mb-4  cancel-icon-wrapper text-xs-left v-if="status === 'appeal'">
                <i class="material-icons  warning-icon ">error</i>
            </v-flex>

            <!--데스크탑 환경에서 설명-->
            <v-flex xs12 md6 mb-4 h6 text-xs-left color-darkgray v-if="!isMobile()">
                <p class="mb-1 h6 line-height-1">
                    {{$str('transferChecklist1')}}
                </p>
                <p class="mb-1 h6 line-height-1">
                    {{$str('transferChecklist2')}}
                </p>
                <p class="mb-0 h6 line-height-1">
                    {{$str('transferChecklist3')}}
                </p>
            </v-flex>

            <!--취소 및 이의제기 버튼 (paying buying 상태일때)-->
            <v-flex xs12 mb-4a text-md-left text-xs-left
                    v-if="status != 'paid' && status != 'cancel' && status !='appeal'">

                <input class="btn-rounded-white text-white-hover mr-3" type="button" :value="$str('cancel')"
                       @click="onModal('cancel')">
                <input v-if="status === 'buying'" class="text-white-hover btn-rounded-white" type="button"
                       :value="$str('appeal')" @click="onModal('appeal')">
            </v-flex>

            <!--이의제기 취소 버튼 (appeal 상태일때)-->
            <v-flex xs6 md12 mb-4a text-md-left text-xs-right
                    v-if="status === 'appeal'" :class="{'pt-4' : isMobile()}">
                <a class="color-blue btn-blue-hover" @click="onModal('cancelAppeal')">{{$str('cancelModalButton')}}</a>
            </v-flex>
        </v-layout>


        <div>
            <!--채팅창-->
            <chat :orderNo="orderNo" :merchant_member_no="merchant_member_no" :customer_member_no="customer_member_no"></chat>
        </div>

        <!--모바일 환경에서 설명-->
        <div class="h6 text-xs-left color-darkgray line-height-1 mt-4a" v-if="isMobile()">
            <p class="mb-1 h6">
                {{$str('transferChecklist1')}}
            </p>
            <p class="mb-1 h6">
                {{$str('transferChecklist2')}}
            </p>
            <p class="mb-0 h6">
                {{$str('transferChecklist3')}}
            </p>
        </div>

        <!--buy modal-->
        <buy-modal :show="showModal" :type="modalType" v-on:paymentConfirm="onPaid" v-on:close="onClose"
                   v-on:cancel="onCancel" v-on:appeal="onAppeal" v-on:cancelAppeal="onCancelAppeal"></buy-modal>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import BuyModal from './buyModal/BuyModal.vue'
    import MainRepository from "../../../../../vuex/MainRepository";
    import Chat from "@/components/Chat.vue"


    export default Vue.extend({
        name: 'buy',
        components: {
            BuyModal, Chat
        },
        props: ['cancel'], // 외부에서 취소버튼 눌러 접근할 경우 props에 true값 전달
        data: () => ({
            orderNo: 0,
            volumeTotal: 0.1,
            token: 'ETH',
            email: 'Charles',
            price: 3405,
            currency: 'CNY',
            alipay: 'Y',
            wechat: 'Y',
            bankAccount: 'Y',
            alipay_address: '8888888888@qq.com 支付宝付款 直接扫码 安全便捷',
            wechatpay_address: 'wwxx8888888888   微信支付直接扫码',
            bankaccount_address: '8888888888  建设银行',
            paymentWindow: 15,
            reference: 453534,
            showModal: false,
            status: 'pending',     //pending -> buying -> paid   그리고   cancel, appeal
            modalType: '',
            appealCode: 977057,
            transactionNum: 20,
            merchant_member_no: 0,
            customer_member_no: 1,

        }),
        created() {
            //order no GET from url param
            var url = location.href;
            var parameters = url.slice(url.indexOf('?') + 1, url.length);
            if(parameters.substr(0,4) != 'http'){
                this.orderNo = parameters;
            }else{
                //order number 없을 시, 거래소 페이지 이동
                this.$router.push("tradeCenter");
            }


            // 유져 데이터 정보 get

            //취소 일경우 props로 판단 및 status 변경
            if (this.cancel === 'true') {
                this.status = 'cancel';
            }

            // 로그인 확인 -> Login 으로
            if (!MainRepository.Login.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }
        },
        computed: {
          getOrderNumber () {
              let orderNoDigits = this.orderNo.length;
              let zeroDigits = 8 - orderNoDigits;
              let addZero = '';
              for(let i = 0 ; i < zeroDigits; i++){
                  addZero += "0"
              }
              let temp = addZero + this.orderNo;
              return temp;
          }
        },
        methods: {
            getOrderData() {

            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
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
            onCopy(type) {
                let copyTemp;
                if(type == 'reference' ){
                    copyTemp = (document.querySelector('#referenceNum')as HTMLInputElement);
                }else{
                    copyTemp = (document.querySelector('#amountValue')as HTMLInputElement);
                }

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

    .qr-code-img {
        width: 14px;
        height: 14px;
    }

    .line-height-apealcode {
        line-height: 1.13;
    }

    .flex {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>