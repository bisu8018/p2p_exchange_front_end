<template>
  <v-layout mt-5>
    <!--left filter-->
      <!-- mobile 일때 -->
      <v-layout row wrap v-if="isMobile" >
        <!-- buy sell 버튼 -->
        <v-flex xs12>
          <div v-if="tradeStatus ==='BUY'">
            <!--buy가 활성화-->
            <div class="buyBtn mobileActiveBtn">
              <button class="mobileActiveBtnText" @click="setBuyInfo('current')">Buy</button>
            </div>
            <!--sell-->
            <div class="sellBtn mobileInactiveBtn">
              <button class="mobileInactiveBtnText" @click="setSellInfo('current')"> Sell</button>
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
        <v-layout justify-space-between row coinselect-2 mt-4>
          <!-- < 화살표-->
          <button><i class="material-icons md-24">keyboard_arrow_left</i></button>
          <!--BTC 버튼-->
          <button class="text-darkgray"
                v-bind:class="{'text-blue' : clicked[0].isBTC}"
                @click="onMobileTokenClicked('BTC')">BTC
          </button>
          <!--ETH 버튼-->
          <button class="text-darkgray"
                v-bind:class="{'text-blue' : clicked[1].isETH}"
                @click="onMobileTokenClicked('ETH')">ETH
          </button>
          <!-- USDT 버튼 -->
          <button class="text-darkgray"
                v-bind:class="{'text-blue' : clicked[2].isUSDT}"
                @click="onMobileTokenClicked('USDT')">USDT
          </button>
          <!-- > 화살표 -->
          <button><i class="material-icons md-24">keyboard_arrow_right</i></button>
        </v-layout>
        <!--필터링된 사항들-->
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
              <!-- 필터 펼치기 버튼 -->
              <img src="../../../../../assets/img/searchBtn.png" @click.stop="isModal = !isModal">
            </v-flex>
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
                <!-- < 화살표-->
                  <button><i class="material-icons md-24">keyboard_arrow_left</i></button>
                <!--BTC 버튼-->
                  <button class="text-darkgray"
                        v-bind:class="{'text-blue' : clicked[0].isBTC && tradeStatus==='BUY'}"
                        @click="setBuyInfo('BTC')">BTC
                  </button>
                <!-- ETH 버튼-->
                  <button class="text-darkgray"
                        v-bind:class="{'text-blue' : clicked[1].isETH && tradeStatus==='BUY'}"
                        @click="setBuyInfo('ETH')">ETH
                  </button>
                <!-- USDT 버튼-->
                  <button class="text-darkgray"
                        v-bind:class="{'text-blue' : clicked[2].isUSDT && tradeStatus==='BUY'}"
                        @click="setBuyInfo('USDT')">USDT
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
              <v-flex md2 offset-md2 coinselect-1>{{$str("sell")}}</v-flex>
              <v-flex md6></v-flex>
            </v-layout>
            <v-layout justify-space-between row coinselect-2>
              <i class="material-icons md-24">keyboard_arrow_left</i>
              <!--BTC 버튼-->
              <button class="text-darkgray"
                    v-bind:class="{'text-blue' : clicked[0].isBTC && tradeStatus==='SELL'}"
                    @click="setSellInfo('BTC')">BTC</button>
              <!-- ETH 버튼-->
              <button class="text-darkgray"
                    v-bind:class="{'text-blue' : clicked[1].isETH && tradeStatus==='SELL'}"
                    @click="setSellInfo('ETH')">ETH</button>
              <!-- USDT 버튼-->
              <button class="text-darkgray" v-bind:class="{'text-blue' : clicked[2].isUSDT && tradeStatus==='SELL'}"
                    @click="setSellInfo('USDT')">USDT</button>
              <i class="material-icons md-24">keyboard_arrow_right</i>
            </v-layout>
          </v-layout>
        </v-flex>


        <!--right filter-->
        <v-flex md4 offset-md1 pl-0 pr-0 class="cardParent">
          <v-layout row class="statusBox" mt-4a>
            <v-flex xs10 text-xs-left >
              <div  class="statusChip" >{{country}}</div>
              <div  class="statusChip">{{currency}}</div>
              <div  class=" statusChip">{{paymentMethod}}</div>
              <div  class="statusChip " v-if="amount!=0" v-model="isAmout"
                    @input="removeAmount" >{{amount}}</div>
            </v-flex>
            <v-flex xs2 pt-2 text-xs-right relative>
                <button>
                  <img src="../../../../../assets/img/searchBtn.png" @click.stop="isModal = !isModal">
                </button>
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

            clicked : [
                {isBTC : true},
                {isETH : false},
                {isUSDT : false},
            ],

            tradeStatus : 'BUY',
            tradeCoin: 'BTC',

        }),
        methods : {
            setBuyInfo(item){
                this.tradeStatus = "BUY";
                this.setTokenStyle(item);
                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();

                if(item =="current"){ //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지
                }
                else{
                    this.tradeCoin = item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
                }

            },
            setSellInfo(item){
                this.tradeStatus = "SELL";
                this.setTokenStyle(item);
                //default data
                this.country = MainRepository.SelectBox.controller().getCountry();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.amount = MainRepository.TradeView.controller().getLimitMin();

                if(item =='current'){     //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지

                }
                else{
                    this.tradeCoin =item;
                    MainRepository.TradeView.setTotalTradeView(this.tradeCoin, this.tradeStatus, this.country, this.currency, this.amount, this.paymentMethod);
                    MainRepository.TradeView.setTokenAndAdType(this.tradeCoin, this.tradeStatus);
                    MainRepository.TradeView.setSelectPage(0);
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
              if(this.tradeStatus == 'BUY'){
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
   /* filter card 가 mobile에선 width 100이므로
   mobile에서만 추가 선언.*/
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