<template>
    <div class="card-modal card-modal-mobile pr-3 pl-3 mt-4a my-order-content-class" v-if="onModal">

        <!--  start date  -->
        <div class="text-xs-left text-black mb-2">{{$str("start")}} {{$str("date")}}</div>
        <div class="mb-4">
            <date-picker :classname='startdateclass' v-on:date="onStartDate" :clear="clear"
                         v-on:switch="clear = 'on'"></date-picker>
        </div>

        <!--  end date  -->
        <div class="text-xs-left text-black mb-2">{{$str("end")}} {{$str("date")}}</div>
        <div class="mb-4">
            <date-picker :classname="enddateclass" v-on:date="onEndDate" :clear="clear"
                         v-on:switch="clear = 'on'"></date-picker>
        </div>

        <!--  주문 상태  -->
        <div class="text-xs-left text-black mb-2">{{$str("orderStatus")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'orderStatus'" :filterValue="orderStatus"
                                 v-on:orderStatus="setOrderStatus"></my-order-select-box>
        </div>

        <!--  주문 번호  -->
        <div class="text-xs-left text-black mb-2">{{$str("orderNo")}}</div>
        <div class="mb-4">
            <input type="text" class="input" :placeholder='$str("orderNoPlaceholder")' @keyup="onCheckNum()"
                   v-model="orderNo">
        </div>

        <!--  암호화폐 타입  -->
        <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrencyType")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'cryptocurrencyType'" :filterValue="cryptocurrencyType"
                                 v-on:cryptocurrencyType="setCryptocurrencyType"></my-order-select-box>
        </div>

        <!--  암호화폐 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrency")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :class="{'input-disabled2' : true}"
                                 v-if="!cryptocurrencyType"></my-order-select-box>
            <div v-else>
                <my-order-select-box :selectBoxType="'generalToken'" v-if="cryptocurrencyType === 'general'"
                                     @generalToken="selectToken"
                                     :filterValue="cryptocurrency"></my-order-select-box>
                <div v-else>
                    <my-order-select-box :selectBoxType="'customToken'"
                                         @customToken="selectToken" :filterValue="tokenNo"></my-order-select-box>
                </div>
            </div>
        </div>

        <!--  주문 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("orderType")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'orderType'" :filterValue="orderType"
                                 v-on:orderType="setOrderType"></my-order-select-box>
        </div>

        <!--  거래 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("buySell")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'tradeType'" :filterValue="tradeType"
                                 v-on:tradeType="setTradeType"></my-order-select-box>
        </div>

        <!--  화폐 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("currency")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'currency'" :filterValue="currency"
                                 v-on:currency="setCurrency"></my-order-select-box>
        </div>

        <!--   cancel, search 버튼  -->
        <div>
            <button class="btn-rounded-white text-white-hover h6" @click="onClear()">
                {{$str("clear")}}
            </button>
            <button class="btn-rounded-blue btn-blue-hoverhover h6 f-right" @click="onSearch()">
                {{$str("search")}}
            </button>
            <button class="btn-rounded-white text-white-hover h6 mr-3 f-right" @click="onCancel()">
                {{$str("cancel")}}
            </button>
        </div>
    </div>
</template>


<script>
    import MyOrderSelectBox from './MyOrderSelectBox.vue'
    import DatePicker from '@/components/DatePicker.vue';
    import {abUtils} from "@/common/utils";
    import Vue from 'vue';
    import MainRepository from "../../../../../../vuex/MainRepository";

    export default Vue.extend({
        name: "my-order-content",
        components: {
            MyOrderSelectBox, DatePicker
        },
        props: {
            'chipData': {},
            'onModal': {}
        },
        data: () => ({
            clear: 'on',

            startdateclass: 'startdateclass',
            enddateclass: 'enddateclass',

            start_date: "",
            end_date: "",
            orderStatus: "",
            orderNo: "",
            cryptocurrencyType: "",
            cryptocurrency: "",
            tokenNo: '',
            orderType: "",
            tradeType: "",
            currency: '',
        }),
        computed: {},
        created() {
            this.$nextTick(() => {
                this.init();
            });
        },
        mounted() {
            this.$eventBus.$emit('clickEvent', (event) => {
                this.hideOnClickOutside(event);
            });
        },
        beforeDestroy() {
            this.clearData();
            this.$eventBus.$off('clickEvent', (event) => {
            });
        },
        methods: {
            init() {
                this.start_date = this.chipData.start_date;
                this.end_date = this.chipData.end_date;
                this.orderStatus = this.chipData.orderStatus;
                this.orderNo = this.chipData.orderNo;
                this.cryptocurrencyType = this.chipData.cryptocurrencyType;
                this.cryptocurrency = this.chipData.cryptocurrency;
                this.tokenNo = this.chipData.tokenNo;
                this.orderType = this.chipData.orderType;
                this.tradeType = this.chipData.tradeType;
                this.currency = this.chipData.currency;
            },
            onStartDate(value) {
                this.start_date = value;
            },
            onEndDate(value) {
                this.end_date = value;
            },
            clearData() {
                this.start_date = "";
                this.end_date = "";
                this.orderStatus = "";
                this.orderNo = "";
                this.cryptocurrencyType = "";
                this.cryptocurrency = "";
                this.tokenNo = '';
                this.orderType = "";
                this.tradeType = "";
                this.currency = "";
            },
            setCryptocurrencyType(code) {
                this.cryptocurrencyType = code;
            },
            selectToken(tokenNo) {
                if (tokenNo) {
                    let _tokenName;
                    if (this.cryptocurrencyType === 'general') {
                        _tokenName = MainRepository.GeneralToken.controller().findGeneralToken(tokenNo, 'no').tokenName;
                    } else {
                        _tokenName = MainRepository.MyToken.controller().findCustomToken(tokenNo, 'no').tokenName;
                    }
                    this.cryptocurrency = _tokenName;
                    this.tokenNo = tokenNo;
                }
            },
            setTradeType(code) {
                this.tradeType = code;
            },
            setCurrency(code) {
                this.currency = code;
            },
            setOrderStatus(code) {
                this.orderStatus = code;
            },
            setOrderType(code) {
                this.orderType = code;
            },
            // 자연수 체크
            onCheckNum() {
                if (!abUtils.isNaturalNumber(this.orderNo)) {
                    this.orderNo = "";
                }
            },
            onClear() {
                this.clear = null;
                this.clearData();
            },
            onSearch() {
                let data = {
                    start_date: this.start_date,
                    end_date: this.end_date,
                    orderStatus: this.orderStatus,
                    orderNo: this.orderNo,
                    cryptocurrencyType: this.cryptocurrencyType,
                    cryptocurrency: this.cryptocurrency,
                    tokenNo: this.tokenNo,
                    orderType: this.orderType,
                    tradeType: this.tradeType,
                    currency: this.currency,
                };
                this.$emit('update', data);
                this.onCancel();
            },
            onCancel() {
                this.$emit('closeModal');
            },
            //영역 밖 클릭시 스크롤 업
            hideOnClickOutside(event) {
                if (!event.target.closest('.my-order-content-class')) {
                    this.onCancel();
                }
            },
        },
    })
</script>


<style scoped>
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

    .card-modal:before {
        content: '';
        position: absolute;
        border-style: solid;
        bottom: 100.2%;
        left: 95%;
        margin-left: -8px;
        width: 0;
        height: 0;
        border-width: 10px;
        border-bottom: 8px solid #ffffff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-color: transparent transparent #d8d8d8 transparent;
    }

    @media only screen and (max-width: 959px) {
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
            width: 100%;
            right: 0;
        }
    }

</style>