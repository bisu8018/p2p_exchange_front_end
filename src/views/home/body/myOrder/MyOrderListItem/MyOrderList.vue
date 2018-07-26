<template>
  <div>
    <div v-if="isMobile" >
      <!-- name-->
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("OrderNumber")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue>{{orderlist.orderNum}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("TransactionType")}}</v-flex>
        <v-flex xs5 text-xs-right><span class="mr-4 color-orange-price bold">{{orderlist.tradeType === "sell"? $str("sell") : $str("buy")}}</span>{{orderlist.exType}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("transactionCount")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.exNum}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("TotalPrice")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.totalPrice}} {{orderlist.currency}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("unitPrice")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.unitPrice}} {{orderlist.currency}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("time")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.time}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("status")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.status}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("TradingPartners")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue>{{orderlist.partner}}</v-flex>
      </v-layout>
    </div>
    <div v-else>
      <v-layout userList pt-4 >
        <v-flex  md1 text-md-left>{{orderlist.orderNum}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.exType}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.exNum}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.totalPrice}}</v-flex>
        <v-flex  md1 text-md-left>{{orderlist.unitPrice}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.time}}</v-flex>
        <v-flex  md1 text-md-left>{{orderlist.status}}</v-flex>
        <v-flex  md1 text-md-right>{{orderlist.partner}}</v-flex>

      </v-layout>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "MyOrderList",
        props : {
            orderlist : {},
        },
        methods : {

        },
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
        }
    }
</script>

<style scoped>

</style>