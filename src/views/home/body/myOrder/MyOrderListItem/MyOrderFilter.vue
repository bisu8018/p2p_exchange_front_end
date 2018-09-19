<template>
    <v-layout row wrap>
        <div :class="{'layout_dim' : isModal }" @click="onOutsideClick"></div>
        <v-flex md8 xs12 pr-0 pl-0>
            <div class="order-filter p-relative f-right text-xs-left d-inline-table" v-bind:class="{'w-full' : isMobile}">
                <div class="color-darkgray  p-relative  ma-2 d-inline-block"
                      v-if="showPlaceholder">
                  {{$str("orderFilterPlaceholder")}}
                </div>
                <i class="material-icons p-absolute filter-img color-darkgray c-pointer"
                   @click.stop="isModal = !isModal">filter_list</i>

                <!--chips-->
                <div class="mr-5 chip-wrapper d-inline-block">
                    <h6 class="statusChip" v-if="showDateChip">
                        <v-layout align-center row fill-height >
                            {{start_date}} - {{end_date}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('date')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="orderStatus != ''">
                        <v-layout align-center row fill-height>
                            {{$str(orderStatus)}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderStatus')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="orderNo != ''">
                        <v-layout align-center row fill-height>
                            {{orderNo}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderNo')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="cryptocurrencyType != ''">
                        <v-layout align-center row fill-height>
                            {{$str(cryptocurrencyType)}}
                            <span v-if="cryptocurrency != ''">: {{cryptocurrency}}</span>
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('cryptocurrencyType')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="orderType != ''">
                        <v-layout align-center row fill-height>
                            {{$str(orderType)}}
                            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderType')">close</i>
                        </v-layout>
                    </h6>
                    <h6 class="statusChip" v-if="tradeType != ''">
                        <v-layout align-center row fill-height>
                            {{$str(tradeType)}}
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
                    <!--start date-->
                    <div class="text-xs-left text-black mb-2">{{$str("start")}} {{$str("date")}}</div>
                    <div class="mb-4">
                        <date-picker :classname = 'startdateclass' v-on:date="onStartDate" :clear="clear" v-on:switch="clear = 'on'"></date-picker>
                    </div>

                    <!--end date-->
                    <div class="text-xs-left text-black mb-2">{{$str("end")}} {{$str("date")}}</div>
                    <div class="mb-4">
                        <date-picker :classname = "enddateclass" v-on:date="onEndDate" :clear="clear" v-on:switch="clear = 'on'"></date-picker>
                    </div>

                    <!--주문 상태-->
                    <div class="text-xs-left text-black mb-2">{{$str("orderStatus")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_orderStatus" class="comp-selectbox h6">
                            <option v-for="status in orderStatusList" v-bind:value="status.code">{{status.status}}
                            </option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>

                    <!--주문 번호-->
                    <div class="text-xs-left text-black mb-2">{{$str("orderNo")}}</div>
                    <div class="mb-4">
                        <input type="text" class="input" :placeholder='$str("orderNoPlaceholder")' @keyup="onCheckNum"
                               v-model="modal_orderNo">
                    </div>

                    <!--암호화폐 타입-->
                    <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrencyType")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_cryptocurrencyType" class="comp-selectbox h6">
                            <option value="general">{{$str("General Coin")}}</option>
                            <option value="custom">{{$str("Custom Token")}}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>

                    <!--암호화폐 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrency")}}</div>
                    <div class="mb-4 p-relative">
                        <select  v-if="modal_cryptocurrencyType === 'general'"
                                 class="comp-selectbox h6" v-model="modal_cryptocurrency">
                            <option value="bitcoin">BTC</option>
                            <option value="ethereum">ETH</option>
                            <option value="allb">AllB</option>
                        </select>
                        <select-box v-else :selectBoxType="'customToken'"
                                    @customToken="selectCustomToken"
                                    :class="{'input-disabled2' : (modal_cryptocurrencyType === '')}">
                        </select-box>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>

                    <!--주문 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("orderType")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_orderType" class="comp-selectbox h6">
                            <option value="general">{{$str("general")}}</option>
                            <option value="block">{{$str("block")}}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>

                    <!--거래 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("buySell")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_tradeType" class="comp-selectbox h6">
                            <option value="buy">{{$str("buy")}}</option>
                            <option value="sell">{{$str("sell")}}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>

                    <!--화폐 종류-->
                    <div class="text-xs-left text-black mb-2">{{$str("currency")}}</div>
                    <div class="mb-4 p-relative">
                        <select v-model="modal_currency" class="comp-selectbox h6">
                            <option v-for="currency in currencies" v-bind:value="currency.currency">
                                {{currency.currency}}
                            </option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
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
        <v-flex md4 pl-4 pr-0 v-if="!isMobile">
            <div class="btn-white align-center " @click="showDownloadDialog">
                <i class="material-icons md-24 export-icon">save_alt</i>
                {{$str("Export")}}
            </div>
        </v-flex>
        <my-order-download-dialog></my-order-download-dialog>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../vuex/MainRepository';
    import SelectBox from '@/components/SelectBox.vue';
    import DatePicker from '@/components/DatePicker.vue';
    import {abUtils} from "@/common/utils";
    import MyOrderDownloadDialog from './dialog/MyOrderDownloadDialog'


    export default Vue.extend({
        name: "myOrder-filter",
        components: {
            DatePicker, MyOrderDownloadDialog, SelectBox
        },
        data: () => ({
            startdateclass : 'startdateclass',
            enddateclass : 'enddateclass',
            isModal: false,
            menu: false,
            clear: 'on',
            start_date: "",
            end_date: "",
            orderStatus: "",
            orderNo: "",
            cryptocurrencyType: "",
            cryptocurrency: "",
            orderType: "",
            tradeType: "",
            currency: '',
            modal_start_date: "",
            modal_end_date: "",
            modal_orderStatus: "",
            modal_orderNo: "",
            modal_cryptocurrencyType: "",
            modal_cryptocurrency: "",
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
            customTokenNo : '',

        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            showDateChip(){
                return (this.start_date !== undefined && this.start_date !== "")
                    &&(this.end_date !== undefined && this.end_date !== "");
            },
            showPlaceholder(){
                return  (!this.showDateChip && this.orderStatus === '' && this.orderNo === '' &&
                    this.cryptocurrency === ''&& this.cryptocurrencyType === '' &&
                    this.orderType === '' &&  this.tradeType === '' && this.currency === '')
            }
        },
        methods: {
            onStartDate(value) {
                this.modal_start_date = value;
            },
            onEndDate(value) {
                this.modal_end_date = value;
            },
            selectCustomToken(customToken) {
                let self = this
                if(customToken !== undefined){
                    self.modal_cryptocurrency = MainRepository.MyToken.controller().findCustomToken(customToken, 'no').tokenName
                }
            },
            onSearch() {

                MainRepository.MyOrder.updatePage({
                        searchStartTime : this.modal_start_date,
                        searchEndTime : this.modal_end_date,
                        status : this.modal_orderStatus,
                        orderNo : this.modal_orderNo,
                        cryptocurrencyType : this.modal_cryptocurrencyType,
                        cryptocurrency : this.modal_cryptocurrency,
                        orderType : this.modal_orderType,
                        tradeType : this.modal_tradeType,
                        currency : this.modal_currency,
                   });
                this.start_date = this.modal_start_date;
                this.end_date = this.modal_end_date;
                this.orderStatus = this.modal_orderStatus;
                this.orderNo = this.modal_orderNo;
                this.cryptocurrencyType = this.transTypeFullName(this.modal_cryptocurrencyType);
                this.cryptocurrency = this.transCryptocurrencyName(this.modal_cryptocurrency);
                this.orderType = this.modal_orderType;
                this.tradeType = this.modal_tradeType;
                this.currency = this.modal_currency;
                this.isModal = false;
            },
            onClear() {
                this.modal_start_date = "";
                this.modal_end_date = "";
                this.modal_orderStatus = "";
                this.modal_orderNo = "";
                this.modal_cryptocurrencyType = "";
                this.modal_cryptocurrency = "";
                this.modal_orderType = "";
                this.modal_tradeType = "";
                this.modal_currency = "";
                this.clear = null;
            },
            onCancel() {
                this.isModal = false;
                this.modal_start_date = "";
                this.modal_end_date = "";
                this.modal_orderStatus = "";
                this.modal_orderNo = "";
                this.modal_cryptocurrencyType = "";
                this.modal_cryptocurrency = "";
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
                switch(type){
                    case 'date':
                        this.start_date = '';
                        this.end_date = '';
                        this.modal_start_date = "";
                        this.modal_end_date = "";
                        break;
                    case 'orderStatus':
                        this.orderStatus = '';
                        this.modal_orderStatus = "";
                        break;
                    case 'orderNo':
                        this.orderNo = '';
                        this.modal_orderNo = "";
                        break;
                    case 'cryptocurrencyType':
                        this.cryptocurrencyType = '';
                        this.modal_cryptocurrencyType = "";
                        this.cryptocurrency = '';
                        this.modal_cryptocurrency = "";
                        break;
                    case 'orderType':
                        this.orderType = '';
                        this.modal_orderType = "";
                        break;
                    case 'tradeType':
                        this.tradeType = '';
                        this.modal_tradeType = "";
                        break;
                    case 'currency':
                        this.currency = '';
                        this.modal_currency = "";
                        break;
                }
                MainRepository.MyOrder.updatePage({
                    searchStartTime : this.modal_start_date,
                    searchEndTime : this.modal_end_date,
                    status : this.modal_orderStatus,
                    orderNo : this.modal_orderNo,
                    cryptocurrencyType : this.modal_cryptocurrencyType,
                    cryptocurrency : this.modal_cryptocurrency,
                    orderType : this.modal_orderType,
                    tradeType : this.modal_tradeType,
                    currency : this.modal_currency,
                });
            },
            showDownloadDialog(){
                this.$eventBus.$emit('showMyOrderDownloadDialog');
            },
            myOrderDownload(){
                MainRepository.MyOrder.getMyOrderDownload();
            },
            transTypeFullName(name){
                if(name ==='general'){
                    return 'General Coin'
                }
                else if(name ==='custom'){
                    return 'Custom Token'
                }
                else{
                    return ''
                }
            },
            transCryptocurrencyName(name){
                switch (name) {
                    case 'bitcoin':
                        return 'BTC'

                    case 'ethereum':
                        return 'ETH'
                    case 'allb':
                        return 'AllB'
                    default:
                        return name
                }
            },
            onOutsideClick() {
                this.isModal = false;
            },
        },

    });
</script>

<style scoped>
    @media only screen and (max-width: 959px) {
        .order-filter {
            height: 40px;
            border: solid 1px #8d8d8d;
            min-width: unset;
        }
        .card-modal {
            z-index: 2;
            position: absolute;
            background-color: #ffffff;
            box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
            padding: 16px 8px 24px 8px;
            min-height: 200px;
            width: 100%;
            left: 0;
        }
    }
    /* 웹에서 */
    @media only screen and (min-width: 960px) {
        .card-modal {
            z-index: 2;
            position: absolute;
            background-color: #ffffff;
            box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
            padding: 16px 8px 24px 8px;
            min-height: 200px;
            width: 75%;
            right: 0;
        }
        .export-icon{
            width: 18px;
            margin-right: 16px;
        }
        .align-center{
            display: flex;
            align-content: center;
            justify-content: center;
            cursor: pointer;
        }
    }
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
        border-radius: 2px;
        width: 100%;
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
    .card-modal:before{
        content: '';
        position: absolute;
        border-style: solid;
        bottom: 100.2%;
        left: 95%;
        margin-left: -8px;
        width: 0; height: 0;
        border-width: 10px;
        border-bottom: 8px solid  #ffffff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-color: transparent transparent #d8d8d8 transparent ;
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
        cursor: pointer;
    }
    .statusChip:hover{
        opacity: 0.8;
    }
    .layout_dim {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;
    }

</style>
