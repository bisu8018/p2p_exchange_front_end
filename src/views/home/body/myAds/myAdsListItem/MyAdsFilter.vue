<template>
    <v-layout row wrap>
        <v-flex xs12 md12 >
            <div class="order-filter p-relative f-right text-xs-left d-inline-table" v-bind:class="{'w-full' : isMobile}">
                <div class="color-darkgray  p-relative  ma-2 d-inline-block"
                      v-if="showPlaceholder">{{$str("adsFilterPlaceholder")}}</div>
                <i class="material-icons p-absolute filter-img color-darkgray c-pointer"
                   @click.stop="isModal = !isModal">filter_list</i>


            <!--chips-->
            <div class="mr-5 chip-wrapper d-inline-block">
                <h6 class="statusChip" v-if="showDateChip">
                    <v-layout align-center row fill-height >
                        {{start_date}} - {{end_date}}
                        <i class="h5 material-icons ml-2 close-icons" @click="chipDelete('date')">close</i>
                    </v-layout>
                </h6>
                <h6 class="statusChip" v-if="cryptocurrencyType != ''">
                    <v-layout align-center row fill-height>
                      {{$str(transTypeFullName(cryptocurrencyType))}}
                        <i class="h5 material-icons ml-2 close-icons" @click="chipDelete('cryptocurrencyType')">close</i>
                    </v-layout>
                </h6>
                <h6 class="statusChip" v-if="cryptocurrency != ''">
                    <v-layout align-center row fill-height>
                        {{cryptocurrency}}
                        <i class="h5 material-icons ml-2 close-icons" @click="chipDelete('cryptocurrency')">close</i>
                    </v-layout>
                </h6>
                <h6 class="statusChip" v-if="tradeType != ''">
                    <v-layout align-center row fill-height>
                        {{$str(tradeType)}}
                        <i class="h5 material-icons ml-2 close-icons" @click="chipDelete('tradeType')">close</i>
                    </v-layout>
                </h6>
                <h6 class="statusChip" v-if="adNo != ''">
                    <v-layout align-center row fill-height>
                        {{adNo}}
                        <i class="h5 material-icons ml-2 close-icons" @click="chipDelete('adNo')">close</i>
                    </v-layout>
                </h6>
                <h6 class="statusChip" v-if="adsType != ''">
                    <v-layout align-center row fill-height>
                        {{$str(adsType)}}
                        <i class="h5 material-icons ml-2 close-icons" @click="chipDelete('adsType')">close</i>
                    </v-layout>
                </h6>
                <h6 class="statusChip" v-if="currency != ''">
                    <v-layout align-center row fill-height>
                        {{currency}}
                        <i class="h5 material-icons ml-2 close-icons" @click="chipDelete('currency')">close</i>
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

                <!--암호화폐 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrencyType")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="modal_cryptocurrencyType" class="comp-selectbox h6">
                        <option value="general">{{$str("General Coin")}}</option>
                        <option value="custom">{{$str("Custom Token")}}</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>

                <!--암호화폐 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrency")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="modal_cryptocurrency" class="comp-selectbox h6">
                        <option value="bitcoin">BTC</option>
                        <option value="ethereum">ETH</option>
                        <option value="allb">AllB</option>
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

                <!--광고 번호-->
                <div class="text-xs-left text-black mb-2">{{$str("adsNo")}}</div>
                <div class="mb-4">
                    <input type="number" class="input" :placeholder='$str("adsNoPlaceholder")'>
                </div>


                <!--주문 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("adsType")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="modal_adsType" class="comp-selectbox h6">
                        <option value="general">{{$str("general")}}</option>
                        <option value="block">{{$str("block")}}</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>


                <!--화폐 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("currency")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="modal_currency" class="comp-selectbox h6">
                        <option v-for="currency in currencies" v-bind:value="currency.currency">{{currency.currency}}
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
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../vuex/MainRepository';
    import DatePicker from '@/components/DatePicker.vue';
    import {abUtils} from "@/common/utils";

    export default Vue.extend({
        name: "MyAdsFilter",
        components: {
            DatePicker
        },
        data: () => ({
            startdateclass : 'startdateclass',
            enddateclass : 'enddateclass',
            isModal: false,
            menu: false,
            clear: 'on',
            start_date: "",
            end_date: "",
            cryptocurrencyType: "",
            cryptocurrency: "",
            tradeType: "",
            adNo: "",
            adsType: "",
            currency: '',
            modal_start_date: "",
            modal_end_date: "",
            modal_cryptocurrencyType: "",
            modal_cryptocurrency: "",
            modal_tradeType: "",
            modal_adNo: "",
            modal_adsType: "",
            modal_currency: '',
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
                return (!this.showDateChip && this.adNo === '' && this.cryptocurrencyType === '' &&
                    this.cryptocurrency === '' && this.adsType === '' && this.tradeType === '' &&
                    this.currency === '')
            }
        },
        methods: {
            onStartDate(value) {
                this.modal_start_date = value;
            },
            onEndDate(value) {
                this.modal_end_date = value;
            },
            transTypeFullName(name){
                if(name ==='general'){
                    return 'General Coin'
                }
                else{
                    return 'Custom Token'
                }
            },
            onSearch() {
                MainRepository.MyAds.updatePage({
                    searchStartTime : this.modal_start_date,
                    searchEndTime : this.modal_end_date,
                    cryptocurrencyType : this.modal_cryptocurrencyType,
                    cryptocurrency : this.modal_cryptocurrency,
                    tradeType : this.modal_tradeType,
                    adNo : this.modal_adNo,
                    adsType : this.modal_adsType,
                    currency : this.modal_currency,
                });
                this.isModal = false;
                this.start_date = this.modal_start_date;
                this.end_date = this.modal_end_date;
                this.cryptocurrencyType = this.modal_cryptocurrencyType;
                this.cryptocurrency = this.modal_cryptocurrency;
                this.tradeType = this.modal_tradeType;
                this.adNo = this.modal_adNo;
                this.adsType = this.modal_adsType
                this.currency = this.modal_currency;

            },
            onClear() {
                this.modal_start_date = "";
                this.modal_end_date = "";
                this.modal_cryptocurrencyType = "";
                this.modal_cryptocurrency = "";
                this.modal_tradeType = "";
                this.modal_adNo = "";
                this.modal_adsType = "";
                this.modal_currency = "";
                this.clear = null;
            },
            onCancel() {
                this.isModal = false;
                this.modal_start_date = "";
                this.modal_end_date = "";
                this.modal_cryptocurrencyType = "";
                this.modal_cryptocurrency = "";
                this.modal_tradeType = "";
                this.modal_adNo = "";
                this.modal_adsType = "";
                this.modal_currency = "";
            },
            // 자연수 체크
            onCheckNum() {
                if (!abUtils.isNaturalNumber(this.adNo)) {
                    this.adNo = "";
                }
            },
            // 칩 x버튼 눌렀을 시 삭제
            chipDelete (type) {
                switch(type) {
                    case 'date':
                        this.start_date = '';
                        this.end_date = '';
                        this.modal_start_date = "";
                        this.modal_end_date = "";
                        break
                    case 'adNo':
                        this.adNo = '';
                        this.modal_adNo = '';
                        break;
                    case 'cryptocurrencyType':
                        this.cryptocurrencyType = '';
                        this.modal_cryptocurrencyType = '';
                        this.cryptocurrency = '';
                        this.modal_cryptocurrency = "";
                        break;
                    case 'cryptocurrency':
                        this.cryptocurrency = '';
                        this.modal_cryptocurrency = '';
                        break;
                    case 'adsType':
                        this.adsType = '';
                        this.modal_adsType = '';
                        break;
                    case 'tradeType':
                        this.tradeType = '';
                        this.modal_tradeType = '';
                        break;
                    case 'currency':
                        this.currency = '';
                        this.modal_currency = '';
                        break;
                }
                MainRepository.MyAds.updatePage({
                    searchStartTime : this.modal_start_date,
                    searchEndTime : this.modal_end_date,
                    cryptocurrencyType : this.modal_cryptocurrencyType,
                    cryptocurrency : this.modal_cryptocurrency,
                    tradeType : this.modal_tradeType,
                    adNo : this.modal_adNo,
                    adsType : this.modal_adsType,
                    currency : this.modal_currency,
                });
            }
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

    .order-filter {
        height: 40px;
        border: solid 1px #8d8d8d;
        min-width: 376px;
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        .order-filter {
            height: 40px;
            border: solid 1px #8d8d8d;
            min-width: unset;
        }
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
        cursor: pointer;
    }
    .statusChip:hover{
        opacity: 0.8;
    }

    .flex {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>