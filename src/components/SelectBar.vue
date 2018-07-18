<template>
  <div>
    <!-- mobile 일때 -->
    <v-flex v-if="isMobile">
      <!-- buy sell 버튼 -->
      <div>
        <div class="mobileBuyBtn" >
          <span class="mobileBtnText">Buy</span>
        </div>
        <div class="mobileSellBtn" >
          <span class="mobileBtnTextClicked" > Sell</span>
        </div>
      </div>

      <!-- BTC ALLB ETH  버튼 -->
      <v-layout row wrap justify-center style="font-size: 16px" mt-4 mb-4>
        <v-flex xs1><v-icon>keyboard_arrow_left</v-icon></v-flex>
        <v-flex xs3 v-for="item in items" key="itemKey2" @click="setBuyInfo(item.text) "  >
          {{ item.text }}
        </v-flex>
        <v-flex xs1> <v-icon>keyboard_arrow_right</v-icon> </v-flex>
      </v-layout>
    </v-flex>

    <!-- Web 일때 -->

    <v-flex v-else xs12>
      <!--buy 부분 -->
      <v-layout>
        <v-flex md5>
          <v-layout column>
            <v-layout row style="font-size: 16px" mb-1>
              <v-flex md3 offset-md1 bold>{{$str("buy")}}</v-flex>
              <v-flex md7></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex md1><v-icon>keyboard_arrow_left</v-icon></v-flex>
              <v-flex md3  v-for="item in items" @click="setBuyInfo(item.text)" class="coinBtn" key="buyKey">
                {{ item.text }}
              </v-flex>
              <v-flex md1> <v-icon>keyboard_arrow_right</v-icon></v-flex>
            </v-layout>
          </v-layout>
        </v-flex>
        <!-- 가운데 divider-->
        <v-flex md1>
          <v-layout align-center justify-end column fill-height pr-4>
            <span><v-divider vertical style="height: 48px;"></v-divider></span>
          </v-layout>
        </v-flex>
        <!-- Sell 부분 -->
        <v-flex md5>
          <v-layout column>
            <v-layout row style="font-size: 16px" mb-1>
              <v-flex md3 offset-md1 bold>{{$str("sell")}}</v-flex>
              <v-flex md7></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex md1><v-icon>keyboard_arrow_left</v-icon></v-flex>
              <v-flex md3  v-for="item in items" key="itemKey" @click="setSellInfo(item.text) " class="coinBtn">
                {{ item.text }}
              </v-flex>
              <v-flex md1> <v-icon>keyboard_arrow_right</v-icon></v-flex>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AXIOS from 'axios';
    import { abUtils } from '@/common/utils';
    import MainRepository from "../vuex/MainRepository";

    export default Vue.extend({
        name: 'selectBar',
        data: () => ({
            items: [
                {
                    text: 'BTC',
                    disabled: false
                },
                {
                    text: 'ETH',
                    disabled: false
                },
                {
                    text: 'USDT',
                    disabled: false
                }
            ],
            tradeStatus : 'BUY',
            tradeCoin: 'BTC',
        }),
        methods : {
            setBuyInfo(item){
                this.tradeStatus = 'BUY';
                this.tradeCoin = item;
                MainRepository.TradeView.setTotalTradeView(this.tradeCoin, "BUY");
                MainRepository.TradeView.setSelectPage(0, this.tradeCoin, "BUY");
            },
            setSellInfo(item){
                this.tradeStatus = 'SELL';
                this.tradeCoin = item;
                MainRepository.TradeView.setTotalTradeView(this.tradeCoin, "SELL");
                MainRepository.TradeView.setSelectPage(0, this.tradeCoin, "SELL");
            },
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        }
    });
</script>
<style>
  .mobileBuyBtn{
    height: 36px;
    width:67px;
    border: solid 1px #214ea1;
    border-top-left-radius:200px;
    display: inline-block;
    position: relative;
    border-bottom-left-radius:200px;
  }
  .mobileSellBtn{
    height: 36px;
    width:67px;
    background: #214ea1;
    border-top-right-radius:200px;
    display: inline-block;
    border: solid 1px #214ea1;
    position: relative;
    border-bottom-right-radius:200px;
  }
  .mobileBtnText{
    line-height:50px; color:#214ea1; position: absolute; left: 20px; bottom: -8px;
  }
  .mobileBtnTextClicked{
    line-height:50px;
    color:white;
    position: absolute;
    left: 20px;
    bottom: -8px;
  }
  .coinBtn:hover{
    color : #214ea1 !important;
    font-size: 16px;
    font-weight: bold;
  }
</style>