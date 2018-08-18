<template>
  <div>
    <div v-if="isMobile" >
      <!-- name-->
      <v-layout>
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("OrderNumber")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue c-pointer text-white-hover @click="goTrade">
          {{orderlist.orderNum}}
        </v-flex>
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
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("amount")}}</v-flex>
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
        <v-flex xs5 text-xs-right>
          <v-layout justify-end align-center>
            <div class="sprite-img mr-2" :class="statusImg"></div>
            {{orderlist.status}}
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout >
        <v-flex xs7 text-xs-left color-darkgray mb-4>{{$str("counterparty")}}</v-flex>
        <v-flex xs5 text-xs-right color-blue c-pointer text-white-hover @click="goUserPage()">
          {{orderlist.partner}}
        </v-flex>
      </v-layout>
    </div>

    <!-- Web 일때-->
    <div v-else>
      <v-layout pt-4 pb-4>
        <v-flex  md2 text-md-left color-blue c-pointer text-white-hover @click="goTrade">
          {{orderlist.orderNum}}
        </v-flex>
        <v-flex  md1 text-md-left>
          <v-layout justify-space-between>
            <span class=" color-green bold" v-if="orderlist.tradeType === 'sell'">
                    {{$str("sell")}}
            </span>
            <span class=" color-orange-price bold" v-if="orderlist.tradeType === 'buy'">
                          {{$str("buy")}}
            </span>
            <span>{{orderlist.exType}}</span>
          </v-layout>
        </v-flex>
        <v-flex  md1 text-md-left>{{orderlist.exNum}}</v-flex>
        <v-flex  md2 text-md-left>{{orderlist.totalPrice}} {{orderlist.currency}}</v-flex>
        <v-flex  md1 text-md-left>{{orderlist.price}} {{orderlist.currency}}</v-flex>
        <v-flex  md3 text-md-left>{{orderlist.time}}</v-flex>
        <v-flex  md2>
          <v-layout align-center>
            <div class="sprite-img mr-2" :class="statusImg"></div>
            <div>{{orderlist.status}}</div>
            <v-spacer></v-spacer>
            <span class="color-blue c-pointer text-white-hover" @click="goUserPage()">
              {{orderlist.partner}}
            </span>
          </v-layout>
        </v-flex>
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
        data: () => ({
            statusImg : 'ic',

        }),
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
        },
        methods : {
            goUserPage(){
                this.$router.push("/userpage");
            },
            goTrade(){
                console.log(this.orderlist.tradeType);
                switch (this.orderlist.tradeType) {
                    case 'buy':
                        this.$router.push("/buy");
                        break;

                    case 'sell':
                        this.$router.push("/sell");
                        break;
                }
            }
        },
        mounted(){
            switch (this.orderlist.status) {
                case 'Unpaid':
                    this.statusImg = 'ic-unpaid'
                    break;

                case 'Cancelled':
                    this.statusImg = 'ic-cancel-sm'
                    break;

                case 'Complete':
                    this.statusImg = 'ic-success-sm'
                    break;
            }

        },
    }
</script>

<style scoped>



</style>