<template>
  <div>
    <div v-if="isMobile" class="myorderlist-mobile-wrapper">
      <!-- name-->
      <v-layout>
        <v-flex xs4 text-xs-left color-darkgray>{{$str("OrderNumber")}} : </v-flex>
        <v-flex xs8 text-xs-right color-blue-active @click="goTrade">
          {{orderlist.orderNo}}
        </v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left color-darkgray>{{$str("orderType")}} : </v-flex>
        <v-flex xs8 text-xs-right>
          <span class="mr-2  color-orange-price bold" v-if="orderlist.orderTradeType === 'buy'">
            {{$str("buy")}}
          </span>
          <span class="mr-2 color-green bold" v-if="orderlist.orderTradeType === 'sell'">
            {{$str("sell")}}
          </span>
          <span >{{ $fixed(orderlist.coinWithoutFeeCount, tokenName)}}</span>
          {{tokenName}}
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs4 text-xs-left color-darkgray>{{$str("amount")}} : </v-flex>
        <v-flex xs8 text-xs-right>{{toMoneyFormat(orderlist.amount)}} {{orderlist.currency}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left color-darkgray>{{$str("price")}} : </v-flex>
        <v-flex xs8 text-xs-right>{{toMoneyFormat($fixed(orderlist.price,orderlist.currency))}} {{orderlist.currency}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left color-darkgray>{{$str("time")}} :</v-flex>
        <v-flex xs8 text-xs-right>{{transTime(orderlist.registerDatetime)}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left color-darkgray>{{$str("status")}} :</v-flex>
        <v-flex xs8 text-xs-right>
          <v-layout justify-end align-center>
            <div class="mr-2" :class="orderlist.statusImg"></div>
            {{$str(orderlist.status)}}
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs4 text-xs-left color-darkgray>{{$str("counterparty")}} :</v-flex>
        <v-flex xs8 text-xs-right color-blue c-pointer text-white-hover @click="goUserPage()">
          {{orderlist.counterParty.nickname}}
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
          <span class=" color-orange-price bold mr-2" v-if="orderlist.orderTradeType === 'buy'">
                  {{$str("buy")}}
          </span>
          <span class="color-green bold mr-2" v-if="orderlist.orderTradeType === 'sell'">
                        {{$str("sell")}}
          </span>
          <span class="mr-2">{{ $fixed(orderlist.coinWithoutFeeCount, tokenName)}}</span>
          <span>{{tokenName}}</span>
        </v-flex>
        <v-flex  md2 text-md-left>{{toMoneyFormat(orderlist.amount)}} {{orderlist.currency}}</v-flex>
        <v-flex  md2 text-md-left>{{toMoneyFormat($fixed(orderlist.price,orderlist.currency))}} {{orderlist.currency}}</v-flex>
        <v-flex  md2 text-md-left>
          <span class="ml-3">{{transTime(orderlist.registerDatetime)}}</span>
        </v-flex>
        <v-flex md2>
          <v-layout align-center>
            <div class=" mr-2" :class="orderlist.statusImg"></div>
            <div>{{$str(orderlist.status)}}</div>
            <v-spacer></v-spacer>
            <span class="color-blue c-pointer text-white-hover" @click="goUserPage()">
              {{orderlist.counterParty.nickname}}
            </span>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abUtils} from '@/common/utils';

    export default Vue.extend({
        name: "MyOrderList",
        props : {
            orderlist : {},
        },
        data: () => ({
            statusImg : '',

        }),
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
            isGeneralCoin(){
                return this.orderlist.tokenName === ""
            },
            tokenName(){
                if(this.isGeneralCoin) {
                    return this.orderlist.cryptocurrency
                }else{
                    return this.orderlist.tokenName;
                }
            },

        },
        mounted(){
            switch (this.orderlist.status) {
                case 'unpaid':
                    this.statusImg = 'ic-unpaid sprite-img ';
                    break;

                case 'paid':
                    this.statusImg = 'ic-paid-sm sprite-img2';
                    break;

                case 'cancelled':
                    this.statusImg = 'ic-cancel-sm sprite-img ';
                    break;

                case 'complaining':
                    this.statusImg = 'ic-appeal-sm sprite-img2';
                    break;

                case 'complete':
                    this.statusImg = 'ic-success-sm sprite-img ';
                    break;

                case 'expired':
                    this.statusImg = 'ic-cancel-sm sprite-img ';
                    break;
            }
        },
        methods : {
            transTime(time){
                return abUtils.toTimeFormat(time);
            },
            goUserPage(){
                let userMember = '';
                if(MainRepository.MyInfo.getUserInfo().memberNo === this.orderlist.merchantMemberNo){
                    userMember = this.orderlist.customerMemberNo;
                }
                else{
                    userMember = this.orderlist.merchantMemberNo;
                }
                MainRepository.router().goUserPage(userMember);
            },
            goTrade(){
                switch (this.orderlist.orderTradeType) {
                    case 'buy':
                        MainRepository.router().goBuyOrSell(true, this.orderlist.orderNo);
                        break;

                    case 'sell':
                        MainRepository.router().goBuyOrSell(false, this.orderlist.orderNo);
                        break;
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
        },

    })
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