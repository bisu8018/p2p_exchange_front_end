<template>
    <div class="contentsWrapper" style="max-width: 1200px">
        <!-- 상단의 list filter -->
        <trade-center-filter></trade-center-filter>
        <div>
            <!-- mobile 일때 -->
            <div v-if="isMobile">
                <v-flex  v-for="user in dataInfo" :key="`i${user}`"  xs12 style="height: 180px;" >
                    <trade-list-item
                            :user="user"
                    ></trade-list-item>
                    <v-divider></v-divider>
                </v-flex>
            </div>
            <!-- Web 일때 -->
            <div v-else>

                <!-- chart의 title들 -->
                <!-- md 이상에서만 binding-->
                <v-layout mb-3>
                    <v-flex gridBox md3 text-md-left>Merchant(Volume | Trade rate)</v-flex>
                    <v-flex gridBox md2 text-md-left>Available</v-flex>
                    <v-flex gridBox md2 text-md-left>Limits</v-flex>
                    <v-flex gridBox md2 text-md-left>Price </v-flex>
                    <v-flex gridBox md2 text-md-left>Payment Method </v-flex>
                    <v-flex gridBox md1 text-md-right>Control</v-flex>

                </v-layout>
                <v-divider></v-divider>

                <!-- user item list들 10개씩 출력-->
                <v-flex v-for="(user,index) in dataInfo" :key="index" md12 >
                    <trade-list-item
                            :user ="user"
                    ></trade-list-item>
                    <v-divider></v-divider>
                </v-flex>
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
    .contentsWrapper{
        margin-left: auto;
        margin-right: auto;
    }
    .userList{
        display: flex;
        height: 90px;
    }
    .ctlButton{
        border-radius: 86px;
        color: white;
        height: 36px;
        width: 86px;
    }
</style>