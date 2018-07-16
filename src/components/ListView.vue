<template>
    <v-container pr-0 pl-0 style="max-width: 1178px">
        <!-- Web 일때 -->
        <v-flex v-if="$vuetify.breakpoint.mdAndUp"> <!--title들 md 이상에서만 binding-->
            <v-layout mb-3>
                <v-flex md3 text-md-left>{{$str("Merchant(Volume | Trade rate)")}}</v-flex>
                <v-flex md2 text-md-left>{{$str("volume")}}</v-flex>
                <v-flex md2 text-md-left>{{$str("limits")}}</v-flex>
                <v-flex md2 text-md-left>{{$str("price")}} </v-flex>
                <v-flex md2 text-md-left>{{$str("paymentMethod")}} </v-flex>
                <v-flex md1 text-md-right>{{$str("control")}}</v-flex>
            </v-layout>
            <hr class="v-divider">
            <v-flex v-for="user in users" :key="`i${user}`" md12>
                <v-layout row wrap style="height: 90px; " align-center>
                    <v-flex md3><td><v-avatar color="teal"  :size="30">
                        <span class="white--text headline">{{user.name[0]}}</span>
                    </v-avatar> {{user.name}} </td></v-flex>
                    <v-flex md2 text-md-left >{{user.coin}} BTC </v-flex>
                    <v-flex md2 text-md-left>{{user.merchantRange}} CNY </v-flex>
                    <v-flex md2 text-md-left>{{user.restMoney}} CNY </v-flex>
                    <v-flex md2>{{user.dealMode}} {{user.dealMode}} {{user.dealMode}} </v-flex>
                    <v-flex md1 text-md-center><v-btn class="Button button-2" style="color: white;" round  >{{$str("buy")}} ALLB</v-btn></v-flex>
                </v-layout>
                <hr class="v-divider">
            </v-flex>
        </v-flex>


        <!-- mobile 일때 -->
        <v-flex v-else v-for="user in users" :key="`i${user}`" xs12 style="height: 180px;" >
            <v-layout row wrap pb-2>
                <v-flex xs2  ><td class="text-xs-left">
                    <v-avatar color="teal"  :size="34">
                        <span class="white--text headline">{{user.name[0]}}</span>
                    </v-avatar></td></v-flex>
                <v-flex xs10 text-xs-left><span>{{user.name}}</span></v-flex>

                <v-flex xs3  offset-xs2 text-xs-left>Volume :</v-flex> <v-flex xs5 offset-xs1 text-xs-right> {{user.coin}} BTC </v-flex>
                <v-flex xs3  offset-xs2 text-xs-left>Limits :</v-flex> <v-flex xs5 offset-xs1 text-xs-right> {{user.merchantRange}} CNY </v-flex>
                <v-flex xs3  offset-xs2 text-xs-left>Price :</v-flex> <v-flex xs5 offset-xs1 text-xs-right> {{user.restMoney}} CNY </v-flex>

                <v-flex xs2 text-xs-right>{{user.dealMode}}</v-flex> <v-flex xs1 text-xs-right> {{user.dealMode}}</v-flex> <v-flex xs1 text-xs-right> {{user.dealMode}} </v-flex>
                <v-flex xs8 text-xs-right><v-btn class="Button button-2" style="color: white;" round  >{{$str("buy")}} ALLB</v-btn></v-flex>
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
        created () {

        },
        methods: {
        },
        computed: {
            widthVal(){
                return document.documentElement.clientWidth
            }
        }
    });
</script>
<style>
    .first{
        background-color: blueviolet;
    }
</style>
