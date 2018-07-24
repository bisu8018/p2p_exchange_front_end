<template>
    <div class="" >
        <!-- 상단의 list filter -->
        <trade-center-filter></trade-center-filter>
        <!--본 list들-->
        <div>
            <!-- mobile 일때 -->
            <div v-if="isMobile">
                <div  v-for="user in users"  >
                    <trade-list-item
                            :user="user"
                    ></trade-list-item>
                    <v-divider></v-divider>
                </div>
            </div>
            <!-- Web 일때 -->
            <div v-else>

                <!-- chart의 title들 -->
                <v-layout mb-3>
                    <v-flex  md3 text-md-left>{{$str("Merchant(Volume | Trade rate)")}}</v-flex>
                    <v-flex  md2 text-md-left>{{$str("Available")}}</v-flex>
                    <v-flex  md2 text-md-left>{{$str("limits")}}</v-flex>
                    <v-flex  md2 text-md-left>{{$str("price")}} </v-flex>
                    <v-flex  md2 text-md-left>{{$str("paymentMethod")}}</v-flex>
                    <v-flex  md1 text-md-right>{{$str("control")}}</v-flex>
                </v-layout>
                <v-divider></v-divider>

                <!-- user item list들 10개씩 출력-->
                <div v-for="user in users"  >
                    <trade-list-item
                            :user ="user"
                    ></trade-list-item>
                    <v-divider></v-divider>
                </div>
            </div>
            <!-- pagination -->
            <Pagination></Pagination>

        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import TradeListItem from "./tradeListItem/TradeListItem.vue"
    import TradeCenterFilter from './tradeListItem/TradeCenterFilter.vue';
    import Pagination from '@/components/Pagination.vue';


    export default Vue.extend({
        name: 'TradeCenter',
        props: ['message'],             // generalTrade와 blockTrade를 구분하기 위해
        components: {Pagination, TradeListItem, TradeCenterFilter},
        data: () => ({
            page : 1,
            users: [
                {
                    email: 'Charles',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                },
                {
                    email: 'Dean',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : false,
                    color : '#E05543',
                    rank : 2,
                },
                {
                    email: 'Jack',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : false,
                    color : '#E25422',
                    rank : 1,
                },
                {
                    email: 'Jiny',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#2799C9',
                    rank : 2,
                },
                {
                    email: 'Jun',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#B0D63E',
                    rank : 3,
                },
                {
                    email: 'Kay',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
                    '            If urgent, please message me on Telegram at +84963126446',
                    isLogin : true,
                    color : '#394B50',
                    rank : 1,
                },
                {
                    email: 'Kevin',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#BF4F79',
                    rank : 2,
                },
                {
                    email: 'Max',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 3,
                },
                {
                    email: 'BK',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                },
                {
                    email: 'Ryan',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                },
                {
                    email: 'Tom',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 1,
                },
                {
                    email: 'AB',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                    tradeRate: 99,
                    memo: '',
                    isLogin : true,
                    color : '#8869CA',
                    rank : 2,
                },
            ],
        }),
        created() {
            if(this.message == "general"){
                console.log("General Created");
                MainRepository.TradeView.setSelectPage(0);
                console.log(MainRepository.TradeView.setSelectPage(0));
            }else {
                console.log("Block Created");
                MainRepository.TradeView.setSelectPage(0);
                console.log(MainRepository.TradeView.setSelectPage(0));
            }

        },
        computed: {
            dataInfo(){
                console.log(MainRepository.TradeView.getSelectPage());
                return MainRepository.TradeView.getSelectPage();
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        methods: {

        }
    });
</script>

<style scoped>

</style>