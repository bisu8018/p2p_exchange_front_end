<template>
  <v-layout mt-5>
    <div :class="{'layout_dim' : isModal }" @click="onOutsideClick"></div>

      <!-- mobile 일때 -->
      <v-layout row wrap v-if="isMobile" mb-3>
        <!-- buy sell 버튼 -->
        <v-flex xs12>
            <!--buy가 활성화-->
            <div class="buyBtn" @click="onTokenClicked('current','Buy')"
                 :class="{mobileActiveBtn : tradeType ==='Buy'}"
            >
              <button>{{$str("buy")}}</button>
            </div>
            <!--sell-->
            <div class="sellBtn" @click="onTokenClicked('current','Sell')"
                 :class="{mobileActiveBtn : tradeType ==='Sell'}"
            >
              <button>{{$str("sell")}}</button>
            </div>
        </v-flex>
          <!-- BTC ALLB ETH  버튼 -->
        <v-layout v-if="!isCustomTrade" justify-space-between row mt-4 color-darkgray  medium >
          <!-- < 화살표-->
          <i class="material-icons md-24 c-pointer"
             @click="onTokenClicked('left')"
             v-bind:class="{'color-blue-active' : !isRightClicked}"
          >keyboard_arrow_left</i>
          <!--token[0] 버튼-->
          <!--v-bind:class="{'color-blue bold underline' : clicked[0].isBTC}"-->
          <button class="mobile-token"
                @click="onTokenClicked(0,'current')"><h4>{{tokens.left}}</h4>
          </button>
          <!-- token[1] 버튼. 활성화된 버튼 -->
          <!--v-bind:class="{'color-blue bold underline' : clicked[2].isALLB}"-->
          <button
                 class="mobile-token color-blue-active bold underline"
                 @click="onTokenClicked(1,'current')"><h4>{{tokens.center}}</h4>
          </button>
          <!--token[2]-->
          <!--v-bind:class="{'color-blue bold underline' : clicked[1].isETH}"-->
          <button class="mobile-token"
                @click="onTokenClicked(2,'current')"><h4>{{tokens.right}}</h4>
          </button>
          <!-- > 화살표 -->
          <i class="material-icons md-24 c-pointer"
             @click="onTokenClicked('right')"
             v-bind:class="{'color-blue-active' : isRightClicked}"
          >keyboard_arrow_right</i>
        </v-layout>
        <!--필터링된 사항들-->
        <v-flex xs12 class="cardParent">
          <v-layout row class="statusBox" mt-4a pr-2>
            <h6  class="statusChip" @click.stop="transisModal('open')">{{$str(getCountryName(nationality))}}</h6>
            <h6  class="statusChip" @click.stop="transisModal('open')">{{currency}}</h6>
            <h6  class=" statusChip" @click.stop="transisModal('open')">{{$str(getPaymentName(paymentMethod))}}</h6>
            <!--amount 는 입력시에만 뜸-->
            <h6  class="statusChip " v-if="amount!=0" v-model="isAmout">
              <v-layout align-center row fill-height>
                {{toMoneyFormat(amount)}}
                <i class="h5 material-icons " @click="removeAmount">close</i>
              </v-layout>
            </h6>
            <v-spacer></v-spacer>
            <!-- 필터 펼치기 버튼 -->
            <button @click.stop="transisModal('open')">
              <i class="material-icons color-darkgray" >filter_list</i>
            </button>
          </v-layout>

          <!--필터링 card modal-->
          <div class="cardModal"  v-if="isModal">
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
                <input type="text" class="input" v-model="modal_amount"
                       :placeholder="$str('How_much_you_want_to_trade?')">
              </v-flex>
            </v-layout>
            <!-- cancel, search 버튼-->
            <v-flex text-xs-right mt-4>
              <button class="btn-rounded-white text-white-hover" @click="transisModal('close')" >{{$str("cancel")}} </button>
              <button class="btn-rounded-blue btn-blue-hover" @click="onSearch" >{{$str("search")}} </button>
            </v-flex>
          </div>
        </v-flex>
      </v-layout>

      <!-- Web 일때 -->
      <!--buy 부분 -->
      <v-layout row v-else mb-5>
        <v-flex md3 pr-0 v-if="!isCustomTrade">
          <v-layout column>
              <v-layout row mb-3>
                <v-flex md3 offset-md2 text-md-left>
                  <h4 class="bold" >{{$str("buy")}}</h4>
                </v-flex>
              </v-layout>
              <v-layout  justify-space-between row medium color-darkgray>
                  <!-- < 화살표-->
                  <i class="material-icons md-24 c-pointer"
                     @click="onTokenClicked('left', 'Buy')"
                     v-bind:class="{'color-blue-active' : !isRightClicked}"
                  >keyboard_arrow_left</i>
                  <!--left 버튼-->
                  <button @click="onTokenClicked(0, 'Buy')"><h4>{{tokens.left}}</h4></button>
                  <!-- center 버튼-->
                  <button v-bind:class="{'color-blue-active underline bold' : tradeType==='Buy'}"
                          @click="onTokenClicked(1, 'Buy')"><h4>{{tokens.center}}</h4>
                  </button>
                  <!-- right 버튼-->
                  <button @click="onTokenClicked(2, 'Buy')"><h4>{{tokens.right}}</h4></button>
                  <!-- > 화살표-->
                  <i class="material-icons md-24 c-pointer"
                     @click="onTokenClicked('right', 'Buy')"
                     v-bind:class="{'color-blue-active' : isRightClicked}"
                  >keyboard_arrow_right</i>
              </v-layout>
          </v-layout>
        </v-flex>
        <!-- 가운데 divider-->
        <v-flex md1 justify-center v-if="!isCustomTrade">
          <div class="selectDivider"></div>
        </v-flex>

        <!-- Sell 부분 -->
        <v-flex md3 pl-0  v-if="!isCustomTrade">
          <v-layout column>
            <v-layout row mb-3>
              <v-flex md3 offset-md2 bold text-md-left>
                <h4>{{$str("sell")}}</h4>
              </v-flex>
            </v-layout>
            <v-layout justify-space-between row color-darkgray>
              <!-- < 화살표-->
              <i class="material-icons md-24 c-pointer"
                 @click="onTokenClicked('left', 'Sell')"
                 v-bind:class="{'color-blue-active' : !isRightClicked}"
              >keyboard_arrow_left</i>
              <!--left 버튼-->
              <button @click="onTokenClicked(0, 'Sell')"><h4>{{tokens.left}}</h4></button>
              <!-- center 버튼-->
              <button v-bind:class="{'color-blue-active underline bold' :  tradeType==='Sell'}"
                      @click="onTokenClicked(1, 'Sell')"><h4>{{tokens.center}}</h4>
              </button>
              <!-- right 버튼-->
              <button @click="onTokenClicked(2, 'Sell')"><h4>{{tokens.right}}</h4></button>
              <!-- > 화살표-->
              <i class="material-icons md-24 c-pointer"
                 @click="onTokenClicked('right', 'Sell')"
                 v-bind:class="{'color-blue-active' : isRightClicked}"
              >keyboard_arrow_right</i>
            </v-layout>
          </v-layout>
        </v-flex>

        <!--custom token 일때-->
        <v-flex v-else>
          <v-layout mt-4a>
            <h4 class="medium color-darkgray c-pointer" @click="onTokenClicked('current','Buy')"
                :class="{'color-blue-active underline bold' : tradeType==='Buy'}">
              {{$str("buy")}}
            </h4>
            <div class="selectDivider-small"></div>
            <h4 class="medium color-darkgray c-pointer" @click="onTokenClicked('current','Sell')"
                :class="{'color-blue-active underline bold' : tradeType==='Sell'}">
              {{$str("sell")}}
            </h4>
          </v-layout>
        </v-flex>


        <!--right filter-->
        <v-flex md4 offset-md1 class="cardParent p-relative">
          <v-layout row class="statusBox" >
            <h6  class="statusChip" @click="transisModal('open')">{{$str(getCountryName(nationality))}}</h6>
            <h6  class="statusChip" @click="transisModal('open')">{{currency}}</h6>
            <h6  class=" statusChip" @click="transisModal('open')">{{$str(getPaymentName(paymentMethod))}}</h6>
            <h6  class="statusChip " v-if="amount>0" v-model="isAmout">
              <v-layout align-center row fill-height>
                {{toMoneyFormat(amount)}}
                <i class="h5 material-icons " @click="removeAmount">close</i>
              </v-layout>
            </h6>
            <v-spacer></v-spacer>
            <button @click="transisModal('open')">
              <i class="material-icons color-darkgray">filter_list</i>
            </button>
          </v-layout>
          <div class="cardModal" v-if="isModal">
            <v-layout row wrap>
              <v-flex xs12 text-xs-left cardText>{{$str("country")}}</v-flex>
              <!--nationality select box-->
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
                <input type="text" class="input" v-model="modal_amount" @keyup="onNumberCheck()"
                       :placeholder="$str('How_much_you_want_to_trade?')">
              </v-flex>
            </v-layout>
            <!-- cancel, search 버튼-->
            <v-flex text-xs-right mt-4>
              <button class="btn-rounded-white text-white-hover" @click="transisModal('close')" >{{$str("cancel")}} </button>
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
    import {abUtils} from "../../../../../common/utils";
    import {findCountryName, findPaymentName} from "../../../../../common/common";

    export default Vue.extend({
        name: "TradeCenterFilter",
        components: {
            SelectBox,
        },
        data: () => ({
            isAmout : true,
            isModal: false,
            nationality: 'ALL',
            currency: 'CNY',
            paymentMethod: 'ALL',
            amount : '',
            modal_amount : '',
            isRightClicked : true, //토큰선택의 오른쪽 화살표가 활성화된게 디폴트임.

            clicked : [
                {isBTC : true},
                {isETH : false},
                {isALLB : false},
            ],
            tradeType : 'Buy',
            tradeCoin: 'BTC',
            tokens: {
                left: 'ETH',
                center: 'BTC',
                right: 'ALLB',
            },
            showDim: false,
            isCustomTrade : false,

        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        created(){
            let currentURL = window.location.href
            var param = currentURL.split('?');
            if(param[1] === 'main') {
                this.setCurrentData();
            }
            //custom Token Trade 일때
            if(this.$route.name === 'customTokenTrade'){
              this.isCustomTrade = true;
            }

        },
        methods : {
            //main에서 바로 넘어오는경우 정보 동기화.
            setCurrentData(){
                this.tradeCoin = MainRepository.TradeView.getSelectFilter().cryptocurrency;
                this.tradeType = MainRepository.TradeView.getSelectFilter().tradeType;
                this.nationality = MainRepository.TradeView.getSelectFilter().nationality;
                this.currency = MainRepository.TradeView.getSelectFilter().currency;
                this.paymentMethod = MainRepository.TradeView.getSelectFilter().paymentMethods;
                this.amount = MainRepository.TradeView.getSelectFilter().amount;
                //tradeCoin의 순서 배치
                if(this.tradeCoin == 'ethereum'){
                    this.tokens = {left: 'ALLB',center: 'ETH',right: 'BTC',}
                }
                else if (this.tradeCoin == 'ALLB'){
                    this.tokens = {left: 'BTC',center: 'ALLB',right: 'ETH',}
                }
                //TradeType 수정.
                if(this.tradeType == 'buy'||this.tradeType == 'Buy'){
                    this.tradeType = 'Sell'
                } else{
                    this.tradeType = 'Buy'
                }
                //amount 수정.
                if (this.amount === 0) {
                    this.amount = '';
                }//paymentMethod 수정.
                if(this.paymentMethod ===''){
                    this.paymentMethod = 'ALL'
                }
            },
            getPaymentName(name) {
                return findPaymentName(name);
            },
            getCountryName(name) {
                return findCountryName(name);
            },
            setBuyInfo(item){
                this.tradeType = "Buy";
                //스타일을 위한 class binding을 위한 함수.
                if(item =="current"){ //mobile 버전에서 그냥 buy 버튼만 누룰시 현재 token을 유지
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }
                else{
                    this.tradeCoin = item;
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }

            },
            setSellInfo(item){
                this.tradeType = "Sell";
                //default data
                if(item ==='current'){     //mobile 버전에서 그냥 sell 버튼만 누룰시 현재 token을 유지
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }
                else{
                    this.tradeCoin =item;
                    MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);
                }
            },
            onOutsideClick() {
              this.isModal = false;
            },
            onTokenClicked(item, tradeType){
                ///////////setItem
                if(item ==='right' || item === 2){
                    this.isRightClicked = true;
                    let temp = this.tokens.left
                    this.tokens.left = this.tokens.center;
                    this.tokens.center = this.tokens.right;
                    this.tokens.right = temp;
                    this.tradeCoin= this.tokens.center
                }
                else if(item ==='left'|| item === 0){
                    this.isRightClicked = false;
                    let temp = this.tokens.right;
                    this.tokens.right = this.tokens.center;
                    this.tokens.center = this.tokens.left;
                    this.tokens.left = temp
                    this.tradeCoin= this.tokens.center
                }
                else if(item ==='current'){
                    //this.tradeCoin으로 trade 이용.
                }
                //////////setTradeType
                if(tradeType ==='Buy'){
                    this.tradeType = "Buy";
                }
                else if(tradeType ==='Sell'){
                    this.tradeType = "Sell";
                }
                else if(tradeType ==='current'){
                    //this.tradeType으로 trade 이용.
                }
                //위의 과정 거치면 coin과 type 결정됨.
                MainRepository.TradeView.setTradeLeftFilter(this.tradeCoin, this.tradeType);

            },
            transisModal(type){
                if(type ==='open'){
                    this.isModal = true;
                }else{
                    this.isModal = false;
                }

            },
            //rightfilter의 search 클릭시
            onSearch(){
                //입력된 정보들을 vuex로 set 시킴.
                MainRepository.TradeView.setTradeRightFilter(this.nationality, this.paymentMethod, this.currency, this.modal_amount);
                this.nationality = MainRepository.SelectBox.controller().getCountry();
                this.currency = MainRepository.SelectBox.controller().getCurrency();
                this.paymentMethod = MainRepository.SelectBox.controller().getPayment();
                this.amount = this.modal_amount
                this.isModal = false; //modal 창 끄기.
            },
            //amount Chip에서 창 끌때
            removeAmount(){
                this.amount = '';
                this.modal_amount = '';
                //amount를 default로 초기화 시키고, 다시 list호출.
                MainRepository.TradeView.setTradeRightFilter(this.nationality, this.paymentMethod, this.currency, this.amount);
            },
            onNumberCheck(){
                let temp = this.amount
                if (!abUtils.isDouble(temp) || temp[0] === '.') {
                    return this.amount = "";
                }
                if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                    return this.amount = abUtils.toDeleteZero(temp);
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
        },
    });
</script>

<style scoped>
  /* mobile 에서*/
  @media only screen and (max-width: 959px) {
    /*mobile버전의 buysell 버튼 관련 css*/
    .sellBtn{
      height: 36px;
      width:67px;
      border-top-right-radius:200px;
      border-bottom-right-radius:200px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      border: solid 1px #214ea1;
    }
    .buyBtn{
      height: 36px;
      width:67px;
      border-top-left-radius:200px;
      border-bottom-left-radius:200px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      border: solid 1px #214ea1;
    }
    .buyBtn > button, .sellBtn > button{
      line-height:50px;
      color:#214ea1;
      position: absolute;
      left: 20px;
      bottom: -8px;
    }

    .mobileActiveBtn{
      background: #214ea1;
      border: solid 1px #214ea1;

    }
    .mobileActiveBtn > button{
      line-height:50px;
      color:white !important;
      position: absolute;
      left: 20px;
      bottom: -8px;
    }
    /*.mobileActiveBtnText{*/
      /*line-height:50px;*/
      /*color:white !important;*/
      /*position: absolute;*/
      /*left: 20px;*/
      /*bottom: -8px;*/
    /*}*/


    .cardParent{
      position: relative;
    }
    .cardModal{
      z-index: 2;
      position: absolute;
      background-color: #ffffff;
      box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
      padding: 16px 8px 24px 8px;
      top: 88px ;
      width: 100% ;
      left: 0;
    }
  }

  /* 웹에서 */
  @media only screen and (min-width: 960px) {
    .cardParent {
      margin-top: 32px;
      position: relative;
    }

    .selectDivider-small {
      border: solid 1px #d1d1d1;
      height: 16px;
      width: 2px;
      margin-left: 32px;
      margin-right: 32px;
      margin-top: 6px;
    }
    .cardModal{
      z-index: 2;
      position: absolute;
      background-color: #ffffff;
      box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
      padding: 16px 8px 24px 8px;
      width: 75%;
      left: 22%;
      top: 60px;
    }

  }
  .underline{
    border-bottom: 1px solid currentColor
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

   .cardModal:after{
     content: '';
     position: absolute;
     bottom: 100%;
     left: 95%;
     margin-left: -8px;
     width: 0; height: 0;
     border-style: solid;
     border-bottom: 8px solid  #ffffff;
     border-right: 8px solid transparent;
     border-left: 8px solid transparent;
     border-color: transparent transparent  #ffffff transparent ;
   }
   .cardModal:before{
     content: '';
     position: absolute;
     border-style: solid;
     bottom: 100.3%;
     left: 95%;
     margin-left: -8px;
     width: 0; height: 0;
     border-width: 10px;
     border-bottom: 8px solid  #ffffff;
     border-right: 8px solid transparent;
     border-left: 8px solid transparent;
     border-color: transparent transparent #d8d8d8 transparent ;
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
    cursor: pointer;
  }
  .statusChip:hover{
    opacity: 0.8;
  }

  .layout_dim {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }

  .mobile-token{

  }
</style>