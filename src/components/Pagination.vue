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
        }),
        created() {
            console.log("Created Page Number:" + MainRepository.TradeView.setTotalTradeView());
            MainRepository.TradeView.setTotalTradeView();
        },
        computed: {
            pages () {
                console.log("Make page:" + Math.ceil(MainRepository.TradeView.getTotalTradeView().length / 10));
                return Math.ceil(MainRepository.TradeView.getTotalTradeView().length / 10);
            },
        },
        methods: {
            onChanged() {
            console.log("pageChange");
            let pageNumber : number = this.page - 1;
            return MainRepository.TradeView.setSelectPage(pageNumber);
        }
        },
    });
</script>
<style>
</style>
