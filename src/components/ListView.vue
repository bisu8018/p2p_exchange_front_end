<template>
    <div>
        <!-- Web 일때 -->
        <div v-if="$vuetify.breakpoint.mdAndUp">

            <!-- chart의 title들 -->
            <!-- md 이상에서만 binding-->
            <div class="div-gutter mb-3" style=" display: flex;">
                <v-flex md3 text-md-left>Merchant(Volume | Trade rate)</v-flex>
                <v-flex md2 text-md-left>Volume</v-flex>
                <v-flex md2 text-md-left>Limits</v-flex>
                <v-flex md2 text-md-left>Price </v-flex>
                <v-flex md2 text-md-left>Payment Method </v-flex>
                <v-flex md1 text-md-right>Control</v-flex>
            </div>


            <v-divider></v-divider>
            <!-- 본 페이지 내용들 -->
            <v-flex v-for="user in users" :key="`i${user}`" md12 >
                <div  class="userList pt-4" >
                    <v-flex md3><td><v-avatar color="teal"  :size="30">
                        <span class="white&#45;&#45;text headline">{{user.name[0]}}</span>
                    </v-avatar> {{user.name}} </td></v-flex>
                    <v-flex md2 text-md-left >{{user.volumeTotal}} BTC </v-flex>
                    <v-flex md2 text-md-left>{{user.limitMax}} CNY </v-flex>
                    <v-flex md2 text-md-left>{{user.price}} CNY </v-flex>
                    <v-flex md2>{{user.dealMode}} {{user.dealMode}} {{user.dealMode}} </v-flex>
                    <v-flex md1 text-md-center><button class="ctlButton Button btnHover">{{$str("buy")}} BTC</button></v-flex>
                </div>
                <v-divider></v-divider>
            </v-flex>
        </div>


        <!-- mobile 일때 -->
        <v-flex v-else v-for="user in users" :key="`i${user}`" xs12 style="height: 180px;" >
            <div style="" class="pb-2">
                <div class="div-gutter">
                <v-flex xs2  ><td class="text-xs-left">
                    <v-avatar color="teal"  :size="34">
                        <span class="white--text headline">{{user.name[0]}}</span>
                    </v-avatar></td></v-flex>
                <v-flex xs10 text-xs-left>{{user.name}}</v-flex>
                </div>
                <div class="div-gutter">
                    <v-flex xs3  offset-xs2 text-xs-left>Volume :</v-flex>
                    <v-flex xs5 offset-xs1 text-xs-right> {{user.volumeTotal}} BTC </v-flex>
                </div>
                <div class="div-gutter">
                    <v-flex xs3  offset-xs2 text-xs-left>Limits :</v-flex>
                    <v-flex xs5 offset-xs1 text-xs-right> {{user.limitMax}} CNY </v-flex>
                </div>
                <div class="div-gutter">
                    <v-flex xs3  offset-xs2 text-xs-left>Price :</v-flex>
                    <v-flex xs5 offset-xs1 text-xs-right> {{user.price}} CNY </v-flex>
                </div>

                <div class="div-gutter">
                    <v-flex xs2 text-xs-right>{{user.dealMode}}</v-flex>
                    <v-flex xs1 text-xs-right> {{user.dealMode}}</v-flex>
                    <v-flex xs1 text-xs-right> {{user.dealMode}} </v-flex>

                    <v-flex xs8 text-xs-right><button class="ctlButton Button btnHover">{{$str("buy")}} BTC</button></v-flex>
                </div>
            </div>
            <v-divider></v-divider>
        </v-flex>
        <v-pagination v-model="page" :length="pages" ></v-pagination>

    </div>


</template>

<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../vuex/MainRepository";

    export default Vue.extend({
        name: 'listView',
        data: () => ({

            page : 1,
            headers: [
                {
                    text: 'Merchant(Volume | Trade rate)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Volume', value: 'volume' },
                { text: 'Limits', value: 'limits' },
                { text: 'Price', value: 'price' },
                { text: 'Payment Method', value: 'paymentMethod' },
                { text: 'Control', align: 'right', value: 'control' }
            ],
            users: [
                {
                    name: 'Charles',
                    coin: 119,
                    merchantRange: 66.0,
                    restMoney: 224,
                    dealMode: 44.0,
                },
                {
                    name: 'Dean',
                    coin: 139,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Jack',
                    coin: 129,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Jiny',
                    coin: 149,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Jun',
                    coin: 109,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Kay',
                    coin: 99,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Kevin',
                    coin: 152,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Max',
                    coin: 134,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'BK',
                    coin: 129,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Ryan',
                    coin: 209,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'Tom',
                    coin: 119,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
                {
                    name: 'AB',
                    coin: 159,
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
                },
            ],


        }),
        created() {
            console.log("Created");
            MainRepository.TradeView.setTradeView();
            console.log(MainRepository.TradeView.setTradeView());
        },
        mounted() {

        },
        computed: {
            dataInfo(){
                 console.log(MainRepository.TradeView.getTradeView());
                 return MainRepository.TradeView.getTradeView();
            },
            pages () {
                //return 전체페이지수는 몇개인지.
                return Math.ceil(this.users.length / 10)
            },
        },
        methods: {
            printLog(){


            },
            // dataTradeInfo() {
            //     MainRepository.TradeView.setTradeView();
            // },
            // testTradeInfo() {
            //     return MainRepository.TradeView.getTradeView();
            // }
        },

    });
</script>
<style>
    .ctlButton{
        border-radius: 86px;
        color: white;
        height: 36px;
        width: 86px;
    }
    .userList{
        display: flex;
        height: 90px;
    }
</style>
