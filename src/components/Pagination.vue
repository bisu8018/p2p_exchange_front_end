<template>
    <div>
        <v-pagination v-model="page" :length="pages" v-on:input="onChanged"></v-pagination>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../vuex/MainRepository";

    export default Vue.extend({
        name: 'Pagination',
        data: () => ({
            page : 0,
            adType : 'BUY',
            token : 'BTC', //현재 거래하고자 하는 coin
            country : 'ALL',
            currency : 'CNY',   //현재 사용하고자 하는 화폐단위
            amount : 0,
            payment : 'ALL'
        }),
        created() {
            //Get default Value
            this.token = MainRepository.TradeView.controller().getToken();
            this.adType = MainRepository.TradeView.controller().getAdType();
            this.country = MainRepository.SelectBox.controller().getCountry();
            this.currency = MainRepository.SelectBox.controller().getCurrency();
            this.amount = MainRepository.TradeView.controller().getLimitMin();
            this.payment = MainRepository.SelectBox.controller().getPayment();

            console.log('pagination data:' + this.token + this.adType + this.country + this.currency);
            console.log('pagination amount data:' + this.amount);
            MainRepository.TradeView.setTotalTradeView(this.token, this.adType, this.country, this.currency, this.amount, this.payment);
            //return MainRepository.TradeView.getTotalTradeView();
        },
        computed: {
            pages () {
                console.log("Make page:" + Math.ceil(MainRepository.TradeView.getTotalTradeView() / 10));
                return Math.ceil(MainRepository.TradeView.getTotalTradeView()/ 10);
            },
        },
        methods: {
            onChanged() {
            console.log("pageChange");
            let pageNumber : number = this.page - 1;
            return MainRepository.TradeView.setSelectPage(pageNumber);
            //MainRepository.TradeView.getSelectPage();
            }
        },
    });
</script>
<style>
</style>
