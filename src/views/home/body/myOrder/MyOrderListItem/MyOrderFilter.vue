<template>
    <v-layout row wrap>
        <v-flex xs12 md10 >
            <div class="order-filter p-relative f-right text-xs-left d-inline-table" v-bind:class="{'w-full' : isMobile}">
                <div class="color-darkgray  p-relative  ma-2 d-inline-block"
                      v-if=" date === '' && orderStatus === '' && orderNo === '' && coinType === '' && orderType === '' && tradeType === '' && currency === ''">{{$str("orderFilterPlaceholder")}}</div>
                <i class="material-icons p-absolute filter-img color-darkgray c-pointer"
                   @click.stop="isModal = !isModal">filter_list</i>

                <!--chips-->
                <div class="mr-5 chip-wrapper d-inline-block">
                    <h6 class="statusChip" v-if="date != ''">
                        <v-layout align-center row fill-height >
                            {{date}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('date')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="orderStatus != ''">
                        <v-layout align-center row fill-height>
                            {{orderStatus}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderStatus')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="orderNo != ''">
                        <v-layout align-center row fill-height>
                            {{orderNo}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderNo')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="coinType != ''">
                        <v-layout align-center row fill-height>
                            {{coinType}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('coinType')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="orderType != ''">
                        <v-layout align-center row fill-height>
                            {{orderType}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderType')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="tradeType != ''">
                        <v-layout align-center row fill-height>
                            {{tradeType}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('tradeType')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="currency != ''">
                        <v-layout align-center row fill-height>
                            {{currency}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('currency')">close</i>
                        </v-layout>
                    </h6>
                </div>

                <!--filter-->
                <div class="card-modal card-modal-mobile pr-3 pl-3 mt-3" v-if="isModal">
                    <div class="text-xs-left text-black mb-2">{{$str("date")}}</div>

                    <!--달력-->
                    <div class="mb-4">
                        <date-picker v-on:date="onDate" v-on:switch="clear = 'on'" :clear="clear"></date-picker>
                    </div>

                    <!--주문 상태-->
                    <div class="text-xs-left text-black mb-2">{{$str("orderStatus")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_orderStatus" class="comp-selectbox h6">
                            <option v-for="status in orderStatusList" v-bind:value="status.code">{{status.status}}
                            </option>
                        </select>
                        <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                    </div>

                    <!--주문 번호-->
                    <div class="text-xs-left text-black mb-2">{{$str("orderNo")}}</div>
                    <div class="mb-4">
                        <input type="text" class="input" :placeholder='$str("orderNoPlaceholder")' @keyup="onCheckNum"
                               v-model="modal_orderNo">
                    </div>

                    <!--암호화폐 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("Coin")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_coinType" class="comp-selectbox h6">
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="USDT">USDT</option>
                        </select>
                        <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                    </div>

                    <!--주문 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("orderType")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_orderType" class="comp-selectbox h6">
                            <option value="general">{{$str("general")}}</option>
                            <option value="block">{{$str("block")}}</option>
                        </select>
                        <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                    </div>

                    <!--거래 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("buySell")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_tradeType" class="comp-selectbox h6">
                            <option value="buy">{{$str("buy")}}</option>
                            <option value="sell">{{$str("sell")}}</option>
                        </select>
                        <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                    </div>

                    <!--화폐 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("currency")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_currency" class="comp-selectbox h6">
                            <option v-for="currency in currencies" v-bind:value="currency.currency">
                                {{currency.currency}}
                            </option>
                        </select>
                        <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                    </div>

                    <!-- cancel, search 버튼-->
                    <div>
                        <button class="btn-rounded-white text-white-hover h6" @click="onClear">
                            {{$str("clear")}}
                        </button>
                        <button class="btn-rounded-blue btn-blue-hoverhover h6 f-right" @click="onSearch">
                            {{$str("search")}}
                        </button>
                        <button class="btn-rounded-white text-white-hover h6 mr-3 f-right" @click="onCancel">
                            {{$str("cancel")}}
                        </button>
                    </div>
                </div>
            </div>
        </v-flex>



        <!--데스크탑 환경에서만 표시 -->
        <v-flex md2 pl-4 pr-0 v-if="!isMobile">
            <button class="color-blue btn-white ">{{$str("Export")}}</button>
        </v-flex>


    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../vuex/MainRepository';
    import DatePicker from '@/components/DatePicker.vue';
    import {abUtils} from "@/common/utils";

    export default Vue.extend({
        name: "myOrder-filter",
        components: {
            DatePicker
        },
        data: () => ({
            isModal: false,
            menu: false,
            clear: 'on',
            date: "",
            orderStatus: "",
            orderNo: "",
            coinType: "",
            orderType: "",
            tradeType: "",
            currency: '',
            modal_date: "",
            modal_orderStatus: "",
            modal_orderNo: "",
            modal_coinType: "",
            modal_orderType: "",
            modal_tradeType: "",
            modal_currency: '',
            orderStatusList: [
                {status: Vue.prototype.$str("unpaid"), code: 'unpaid'},
                {status: Vue.prototype.$str("paid"), code: 'paid'},
                {status: Vue.prototype.$str("cancelled"), code: 'cancelled'},
                {status: Vue.prototype.$str("complete"), code: 'complete'},
                {status: Vue.prototype.$str("complaining"), code: 'complaining'},
            ],
            //clear기능 때문에 공통 컴포넌트 사용 불가
            currencies: [
                {currency: 'CNY'},
                {currency: 'USD'},
                {currency: 'SGD'},
                {currency: 'INR'},
                {currency: 'VND'},
                {currency: 'CAD'},
                {currency: 'AUD'},
                {currency: 'KRW'},
                {currency: 'CHF'},
                {currency: 'TWD'},
                {currency: 'RUB'},
                {currency: 'GBP'},
                {currency: 'HKD'},
                {currency: 'EUR'},
                {currency: 'NGN'},
                {currency: 'IDR'},
                {currency: 'PHP'},
                {currency: 'KHR'},
            ],
            tradeStatus: 'BUY',
            tradeCoin: 'BTC',

        }),
        methods: {
            onDate(value) {
                this.modal_date = value;
            },
            onSearch() {
                // AXIOS GET 작업 진행
                this.date = this.modal_date;
                this.orderStatus = this.modal_orderStatus;
                this.orderNo = this.modal_orderNo;
                this.coinType = this.modal_coinType;
                this.orderType = this.modal_orderType;
                this.tradeType = this.modal_tradeType;
                this.currency = this.modal_currency;
            },
            onClear() {
                this.modal_date = "";
                this.modal_orderStatus = "";
                this.modal_orderNo = "";
                this.modal_coinType = "";
                this.modal_orderType = "";
                this.modal_tradeType = "";
                this.modal_currency = "";
                this.clear = null;
            },
            onCancel() {
                this.isModal = false;
                this.modal_date = "";
                this.modal_orderStatus = "";
                this.modal_orderNo = "";
                this.modal_coinType = "";
                this.modal_orderType = "";
                this.modal_tradeType = "";
                this.modal_currency = "";
            },
            // 자연수 체크
            onCheckNum() {
                if (!abUtils.isNaturalNumber(this.orderNo)) {
                    this.orderNo = "";
                }
            },
            // 칩 x버튼 눌렀을 시 삭제
            chipDelete (type) {
                if(type === 'date'){
                    this.date = '';
                }else if(type === 'orderStatus'){
                    this.orderStatus = '';
                }else if(type === 'modal_orderNo'){
                    this.modal_orderNo = '';
                }else if(type === 'modal_coinType'){
                    this.modal_coinType = '';
                }else if(type === 'modal_orderType'){
                    this.modal_orderType = '';
                }else if(type === 'modal_tradeType'){
                    this.modal_tradeType = '';
                }else if(type === 'modal_currency'){
                    this.modal_currency = '';
                }
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
    });
</script>

<style scoped>
    .close-icons {
        margin-top: 2px;
    }
    .chip-wrapper {
        padding-top: 6px;
    }

    .export-btn {
        width: 180px;
    }

    .order-filter {
        height: 40px;
        border: solid 1px #8d8d8d;
        min-width: 376px;
    }

    .card-modal {
        z-index: 2;
        position: absolute;
        background-color: #ffffff;
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        padding: 16px 8px 24px 8px;
        min-height: 200px;
    }

    .card-modal:after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 95%;
        margin-left: -8px;
        width: 0;
        height: 0;
        border-bottom: 8px solid #ffffff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;

    }

    /* filter card 가 mobile에선 width 100이므로
mobile에서만 추가 선언.*/
    .card-modal-mobile {
        width: 100%;
        left: 0%;
    }

    .filter-img {
        right: 7px;
        top: 7px;
    }

    .input {
        width: 100%;
    }

    .statusChip {
        height: 26px;
        border-radius: 2px;
        background-color: #9294a6;
        padding: 4px 8px 4px 8px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 6px;
    }

    .flex {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>