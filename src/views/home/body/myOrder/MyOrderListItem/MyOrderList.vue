<template>
  <div>
    <div v-if="isMobile" class="myorderlist-mobile-wrapper">
      <!-- name-->
      <v-layout>
        <v-flex xs7 text-xs-left color-darkgray>{{$str("OrderNumber")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue c-pointer text-white-hover @click="goTrade">
          {{orderlist.orderNo}}
        </v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray>{{$str("orderType")}}</v-flex>
        <v-flex xs5 text-xs-right>
          <span class="mr-2 color-green bold" v-if="orderlist.tradeType === 'sell'">
            {{$str("sell")}}
          </span>
          <span class="mr-2 color-orange-price bold" v-if="orderlist.tradeType === 'buy'">
            {{$str("buy")}}
          </span>
          <span class="mr-2">{{orderlist.coinCount}}</span>
          {{orderlist.cryptocurrency}}
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs7 text-xs-left color-darkgray>{{$str("amount")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.amount}} {{orderlist.currency}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray>{{$str("price")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.price}} {{orderlist.currency}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray>{{$str("time")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.registerDatetime}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray>{{$str("status")}}</v-flex>
        <v-flex xs5 text-xs-right>
          <v-layout justify-end align-center>
            <div class="sprite-img mr-2" :class="statusImg"></div>
            {{orderlist.status}}
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray>{{$str("counterparty")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue c-pointer text-white-hover @click="goUserPage()">
          {{orderlist.nickname}}
        </v-flex>
      </v-layout>
    </div>

    <!-- Web 일때-->
    <div class="myorderlist-web-wrapper" v-else>
      <v-layout pt-4 pb-4>
        <v-flex  md2 text-md-left color-blue c-pointer text-white-hover @click="goTrade">
          {{orderlist.orderNo}}
        </v-flex>
        <v-flex  md2 text-md-left>
          <span class="color-green bold mr-2" v-if="orderlist.tradeType === 'sell'">
                  {{$str("sell")}}
          </span>
          <span class=" color-orange-price bold mr-2" v-if="orderlist.tradeType === 'buy'">
                        {{$str("buy")}}
          </span>
          <span class="mr-2">{{orderlist.coinCount}}</span>
          <span>{{orderlist.cryptocurrency}}</span>
        </v-flex>
        <v-flex  md2 text-md-left>{{orderlist.amount}} {{orderlist.currency}}</v-flex>
        <v-flex  md1 text-md-left>{{orderlist.price}} {{orderlist.currency}}</v-flex>
        <v-flex  md3 text-md-left>{{transTime}}</v-flex>
        <v-flex  md2>
          <v-layout align-center>
            <div class="sprite-img mr-2" :class="statusImg"></div>
            <div>{{orderlist.status}}</div>
            <v-spacer></v-spacer>
            <span class="color-blue c-pointer text-white-hover" @click="goUserPage()">
              {{orderlist.nickname}}
            </span>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abUtils} from '@/common/utils';
    export default {
        name: "MyOrderList",
        props : {
            orderlist : {},
        },
        data: () => ({
            statusImg : 'ic',

        }),
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
            transTime(){
                let time = abUtils.isLocaleDateTime(this.orderlist.registerDatetime);
                return time;
            }

        },
        methods : {
            goUserPage(){
                let userpage = "/userpage?"+this.orderlist.merchantMemberNo;
                this.$router.push(userpage);
            },
            goTrade(){
                let tradePage;
                switch (this.orderlist.tradeType) {
                    case 'buy':
                        tradePage = "/buy?"+this.orderlist.orderNo
                        this.$router.push(tradePage);
                        break;

                    case 'sell':
                        tradePage = "/sell?"+this.orderlist.orderNo
                        this.$router.push(tradePage);
                        break;
                }
            }
        },
        mounted(){
            switch (this.orderlist.status) {
                case 'unpaid':
                    this.statusImg = 'ic-unpaid';
                    break;

                case 'cancelled':
                    this.statusImg = 'ic-cancel-sm';
                    break;

                case 'complete':
                    this.statusImg = 'ic-success-sm';
                    break;
            }

        },
    }
</script>

<style scoped>

  .myorderlist-mobile-wrapper {
    padding: 16px 4px;
  }

  .myorderlist-mobile-wrapper > .layout {
    height: 38px;
    align-items: center;
  }

  .myorderlist-web-wrapper > .layout{
    padding: 0 4px;
  }


</style>