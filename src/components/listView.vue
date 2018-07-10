<template>
    <v-container>

        <!-- Web 일때 -->

        <v-container row wrap v-if="$vuetify.breakpoint.mdAndUp">
            <v-flex>   <!--title들 md 이상에서만 binding-->
                <v-layout>
                    <v-flex v-for="header in headers" :key="`i${header}`" >
                        <td class="text-xs-left">{{header.text}} </td>
                    </v-flex>
                </v-layout>
            </v-flex>


            <v-flex v-for="user in users" :key="`i${user}`" md12>
                <v-layout row wrap>
                    <v-flex md2><td><v-avatar color="teal"  :size="30">
                        <span class="white--text headline">{{user.name[0]}}</span>
                    </v-avatar> {{user.name}} </td></v-flex>
                    <v-flex md2 >{{user.coin}} BTC </v-flex>
                    <v-flex md2 text-md-center>{{user.merchantRange}} CNY </v-flex>
                    <v-flex md2 text-md-center>{{user.restMoney}} CNY </v-flex>
                    <v-flex md2>{{user.dealMode}} {{user.dealMode}} {{user.dealMode}} </v-flex>
                    <v-flex md2 text-md-center><v-btn color="primary" round class="tradeBtn">Trade</v-btn></v-flex>

                </v-layout>
            </v-flex>
        </v-container>


        <!-- mobile 일때 -->
        <v-flex v-else v-for="user in users" :key="`i${user}`" xs12>
            <v-layout row wrap>
                <v-flex xs10  ><td class="text-xs-left">
                    <v-avatar color="teal"  :size="30">
                        <span class="white--text headline">{{user.name[0]}}</span>
                    </v-avatar> {{user.name}}
                </td></v-flex>
                <v-flex xs10  text-xs-left>Volume: {{user.coin}} BTC </v-flex>
                <v-flex xs10 text-xs-left>Limits: {{user.merchantRange}} CNY </v-flex>
                <v-flex xs10 text-xs-left>Price: {{user.restMoney}} CNY </v-flex>
                <v-flex xs6 text-xs-left>{{user.dealMode}} {{user.dealMode}} {{user.dealMode}} </v-flex>
                <v-flex xs5 text-xs-right><v-btn color="primary" round class="tradeBtn">Trade</v-btn></v-flex>
            </v-layout>
            <hr class="v-divider">
        </v-flex>


    </v-container>

    <!--title들 md 이상에서만 binding-->
    <!--v-data-table  :headers="headers" :items="desserts" hide-actions class="elevation-1">
      <v-layout row wrap>
        <v-flex v-show="$vuetify.breakpoint.mdAndUp" >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.volume }}</td>
            <td class="text-xs-right">{{ props.item.limits }}</td>
            <td class="text-xs-right">{{ props.item.price }}</td>
            <td class="text-xs-right">{{ props.item.paymentMethod }}</td>
            <td class="text-xs-right">{{ props.item.control }}</td>
          </template>
        </v-flex>
      </v-layout>

      <template slot="no-data">
        <v-alert :value="true" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table-->


</template>

<script lang="ts">
    import Vue from 'vue';
    import AXIOS from 'axios';
    import MainRepository from '@/vuex/MainRepository.ts';
    import TradeService from '@/service/trade/TradeService';

    export default Vue.extend({
        name: 'listView',
        data: () => ({
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
                    merchantRange: 6.0,
                    restMoney: 24,
                    dealMode: 4.0,
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
        methods: {
            onReceive() {
                //receive list data
                TradeService.listView.receiveTradeData({

                }, function(response){
                    console.log(response);
                })
            },
        },
        computed: {

        }
    });
</script>
<style>
    .first{
        background-color: blueviolet;
    }
</style>
