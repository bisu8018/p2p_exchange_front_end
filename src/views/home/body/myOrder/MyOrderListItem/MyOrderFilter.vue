<template>
    <v-layout row wrap>
        <v-flex pa-2 class="order-filter relative text-xs-left" md8>
            <span class="text-darkgray  ">{{$str("orderFilterPlaceholder")}}</span>
            <img src="../../../../../assets/img/searchBtn.png"  class="absolute filter-img" @click.stop="isModal = !isModal">
            <!--filter-->
            <div class="card-modal card-modal-mobile pr-3 pl-3"  v-if="isModal">
                <div class="text-xs-left text-black mb-2">{{$str("date")}}</div>
                <!--country select box-->
                <div class="mb-4">
                    <date-picker v-on:date="onDate"></date-picker>
                </div>
                <!-- cancel, search 버튼-->
                <v-flex text-xs-right>
                    <button class="common-rounded-flat-button common-text-hover" @click="isModal = false" >{{$str("cancel")}} </button>
                    <button class="common-rounded-button common-btn-hover" @click="onSearch" >{{$str("search")}} </button>
                </v-flex>
            </div>
        </v-flex>

        <!--데스크탑 환경에서만 표시 -->
        <v-flex md4 pl-4 pr-0 v-if="!isMobile">
            <button class="export-btn" @click='onCheck'>{{$str("Export")}}</button>
        </v-flex>


    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../vuex/MainRepository';
    import SelectBox from '@/components/SelectBox.vue';
    import DatePicker from '@/components/DatePicker.vue';

    export default Vue.extend({
        name: "myOrder-filter",
        components: {
            SelectBox, DatePicker
        },
        data: () => ({
            isModal: false,
            menu: false,
            date : null,
            currency: '',
            paymentMethod: '',
            amount: 0,
            items: [
                {
                    text: 'BTC',
                    disabled: false
                },
                {
                    text: 'ETH',
                    disabled: false
                },
                {
                    text: 'USDT',
                    disabled: false
                }
            ],
            tradeStatus: 'BUY',
            tradeCoin: 'BTC',

        }),
        methods: {
            onDate(value) {
                this.date = value;
            },
            setBuyInfo(item) {
                this.tradeStatus = 'BUY';
                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();


                if (item == "current") { //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지

                }
                else {
                    this.tradeCoin = item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            setSellInfo(item) {
                this.tradeStatus = 'SELL';
                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();

                if (item == 'current') {     //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지

                }
                else {
                    this.tradeCoin = item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            onCurrencyChange() {

            },
            onPaymentMethodChange() {

            },
            onAmountChange() {

            },
            onSearch() {
                // search 누르면 뭐할지 여기에 기입.
            },
            removeAmount() {
                location.reload();      // 새로고침으로 해놨는데, vuex도입시 수정할것.
                this.amount = 0;
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

    .card-modal{
        z-index: 2;
        position: absolute;
        background-color: #ffffff;
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        padding: 16px 8px 24px 8px;
        height: 433px;
        width: 75%;
        left: 25%;
        top: 54px;

    }
    .card-modal:after{
        content: '';
        position: absolute;
        bottom: 100%;
        left: 95%;
        margin-left: -8px;
        width: 0; height: 0;
        border-bottom: 8px solid  #ffffff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;

    }

    /* filter card 가 mobile에선 width 100이므로
mobile에서만 추가 선언.*/
    .card-modal-mobile{
        width: 100%;
        left: 0%;
    }

    .filter-img {
        right: 11px;
        top: 13px;
    }

    .card-parent {
        position: absolute;;
        width: 100%;
    }
</style>