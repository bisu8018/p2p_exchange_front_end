<template>
    <v-layout row wrap>
        <v-flex pa-2 class="order-filter p-relative text-xs-left" md8>
            <span class="color-darkgray  ">{{$str("orderFilterPlaceholder")}}</span>
            <i class="material-icons p-absolute filter-img color-darkgray"
               @click.stop="isModal = !isModal">filter_list</i>

            <!--filter-->
            <div class="card-modal card-modal-mobile pr-3 pl-3" v-if="isModal">
                <div class="text-xs-left text-black mb-2">{{$str("date")}}</div>

                <!--달력-->
                <div class="mb-4">
                    <date-picker v-on:date="onDate" :clear="clear" ></date-picker>
                </div>

                <!--주문 상태-->
                <div class="text-xs-left text-black mb-2">{{$str("orderStatus")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="orderStatus" class="comp-selectbox h6">
                        <option v-for="status in orderStatusList" v-bind:value="status.code">{{status.status}}</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>

                <!--주문 번호-->
                <div class="text-xs-left text-black mb-2">{{$str("orderNo")}}</div>
                <div class="mb-4">
                    <input type="number" class="input" :placeholder='$str("orderNoPlaceholder")'>
                </div>

                <!--암호화폐 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("Coin")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="coinType" class="comp-selectbox h6">
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="USDT">USDT</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>

                <!--주문 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("orderType")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="orderType" class="comp-selectbox h6">
                        <option value="general">{{$str("general")}}</option>
                        <option value="block">{{$str("block")}}</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>

                <!--거래 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("tradeType")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="traderType" class="comp-selectbox h6">
                        <option value="buy">{{$str("buy")}}</option>
                        <option value="sell">{{$str("sell")}}</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>

                <!--화폐 종류-->
                <div class="text-xs-left text-black mb-2">{{$str("currency")}}</div>
                <div class="mb-4 p-relative">
                    <select v-model="currency" class="comp-selectbox h6">
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
                    <button class="btn-rounded-white text-white-hover h6 mr-3 f-right" @click="isModal = false">
                        {{$str("cancel")}}
                    </button>
                </div>
            </div>
        </v-flex>

        <!--데스크탑 환경에서만 표시 -->
        <v-flex md4 pl-4 pr-0 v-if="!isMobile">
            <button class="color-blue btn-white text-white-hover" @click='onCheck'>{{$str("Export")}}</button>
        </v-flex>


    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../vuex/MainRepository';
    import DatePicker from '@/components/DatePicker.vue';

    export default Vue.extend({
        name: "myOrder-filter",
        components: {
            DatePicker
        },
        data: () => ({
            isModal: false,
            menu: false,
            clear: null,
            date: "",
            currency: '',
            orderStatus: "",
            coinType: "",
            orderType: "",
            traderType: "",
            orderNo: "",
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
                this.date = value;
            },
            onSearch() {
                // search 누르면 뭐할지 여기에 기입.
            },
            onClear() {
                this.date = "";
                this.orderStatus = "";
                this.orderNo = "";
                this.coinType = "";
                this.orderType = "";
                this.traderType = "";
                this.currency = "";
            },
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
    });
</script>

<style scoped>
    .export-btn {
        border-radius: 3px;
        border: solid 1px #214ea1;
        width: 100%;
        height: 40px;
    }

    .order-filter {
        height: 40px;
        border: solid 1px #8d8d8d;
    }

    .card-modal {
        z-index: 2;
        position: absolute;
        background-color: #ffffff;
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        padding: 16px 8px 24px 8px;
        min-height: 200px;
        width: 75%;
        left: 25%;
        top: 54px;

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
</style>