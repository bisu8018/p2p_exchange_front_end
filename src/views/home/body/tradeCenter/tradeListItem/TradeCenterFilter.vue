<template>
  <v-layout mt-5>
    <!--left filter-->
      <!-- mobile 일때 -->
      <v-layout row wrap v-if="isMobile" mb-4a>
        <!-- buy sell 버튼 -->
        <v-flex xs12>
          <div v-if="tradeStatus ==='BUY'">
            <!--buy가 활성화-->
            <div class="buyBtn mobileActiveBtn">
              <span class="mobileActiveBtnText" @click="setBuyInfo('current')">Buy</span>
            </div>
            <!--sell-->
            <div class="sellBtn mobileInactiveBtn">
              <span class="mobileInactiveBtnText" @click="setSellInfo('current')"> Sell</span>
            </div>
          </div>
          <div v-else>
            <!--buy-->
            <div class="buyBtn mobileInactiveBtn">
              <span class="mobileInactiveBtnText" @click="setBuyInfo('current')">Buy</span>
            </div>
            <!--sell 이 활성화-->
            <div class="sellBtn mobileActiveBtn">
              <span class="mobileActiveBtnText" @click="setSellInfo('current')"> Sell</span>
            </div>
          </div>
        </v-flex>
          <!-- BTC ALLB ETH  버튼 -->
        <v-layout justify-space-between row coinselect-2 mt-4>
          <i class="material-icons md-24">keyboard_arrow_left</i>
          <span v-bind:class="{'text-darkgray' : !isBTC, 'text-blue' : isBTC}"
                @click="setBuyInfo('BTC')">BTC</span>
          <span v-bind:class="{'text-darkgray' : !isETH, 'text-blue' : isETH}"
                @click="setBuyInfo('ETH')">ETH</span>
          <span v-bind:class="{'text-darkgray' : !isUSDT, 'text-blue' : isUSDT}"
                @click="setBuyInfo('USDT')">USDT</span>
          <i class="material-icons md-24">keyboard_arrow_right</i>
        </v-layout>
        <v-flex xs12 class="cardParent">
          <v-layout row class="statusBox" mt-4a>
            <v-flex xs11 text-xs-left >
              <div  class="statusChip" >{{country}}</div>
              <div  class="statusChip">{{currency}}</div>
              <div  class=" statusChip">{{paymentMethod}}</div>
              <div  class="statusChip " v-if="amount!=0" v-model="isAmout"
                    @input="removeAmount" >{{amount}}</div>
            </v-flex>
            <v-flex xs1 pt-2 text-xs-center relative>
              <img src="../../../../../assets/img/searchBtn.png" @click.stop="isModal = !isModal">
            </v-flex>
          </v-layout>
          <div class="cardModal cardModalMobile"  v-if="isModal">
            <v-layout row wrap>
              <v-flex xs12 text-xs-left cardText>{{$str("country")}}</v-flex>
              <!--country select box-->
              <v-flex xs12 ><SelectBox select-box-type="country"></SelectBox></v-flex>

              <!-- currency 셀렉터-->
              <v-flex xs12 text-xs-left cardText  >{{$str("currency")}}</v-flex>
              <v-flex xs12 >
                <SelectBox select-box-type="currency"></SelectBox>
              </v-flex>

              <!-- payment method 셀렉터-->
              <v-flex xs12 text-xs-left cardText >{{$str("paymentMethod")}}</v-flex>
              <v-flex xs12 >
                <SelectBox select-box-type="payment"></SelectBox>
              </v-flex>
              <!-- amount 셀렉터 -->
              <v-flex xs12  text-xs-left cardText>{{$str("amount")}}</v-flex>
              <v-flex xs12 >
                <v-text-field v-bind:label="$str('How_much_you_want_to_trade?')" v-model="amount" :type="'number'" ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- cancel, search 버튼-->
            <v-flex text-xs-right >
              <button class="common-rounded-flat-button common-text-hover" @click="isModal = false" >{{$str("cancel")}} </button>
              <button class="common-rounded-button common-btn-hover" @click="onSearch" >{{$str("search")}} </button>
            </v-flex>
          </div>
        </v-flex>
      </v-layout>

      <!-- Web 일때 -->

      <!--buy 부분 -->
      <v-layout row v-else mb-5>
        <v-flex md3 pl-0 pr-0>
          <v-layout column>
              <v-layout row mb-3>
                <v-flex md2 offset-md2 coinselect-1>{{$str("buy")}}</v-flex>
                <v-flex md6></v-flex>
              </v-layout>
              <v-layout justify-space-between row coinselect-2>
                  <i class="material-icons md-24">keyboard_arrow_left</i>
                  <span class="text-darkgray" v-bind:class="{'text-blue' : isBTC && tradeStatus==='BUY'}"
                        @click="setBuyInfo('BTC')">BTC</span>
                  <span class="text-darkgray" v-bind:class="{'text-blue' : isETH && tradeStatus==='BUY'}"
                        @click="setBuyInfo('ETH')">ETH</span>
                  <span class="text-darkgray" v-bind:class="{'text-blue' : isUSDT && tradeStatus==='BUY'}"
                        @click="setBuyInfo('USDT')">USDT</span>
                  <i class="material-icons md-24">keyboard_arrow_right</i>
              </v-layout>
          </v-layout>
        </v-flex>
        <!-- 가운데 divider-->
        <v-flex md1 justify-center >
          <div class="selectDivider"></div>
        </v-flex>
        <!-- Sell 부분 -->
        <v-flex md3 pl-0 pr-0>
          <v-layout column>
            <v-layout row mb-3>
              <v-flex md2 offset-md2 coinselect-1>{{$str("sell")}}</v-flex>
              <v-flex md6></v-flex>
            </v-layout>
            <v-layout justify-space-between row coinselect-2>
              <i class="material-icons md-24">keyboard_arrow_left</i>
              <span class="text-darkgray" v-bind:class="{'text-blue' : isBTC && tradeStatus==='SELL'}"
                    @click="setSellInfo('BTC')">BTC</span>
              <span class="text-darkgray" v-bind:class="{'text-blue' : isETH && tradeStatus==='SELL'}"
                    @click="setSellInfo('ETH')">ETH</span>
              <span class="text-darkgray" v-bind:class="{'text-blue' : isUSDT && tradeStatus==='SELL'}"
                    @click="setSellInfo('USDT')">USDT</span>
              <i class="material-icons md-24">keyboard_arrow_right</i>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex md1></v-flex>
        <v-flex md4 pl-0 pr-0 class="cardParent">
          <v-layout row class="statusBox" mt-4a>
            <v-flex xs10 text-xs-left >
              <div  class="statusChip" >{{country}}</div>
              <div  class="statusChip">{{currency}}</div>
              <div  class=" statusChip">{{paymentMethod}}</div>
              <div  class="statusChip " v-if="amount!=0" v-model="isAmout"
                    @input="removeAmount" >{{amount}}</div>
            </v-flex>
            <v-flex xs2 pt-2 text-xs-right relative>
                <img src="../../../../../assets/img/searchBtn.png" @click.stop="isModal = !isModal">
            </v-flex>
          </v-layout>
          <div class="cardModal" v-if="isModal">
            <v-layout row wrap>
              <v-flex xs12 text-xs-left cardText>{{$str("country")}}</v-flex>
              <!--country select box-->
              <v-flex xs12 ><SelectBox select-box-type="country"></SelectBox></v-flex>

              <!-- currency 셀렉터-->
              <v-flex xs12 text-xs-left cardText  >{{$str("currency")}}</v-flex>
              <v-flex xs12 >
                <SelectBox select-box-type="currency"></SelectBox>
              </v-flex>

              <!-- payment method 셀렉터-->
              <v-flex xs12 text-xs-left cardText >{{$str("paymentMethod")}}</v-flex>
              <v-flex xs12 >
                <SelectBox select-box-type="payment"></SelectBox>
              </v-flex>
              <!-- amount 셀렉터 -->
              <v-flex xs12  text-xs-left cardText>{{$str("amount")}}</v-flex>
              <v-flex xs12 >
                <v-text-field v-bind:label="$str('How_much_you_want_to_trade?')" v-model="amount" :type="'number'" ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- cancel, search 버튼-->
            <v-flex text-xs-right >
              <button class="common-rounded-flat-button common-text-hover" @click="isModal = false" >{{$str("cancel")}} </button>
              <button class="common-rounded-button common-btn-hover" @click="onSearch" >{{$str("search")}} </button>
            </v-flex>
          </div>
        </v-flex>
      </v-layout>


    <!-- right filter -->


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
            country: 'China',
            currency: 'CNY',
            paymentMethod: 'All Payments',
            amount : 0,
            items: [
                {
                    text: 'BTC',
                    isclicked: true
                },
                {
                    text: 'ETH',
                    isclicked: false
                },
                {
                    text: 'USDT',
                    isclicked: false
                }
            ],
            isBTC : true,
            isETH : false,
            isUSDT : false,
            tradeStatus : 'BUY',
            tradeCoin: 'BTC',

        }),
        methods : {
            setBuyInfo(item){

                this.tradeStatus = "BUY";

                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();

                if(item =="current"){ //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지
                }
                else{
                    switch (item){
                        case 'BTC':
                            this.isBTC = true;
                            this.isETH = false;
                            this.isUSDT = false;
                            break;

                        case 'ETH':
                            this.isBTC = false;
                            this.isETH = true;
                            this.isUSDT = false;
                            break;

                        case 'USDT':
                            this.isBTC = false;
                            this.isETH = false;
                            this.isUSDT = true;
                            break;
                    }
                    this.tradeCoin = item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            setSellInfo(item){

                this.tradeStatus = "SELL";

                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();

                if(item =='current'){     //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지

                }
                else{
                    switch (item){
                        case 'BTC':
                            this.isBTC = true;
                            this.isETH = false;
                            this.isUSDT = false;
                            break;

                        case 'ETH':
                            this.isBTC = false;
                            this.isETH = true;
                            this.isUSDT = false;
                            break;

                        case 'USDT':
                            this.isBTC = false;
                            this.isETH = false;
                            this.isUSDT = true;
                            break;
                    }
                    this.tradeCoin =item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
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

                console.log("search country data:" + this.country);
                console.log("search currency data:" + this.currency);
                console.log("search amount data:" + this.amount);
                MainRepository.SelectBox.controller().setCountry(this.country);
                MainRepository.SelectBox.controller().setCurrency(this.currency);
                MainRepository.SelectBox.controller().setPayment(this.paymentMethod);
                MainRepository.TradeView.controller().setLimitMin(this.amount);

                MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                MainRepository.TradeView.setSelectPage(0);

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
  /*mobile버전의 buysell 버튼 관련 css*/
  .sellBtn{
    height: 36px;
    width:67px;
    border-top-right-radius:200px;
    display: inline-block;
    position: relative;
    border-bottom-right-radius:200px;
  }
  .buyBtn{
    height: 36px;
    width:67px;
    border-top-left-radius:200px;
    display: inline-block;
    position: relative;
    border-bottom-left-radius:200px;
  }
  .mobileActiveBtn{
    background: #214ea1;
    border: solid 1px #214ea1;

  }
  .mobileActiveBtnText{
    line-height:50px;
    color:white;
    position: absolute;
    left: 20px;
    bottom: -8px;
  }
  .mobileInactiveBtn{
    border: solid 1px #214ea1;
  }
  .mobileInactiveBtnText{
    line-height:50px;
    color:#214ea1;
    position: absolute;
    left: 20px;
    bottom: -8px;
  }

  .cardText{
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .statusBox{
    min-height: 40px;
    border-radius: 2px;
    border: solid 1px #8d8d8d;
    width: 100%;

  }
  .cardParent{
    position: relative;
  }
   .cardModal{
    z-index: 2;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    padding: 16px 8px 24px 8px;
    height: 433px;
    width: 75%;
    left: 25%;
     top: 90px;

  }
   .cardModal:after{
     content: '';
     position: absolute;
     bottom: 100%;
     left: 95%;
     margin-left: -8px;
     width: 0; height: 0;
     border-bottom: 8px solid  #ffffff;
     border-right: 8px solid transparent;
     border-left: 8px solid transparent;

   }
  .cardModalMobile{
    width: 100%;
    left: 0%;
  }


  .selectDivider{
    border-left: solid 1px #d1d1d1;
    height: 56px;
    width: 2px;
    margin-left: auto;
    margin-right: auto;
  }
  .statusChip{
    height: 26px;
    border-radius: 2px;
    background-color: #9294a6;
    padding: 4px 8px 4px 8px;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 7px;
    margin-bottom: 7px;
  }
</style>