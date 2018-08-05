<template>
  <v-layout mt-5>
    <!--left filter-->
      <!-- mobile 일때 -->
      <v-layout row wrap v-if="isMobile" >
        <!-- buy sell 버튼 -->
        <v-flex xs12>
          <div v-if="tradeType ==='BUY'">
            <!--buy가 활성화-->
            <div class="buyBtn mobileActiveBtn">
              <button class="mobileActiveBtnText" @click="setBuyInfo('current')">{{$str("buy")}}</button>
            </div>
            <!--sell-->
            <div class="sellBtn mobileInactiveBtn">
              <button class="mobileInactiveBtnText" @click="setSellInfo('current')">{{$str("sell")}}</button>
            </div>
          </div>
          <div v-else>
            <!--buy-->
            <div class="buyBtn mobileInactiveBtn">
              <button class="mobileInactiveBtnText" @click="setBuyInfo('current')">Buy</button>
            </div>
            <!--sell 이 활성화-->
            <div class="sellBtn mobileActiveBtn">
              <button class="mobileActiveBtnText" @click="setSellInfo('current')"> Sell</button>
            </div>
          </div>
        </v-flex>
          <!-- BTC ALLB ETH  버튼 -->
        <v-layout justify-space-between row mt-4 color-darkgray  medium>
          <!-- < 화살표-->
          <button><i class="material-icons md-24">keyboard_arrow_left</i></button>
          <!--BTC 버튼-->
          <button
                v-bind:class="{'color-blue bold' : clicked[0].isBTC}"
                @click="onMobileTokenClicked('BTC')"><h4>BTC</h4>
          </button>
          <!--ETH 버튼-->
          <button
                v-bind:class="{'color-blue bold' : clicked[1].isETH}"
                @click="onMobileTokenClicked('ETH')"><h4>ETH</h4>
          </button>
          <!-- USDT 버튼 -->
          <button
                v-bind:class="{'color-blue bold' : clicked[2].isUSDT}"
                @click="onMobileTokenClicked('USDT')"><h4>USDT</h4>
          </button>
          <!-- > 화살표 -->
          <button><i class="material-icons md-24">keyboard_arrow_right</i></button>
        </v-layout>
        <!--필터링된 사항들-->
        <v-flex xs12 class="cardParent">
          <v-layout row class="statusBox" mt-4a pr-2>
            <h6  class="statusChip" >{{country}}</h6>
            <h6  class="statusChip">{{currency}}</h6>
            <h6  class=" statusChip">{{paymentMethod}}</h6>
            <!--amount 는 입력시에만 뜸-->
            <h6  class="statusChip " v-if="amount!=0" v-model="isAmout">
              <v-layout align-center row fill-height>
                {{amount}}
                <i class="h5 material-icons " @click="removeAmount">close</i>
              </v-layout>
            </h6>
            <v-spacer></v-spacer>
            <!-- 필터 펼치기 버튼 -->
            <button @click.stop="isModal = !isModal">
              <i class="material-icons color-darkgray" >filter_list</i>
            </button>
          </v-layout>

          <!--필터링 card modal-->
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
                <input type="text" class="input" v-model="amount"
                       :placeholder="$str('How_much_you_want_to_trade?')">
              </v-flex>
            </v-layout>
            <!-- cancel, search 버튼-->
            <v-flex text-xs-right mt-4>
              <button class="btn-rounded-white text-white-hover" @click="isModal = false" >{{$str("cancel")}} </button>
              <button class="btn-rounded-blue btn-blue-hover" @click="onSearch" >{{$str("search")}} </button>
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
                <v-flex md3 offset-md2 text-md-left>
                  <h4 class="bold">{{$str("buy")}}</h4>
                </v-flex>
                <v-flex md5></v-flex>
              </v-layout>
              <v-layout justify-space-between row medium color-darkgray>
                <!-- < 화살표-->
                  <button><i class="material-icons md-24">keyboard_arrow_left</i></button>
                <!--BTC 버튼-->
                  <button
                        v-bind:class="{'color-blue' : clicked[0].isBTC && tradeType==='BUY'}"
                        @click="setBuyInfo('BTC')"><h4>BTC</h4>
                  </button>
                <!-- ETH 버튼-->
                  <button
                        v-bind:class="{'color-blue' : clicked[1].isETH && tradeType==='BUY'}"
                          @click="setBuyInfo('ETH')"><h4>ETH</h4>
                  </button>
                <!-- USDT 버튼-->
                  <button
                        v-bind:class="{'color-blue' : clicked[2].isUSDT && tradeType==='BUY'}"
                          @click="setBuyInfo('USDT')"><h4>USDT</h4>
                  </button>
                <!-- > 화살표-->
                  <button><i class="material-icons md-24">keyboard_arrow_right</i></button>
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
              <v-flex md3 offset-md2 bold text-md-left>
                <h4>{{$str("sell")}}</h4>
              </v-flex>
              <v-flex md5></v-flex>
            </v-layout>
            <v-layout justify-space-between row color-darkgray>
              <i class="material-icons md-24">keyboard_arrow_left</i>
              <!--BTC 버튼-->
              <button
                    v-bind:class="{'color-blue' : clicked[0].isBTC && tradeType==='SELL'}"
                    @click="setSellInfo('BTC')"><h4>BTC</h4>
              </button>
              <!-- ETH 버튼-->
              <button
                    v-bind:class="{'color-blue' : clicked[1].isETH && tradeType==='SELL'}"
                    @click="setSellInfo('ETH')"><h4>ETH</h4>
              </button>
              <!-- USDT 버튼-->
              <button  v-bind:class="{'color-blue' : clicked[2].isUSDT && tradeType==='SELL'}"
                    @click="setSellInfo('USDT')"><h4>USDT</h4>
              </button>
              <i class="material-icons md-24">keyboard_arrow_right</i>
            </v-layout>
          </v-layout>
        </v-flex>


        <!--right filter-->
        <v-flex md4 offset-md1 pl-0 pr-0 class="cardParent">
          <v-layout row class="statusBox" mt-4a>
            <h6  class="statusChip" >{{country}}</h6>
            <h6  class="statusChip">{{currency}}</h6>
            <h6  class=" statusChip">{{paymentMethod}}</h6>
            <h6  class="statusChip " v-if="amount!=0" v-model="isAmout">
              <v-layout align-center row fill-height>
                {{amount}}
                <i class="h5 material-icons " @click="removeAmount">close</i>
              </v-layout>
            </h6>
            <v-spacer></v-spacer>
            <button @click.stop="isModal = !isModal">
              <i class="material-icons color-darkgray">filter_list</i>
            </button>
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
                <input type="text" class="input" v-model="amount"
                       :placeholder="$str('How_much_you_want_to_trade?')">
              </v-flex>
            </v-layout>
            <!-- cancel, search 버튼-->
            <v-flex text-xs-right mt-4>
              <button class="btn-rounded-white text-white-hover" @click="isModal = false" >{{$str("cancel")}} </button>
              <button class="btn-rounded-blue btn-blue-hover" @click="onSearch" >{{$str("search")}} </button>
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
            amount : '',

            clicked : [
                {isBTC : true},
                {isETH : false},
                {isUSDT : false},
            ],

            tradeType : 'BUY',
            tradeCoin: 'BTC',

        }),
        methods : {
            setBuyInfo(item){
                this.tradeType = "BUY";
                //스타일을 위한 class binding을 위한 함수.
                this.setTokenStyle(item);

                if(item =="current"){ //mobile 버전에서 그냥 buy 버튼만 누룰시 현재 token을 유지
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }
                else{
                    this.tradeCoin = item;
                    //MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeType, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }

            },
            setSellInfo(item){
                this.tradeType = "SELL";
                this.setTokenStyle(item);
                //default data

                if(item =='current'){     //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }
                else{
                    this.tradeCoin =item;
                    //MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeType, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }

            },
            setTokenStyle(item){
                switch (item){
                    case 'BTC':
                        this.clicked[0].isBTC = true;
                        this.clicked[1].isETH = false;
                        this.clicked[2].isUSDT = false;
                        break;

                    case 'ETH':
                        this.clicked[0].isBTC = false;
                        this.clicked[1].isETH = true;
                        this.clicked[2].isUSDT = false;
                        break;

                    case 'USDT':
                        this.clicked[0].isBTC = false;
                        this.clicked[1].isETH = false;
                        this.clicked[2].isUSDT = true;
                        break;
                }
            },
            //모바일에서 token 변화를 눌렀을시
            onMobileTokenClicked(item){
              if(this.tradeType == 'BUY'){
                  this.setBuyInfo(item);
              }
              else{
                  this.setSellInfo(item);
              }
            },
            onCurrencyChange (){

            },
            onPaymentMethodChange (){

            },
            onAmountChange (){

            },
            onSearch(){
                //입력된 정보들을 vuex로 set 시킴.
                MainRepository.TradeView.setTradeRightFilter(this.country, this.paymentMethod, this.currency, this.amount);


                this.country =  MainRepository.SelectBox.controller().getCountry();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
//                 this.country = MainRepository.SelectBox.controller().getCountry();
//                 this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
//                 this.currency = MainRepository.SelectBox.controller().getCurrency();
// l
//                 console.log("search country data:" + this.country);
//                 console.log("search currency data:" + this.currency);
//                 console.log("search amount data:" + this.amount);
//                 MainRepository.SelectBox.controller().setCountry(this.country);
//                 MainRepository.SelectBox.controller().setCurrency(this.currency);
//                 MainRepository.SelectBox.controller().setPayment(this.paymentMethod);
//                 MainRepository.TradeView.controller().setLimitMin(this.amount);
//                 MainRepository.TradeView.setSelectPage(0);

                this.isModal = false; //modal 창 끄기.
            },
            removeAmount(){
                this.amount = 0;
                MainRepository.TradeView.setTradeRightFilter(this.country, this.paymentMethod, this.currency, this.amount);
            //  list를 새로 띄워주도록 구현해야함.
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
    border-bottom-right-radius:200px;
    display: inline-block;
    position: relative;
  }
  .buyBtn{
    height: 36px;
    width:67px;
    border-top-left-radius:200px;
    border-bottom-left-radius:200px;
    display: inline-block;
    position: relative;
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
    padding-right: 8px;
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
   /* filter card 가 mobile에선 width 100이므로
   mobile에서만 추가 선언.*/
  .cardModalMobile{
    width: 100%;
    left: 0%;
  }


  .selectDivider{
    border: solid 1px #d1d1d1;
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