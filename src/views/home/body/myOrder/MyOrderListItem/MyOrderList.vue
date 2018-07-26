<template>
  <div>
    <div v-if="isMobile" >
      <!-- name-->
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("OrderNumber")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue>{{orderlist.orderNum}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("orderType")}}</v-flex>
        <v-flex xs5 text-xs-right>
          <span class="mr-4 color-green bold" v-if="orderlist.tradeType === 'sell'">
                  {{$str("sell")}}
                  </span>
          <span class="mr-4 color-orange-price bold" v-if="orderlist.tradeType === 'buy'">
                        {{$str("buy")}}
                      </span>
          {{orderlist.exType}}
        </v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("volumeText")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.exNum}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("TotalPrice")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.totalPrice}} {{orderlist.currency}}</v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("price")}}</v-flex>
        <v-flex xs5 text-xs-right>{{orderlist.price}} {{orderlist.currency}}</v-flex>
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
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("counterparty")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue>{{orderlist.partner}}</v-flex>
      </v-layout>
    </div>

    <!-- Web 일때-->
    <div v-else>
      <v-layout pt-4 pb-4>
        <v-flex  md1 text-md-left color-blue>{{orderlist.orderNum}}</v-flex>
        <v-flex  md2 text-md-left>
             <span class="mr-4 color-green bold" v-if="orderlist.tradeType === 'sell'">
                  {{$str("sell")}}
                  </span>
          <span class="mr-4 color-orange-price bold" v-if="orderlist.tradeType === 'buy'">
                        {{$str("buy")}}
                      </span>
          {{orderlist.exType}}
        </v-flex>
        <v-flex  md1 text-md-left>{{orderlist.exNum}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.totalPrice}}</v-flex>
        <v-flex  md1 text-md-left>{{orderlist.price}}</v-flex>
        <v-flex  md3 text-md-left>{{orderlist.time}}</v-flex>
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

  @media only screen and (min-width: 960px) {
    .flex {
      padding-left: 0px;
      padding-right: 0px;
    }
  }

</style>