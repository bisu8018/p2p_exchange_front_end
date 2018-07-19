<template>
  <v-layout mt-4 row wrap>
    <!--left filter-->
    <v-flex xs12 md7>
      <div>
        <!-- mobile 일때 -->
        <v-flex v-if="isMobile">
            <!-- buy sell 버튼 -->
            <div>
              <!--buy-->
              <div class="mobileBuyBtn" >
                <span class="mobileBtnText" @click="setBuyInfo('current')">Buy</span>
              </div>
              <!--sell-->
              <div class="mobileSellBtn" >
                <span class="mobileBtnTextClicked" @click="setBuyInfo('current')"> Sell</span>
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

          <!--right selecter-->

        </v-flex>

        <!-- Web 일때 -->

        <div v-else>
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
        </div>
      </div>
    </v-flex>
    <!-- right filter -->
    <v-flex xs12 md5>
      <div>
        <div style=" border: solid 1px #b2b2b2;">
          <v-layout row text-xs-left>
            <v-flex xs10 pr-0 pl-0>
              <div  class=" statusChip" >{{country}}</div>
              <div  class=" statusChip">{{currency}}</div>
              <div  class=" statusChip">{{paymentMethod}}</div>
              <div  class=" statusChip" v-if="amount!=0" v-model="isAmout" text-color="white"
                      @input="removeAmount" >{{amount}}</div>
            </v-flex>
            <v-flex xs2 pt-1 pr-0 pl-0><v-icon  @click.stop="isModal = true">search</v-icon></v-flex>
          </v-layout>
        </div>

        <v-layout>
          <v-flex xs12 md4 >
            <v-dialog v-model="isModal" width="370px">
              <v-card width="370px">
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("country")}}</v-flex>
                    <!--country select box-->
                    <v-flex xs12 md8><SelectBox select-box-type="country"></SelectBox></v-flex>

                    <!-- currency 셀렉터-->
                    <v-flex xs12 md4 pr-2  text-md-right text-xs-left mb-2 style="color: #353535" >{{$str("currency")}}</v-flex>
                    <v-flex xs12 md8>
                      <SelectBox select-box-type="currency"></SelectBox>
                    </v-flex>

                    <!-- payment method 셀렉터-->
                    <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("paymentMethod")}}</v-flex>
                    <v-flex xs12 md8>
                      <SelectBox select-box-type="payment"></SelectBox>
                    </v-flex>
                    <!-- amount 셀렉터 -->
                    <v-flex xs12 md4 pr-2 text-md-right text-xs-left mb-2 style="color:#353535;">{{$str("amount")}}</v-flex>
                    <v-flex xs12 md8>
                      <v-text-field v-bind:label="$str('How_much_you_want_to_trade?')" v-model="amount" :type="'number'" ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <!-- cancel, search 버튼-->
                <v-card-actions>
                  <v-flex text-xs-right >
                    <v-btn dark round color="secondary" @click.native="isModal = false" >{{$str("cancel")}}</v-btn>
                    <v-btn dark color="primary" round @click="onSearch">{{$str("search")}}</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>

      </div>
    </v-flex>
  </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../vuex/MainRepository';
    import SelectBox from '@/components/SelectBox.vue';
    import AXIOS from 'axios';
    export default Vue.extend({
        name: "TradeCenterFilter",
        components: {
            SelectBox,
        },
        data: () => ({
            isAmout : true,
            isModal: false,
            country: 'All countries',
            currency: 'CNY',
            paymentMethod: 'All Payments',
            amount : 500,
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
                if(item =="current"){ //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지
                    //MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus);
                }
                else{
                    this.tradeCoin =item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            setSellInfo(item){
                this.tradeStatus = 'SELL';
                if(item =='current'){     //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지
                    //MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus);
                }
                else{
                    this.tradeCoin =item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            onCurrencyChange (){

            },
            onPaymentMethodChange (){

            },
            onAmountChange (){

            },
            onSearch(){
                // search 누르면 뭐할지 여기에 기입.
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();

                this.isModal = false; //modal 창 끄기.
            },
            removeAmount(){
                location.reload();      // 새로고침으로 해놨는데, vuex도입시 수정할것.
                this.amount = 0;
            },



        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
    });
</script>

<style scoped>
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
  .statusChip{
    display : inline-block;
    background-color: #9294A6;
    margin-left: 8px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
  }
</style>