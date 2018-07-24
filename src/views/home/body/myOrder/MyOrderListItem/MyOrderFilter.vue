<template>
    <v-layout row wrap>
        <v-flex pl-0 pr-4 class="orderFilter" md8 >
            <!--<span>placeholder</span>-->
            <v-icon  @click.stop="isModal = true">search</v-icon></v-flex>
        <v-flex md4 pl-4 pr-0 ><button class="exportBtn" @click='onCheck'>{{$str("Export")}}</button></v-flex>
        <v-layout class="cardModal">
            <div>
                <div v-if="isModal" >
                    <v-card width="370px">
                        <v-card-text>
                            test
                        </v-card-text>
                        <!--<v-card-text>-->
                            <!--<v-layout row wrap>-->
                                <!--<v-flex xs12 md4 text-md-right text-xs-left mb-2 >{{$str("country")}}</v-flex>-->
                                <!--&lt;!&ndash;country select box&ndash;&gt;-->
                                <!--<v-flex xs12 md8></v-flex>-->
                            <!--</v-layout>-->
                        <!--</v-card-text>-->
                        <!--&lt;!&ndash; cancel, search 버튼&ndash;&gt;-->
                        <!--<v-card-actions>-->
                            <!--<v-flex text-xs-right >-->
                                <!--<button class="" @click="isModal = false" >{{$str("cancel")}} </button>-->
                                <!--<button class="" @click="onSearch" >{{$str("search")}} </button>-->
                            <!--</v-flex>-->
                        <!--</v-card-actions>-->
                    </v-card>
                </div>
            </div>
        </v-layout>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../vuex/MainRepository';
    import SelectBox from '@/components/SelectBox.vue';
    import AXIOS from 'axios';
    export default Vue.extend({
        name: "MyOrderFilter",
        components: {
            SelectBox,
        },
        data: () => ({
            isAmout : true,
            isModal: false,
            country: '',
            currency: '',
            paymentMethod: '',
            amount : 0,
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
            tradeStatus : 'BUY',
            tradeCoin: 'BTC',

        }),
        methods : {
            setBuyInfo(item){
                this.tradeStatus = 'BUY';
                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();


                if(item =="current"){ //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지

                }
                else{
                    this.tradeCoin = item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            setSellInfo(item){
                this.tradeStatus = 'SELL';
                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();

                if(item =='current'){     //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지

                }
                else{
                    this.tradeCoin =item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            onCurrencyChange (){

            },
            onPaymentMethodChange (){

            },
            onAmountChange (){

            },
            onSearch(){
                // search 누르면 뭐할지 여기에 기입.
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();

                console.log("search country data:" + this.country);
                console.log("search currency data:" + this.currency);
                console.log("search amount data:" + this.amount);
                MainRepository.SelectBox.controller().setCountry(this.country);
                MainRepository.SelectBox.controller().setCurrency(this.currency);
                MainRepository.SelectBox.controller().setPayment(this.paymentMethod);
                MainRepository.TradeView.controller().setLimitMin(this.amount);

                MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                MainRepository.TradeView.setSelectPage(0);

                this.isModal = false; //modal 창 끄기.
            },
            removeAmount(){
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
    .exportBtn{
        border-radius: 3px;
        border: solid 1px #214ea1;
        width: 100%;
        height: 40px;
    }
    .exportBtnText {
        width: 47px;
        height: 20px;
        font-family: NotoSansCJKsc;
        font-size: 14px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #214ea1;
    }
    .orderFilter{
        height: 40px;
        border: solid 1px #8d8d8d;
    }
    .cardModal{
        z-index: 2;
        position: absolute;
    }
</style>