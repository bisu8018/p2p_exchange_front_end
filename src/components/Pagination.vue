<template>
    <div>
        <v-pagination v-model="currentPage" :length="pages" v-on:input="onChanged"></v-pagination>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../vuex/MainRepository";

    export default Vue.extend({
        name: 'Pagination',
        data: () => ({
            currentPage : 1,
        }),
        props :{
            size : {
                type: Number,
                default : 10
            },
            type :{
                type: String,
                default : ''
            },
        },
        created() {

            // MainRepository.TradeView.setTotalTradeView(this.token, this.adType, this.country, this.currency, this.amount, this.payment);
            //return MainRepository.TradeView.getTotalTradeView();
        },
        computed: {
            pages () {
                //return Math.ceil(MainRepository.Pagination.getTotalCount()/ this.size);
                // console.log("Make page:" + Math.ceil(MainRepository.TradeView.getTotalTradeView() / 10));
                //return Math.ceil(MainRepository.TradeView.getTotalTradeView()/ this.page);
            },
        },
        methods: {
            onChanged() {
            // console.log("pageChange");
            return MainRepository.Pagination.setPage(this.currentPage, this.size, this.type);
            }
        },
    });
</script>
<style>
</style>
