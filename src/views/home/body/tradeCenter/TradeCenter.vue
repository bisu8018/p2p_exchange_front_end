<template>
    <div class="" >
        <!-- 상단의 list filter -->
        <trade-center-filter></trade-center-filter>
        <!--본 list들-->
        <div>
            <!-- mobile 일때 -->
            <div v-if="isMobile">
                <div  v-for="user in users" :key="`i${user}`" >
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
                <div v-for="(user,index) in users" :key="index" >
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
    import AXIOS from 'axios';
    import MainRepository from "../../../../vuex/MainRepository";
    import TradeListItem from "./tradeListItem/TradeListItem.vue"
    import TradeCenterFilter from './tradeListItem/TradeCenterFilter.vue';
    import Pagination from '@/components/Pagination.vue';


    export default Vue.extend({
        name: 'TradeCenter',
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
                },
                {
                    email: 'Dean',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Jack',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Jiny',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Jun',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Kay',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Kevin',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Max',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'BK',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Ryan',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'Tom',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
                {
                    email: 'AB',
                    volumeTotal: 119,
                    limitMax: 66.0,
                    price: 224,
                    adType: 44.0,
                },
            ],
        }),
        created() {
            console.log("Created");
            MainRepository.TradeView.setSelectPage(0);
            console.log(MainRepository.TradeView.setSelectPage(0));
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