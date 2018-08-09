<!--TradeListItem과 대부분 같은 코드-->
<!--merchant 부분만 조금 다름-->
<template>
  <div>

    <!-- mobile 일때-->
    <div v-if="isMobile" class="p-relative">
      <!--거래 list -->
      <div>
        <!-- name-->
        <!--userPage 일때-->
        <v-layout  mt-4 align-center fill-height>
          <v-flex xs2>
            <h5 v-if="user.Coin=='BTC'"class="sprite-img ic-btc-lg"> </h5>
            <h5 v-else-if="user.Coin=='ETH'"class="sprite-img ic-eth-lg"> </h5>
            <h5 v-else-if="user.Coin=='USDT'"class="sprite-img ic-usdt-lg"> </h5>
            <h5 v-else class="sprite-img ic-allb-lg"> </h5>
          </v-flex>
          <v-flex xs10 text-xs-left>
            <span class="bold">{{user.Coin}}</span>
          </v-flex>
        </v-layout>


        <!-- Volume -->
        <v-layout>
          <v-flex xs2></v-flex>
          <v-flex xs4 text-xs-left color-darkgray>Volume :</v-flex>
          <v-flex xs6 text-xs-right> {{user.volumeTotal}} {{token}} </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout>
          <v-flex xs2></v-flex>
          <v-flex xs4 text-xs-left color-darkgray>Limits :</v-flex>
          <v-flex xs6 text-xs-right> {{user.limitMax}} {{currency}} </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout mb-3>
          <v-flex xs2></v-flex>
          <v-flex xs4 text-xs-left color-darkgray>Price :</v-flex>
          <v-flex xs6 text-xs-right bold color-orange-price> {{user.price}} {{currency}} </v-flex>
        </v-layout>
        <!-- Payment Methods -->
        <v-layout align-center justify-space-between row fill-height mb-4>
          <v-flex xs2></v-flex>
          <v-flex xs6 text-xs-left>
            <a class="tooltip" v-if="user.bank_account.length >0">
              <div class="mr-2 sprite-img ic-bank f-left"></div>
              <span class="BankTooltip tooltip-content">Bank account</span>
            </a>
            <a class="tooltip" v-if="user.alipay_id.length >0">
              <div class="mr-2 sprite-img ic-alipay f-left"></div>
              <span class="tooltip-content">Alipay</span>
            </a>
            <a class="tooltip" v-if="user.wechat_id.length >0">
              <div class="mr-2 sprite-img ic-wechatpay f-left"></div>
              <span class="tooltip-content">Wechatpay</span>
            </a>
          </v-flex>
          <!--거래 버튼-->
          <v-flex xs4 text-xs-right>
            <button class="btn-rounded-blue medium" @click="drawer = !drawer">
              {{tradeType}} {{token}}</button>
          </v-flex>
        </v-layout>
      </div>

      <!--버튼 클릭시 거래를 위한 mobile modal-->
      <div v-if="drawer" class="mobileModal">
        <!-- name-->
        <v-layout mt-4 align-center fill-height>
          <v-flex xs2 pl-2 >
            <h5 v-if="user.Coin=='BTC'"class="sprite-img ic-btc-lg"> </h5>
            <h5 v-else-if="user.Coin=='ETH'"class="sprite-img ic-eth-lg"> </h5>
            <h5 v-else-if="user.Coin=='USDT'"class="sprite-img ic-usdt-lg"> </h5>
            <h5 v-else class="sprite-img ic-allb-lg"> </h5>
          </v-flex>
          <v-flex xs8 text-xs-left>
            <span class="bold">{{user.Coin}}</span>
          </v-flex>
          <v-flex xs2 text-xs-center>
            <button><i class="material-icons" @click="drawer = false">close</i></button>
          </v-flex>
        </v-layout>

        <!-- Volume -->
        <v-layout medium>
          <v-flex xs3  offset-xs2 text-xs-left>
            <h5 class="color-darkgray">
              {{$str("Available")}} :
            </h5>
          </v-flex>
          <v-flex xs5 offset-xs1 text-xs-right>
            <h5>{{user.volumeTotal}} {{token}}</h5>
          </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout  medium>
          <v-flex xs3  offset-xs2 text-xs-left>
            <h5 class=" color-darkgray">
              {{$str("limits")}} :
            </h5>
          </v-flex>
          <v-flex xs5 offset-xs1 text-xs-right>
            <h5>{{user.limitMax}} {{currency}}</h5>
          </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout medium>
          <v-flex xs3  offset-xs2 text-xs-left>
            <h5 class="color-darkgray">
              {{$str("price")}} :
            </h5>
          </v-flex>
          <v-flex xs5 offset-xs1 text-xs-right>
            <h5 class=" bold color-orange-price">{{user.price}} {{currency}}</h5>
          </v-flex>
        </v-layout>
        <!-- payment methods -->
        <v-layout>
          <v-flex xs3  offset-xs2 text-xs-left>
            <h5 class="medium color-darkgray">
              {{$str("payment")}}:
            </h5>
          </v-flex>
          <v-flex xs5 offset-xs1 text-xs-right>
            <div v-if="user.bank_account.length >0"
                 class="ml-2 sprite-img ic-bank f-right"></div>
            <div v-if="user.alipay_id.length >0"
                 class="ml-2 sprite-img ic-alipay f-right"></div>
            <div v-if="user.wechat_id.length >0"
                 class="ml-2 sprite-img ic-wechatpay f-right"></div>
          </v-flex>
        </v-layout>
        <v-layout mt-4>
          <v-flex xs9 offset-xs2 text-xs-left >
            <!--to input-->
            <div class="p-relative">
              <input type="text" class="input textRightPlaceholder" name="toValue" v-model="toValue"
                     :placeholder="currency" @blur="onChecktoValue"
                     v-bind:class="{'warning-border' : warning_toValue}">
              <div class="warning-text-wrapper">
                <p class="d-none" v-bind:class="{'warning-text' : warning_toValue}">{{verify_warning_toValue}}</p>
              </div>
            </div>
            <!--from input-->
            <div class="mt-3 p-relative">
              <input type="text" class="input textRightPlaceholder" name="fromValue" v-model="fromValue"
                     :placeholder="token" @blur="onCheckfromValue"
                     v-bind:class="{'warning-border' : warning_fromValue}">
              <div class="warning-text-wrapper">
                <p class="d-none" v-bind:class="{'warning-text' : warning_fromValue}">
                  {{verify_warning_fromValue}}</p>
              </div>
            </div>
            <!--trade PW. sell 일때만 활성화-->
            <div class="mt-3 p-relative" v-if="tradeType =='SELL'">
              <input type="text" class="input textRightPlaceholder" name="tradePW" v-model="tradePW"
                     :placeholder="pwPlaceholder" @blur="onChecktradePassword"
                     v-bind:class="{'warning-border' : warning_tradePassword}">
              <div class="warning-text-wrapper">
                <span class="d-none" v-bind:class="{'warning-text' : warning_tradePassword}">{{verify_warning_tradePassword}}</span>
              </div>
            </div>
          </v-flex>
        </v-layout>
        <v-layout mt-4a>
          <v-flex xs9 offset-xs2 text-xs-left>
            <button class="btn-blue" @click="goTrade">{{$str("confirm")}}</button>
          </v-flex>
        </v-layout>
        <v-layout mt-4>
          <v-flex xs9 offset-xs2 text-xs-left>
            <h5 class="color-darkgray medium">{{$str("Payment_window_is_15minutes")}}</h5>
          </v-flex>
        </v-layout>
        <!--user Memo가 있을시-->
        <v-layout v-if="user.memo !== '' " mt-4>
          <v-flex xs9 offset-xs2 text-xs-left>
            <h6 class="color-darkgray medium">
              {{$str("userMemo")}}： <br>
              {{user.memo}}
            </h6>
          </v-flex>
        </v-layout>
      </div>

    </div>


    <!--Web 일때-->
    <div v-else class="p-relative">
      <v-layout v-if="!drawer" class="userWebList" align-center justify-center fill-height>
        <!--ㅡmerchant-->
        <v-flex  md3 text-md-left>
          <v-layout justify-start align-center>
            <!--coin 종류에 따라 하나만 이미지 보여줌-->
            <span v-if="user.Coin=='BTC'"class="sprite-img ic-btc-lg"> </span>
            <span v-else-if="user.Coin=='ETH'"class="sprite-img ic-eth-lg"> </span>
            <span v-else-if="user.Coin=='USDT'"class="sprite-img ic-usdt-lg"> </span>
            <span v-else class="sprite-img ic-allb-lg"> </span>
            <span class="ml-3 bold">{{user.Coin}}</span>
          </v-layout>
        </v-flex>
        <!--available-->
        <v-flex md2 text-md-left >{{user.volumeTotal}} {{token}} </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >{{user.limitMax}} {{currency}} </v-flex>
        <!--price-->
        <v-flex md2 text-md-left color-orange-price bold>{{user.price}} {{token}} </v-flex>
        <!-- payment method-->
        <v-flex md3 text-md-right>
          <v-layout align-center >
            <!--payment method-->
            <a class="tooltip" v-if="user.bank_account.length >0">
              <div class="sprite-img ic-bank mr-2"></div>
              <span class="BankTooltip tooltip-content">{{$str("bankAccountText")}}</span>
            </a>
            <a class="tooltip" v-if="user.alipay_id.length >0">
              <div class="sprite-img ic-alipay mr-2"></div>
              <span class="tooltip-content">{{$str("alipayText")}}</span>
            </a>
            <a class="tooltip" v-if="user.wechat_id.length >0">
              <div class="sprite-img ic-wechatpay mr-2"></div>
              <span class="tooltip-content">{{$str("wechatPayText")}}</span>
            </a>
            <!--img와 button을 양쪽에 정렬시키기 위함.-->
            <v-spacer></v-spacer>
            <!-- buy 혹은 sell button -->
            <button class="btn-rounded-blue medium" @click="drawer = !drawer">
              <h5>{{tradeType}} {{token}}</h5>
            </button>
          </v-layout>
        </v-flex>
      </v-layout>

      <!--Buy 를 위한 modal-->
      <div v-else class="tradeWebModal">
        <v-layout row wrap>
          <v-flex md3 text-md-left >
            <v-layout pl-4 >
              <span v-if="user.Coin=='BTC'"class="sprite-img ic-btc-lg"> </span>
              <span v-else-if="user.Coin=='ETH'"class="sprite-img ic-eth-lg"> </span>
              <span v-else-if="user.Coin=='USDT'"class="sprite-img ic-usdt-lg"> </span>
              <span v-else class="sprite-img ic-allb-lg"> </span>
              <span>
                <span class="ml-3 bold">{{user.Coin}}</span>
                <div class="ml-3 color-darkgray medium">{{$str("Available")}}  {{user.volumeTotal}} {{token}}</div>
              </span>
            </v-layout>
          </v-flex>
          <!--둘째줄-->
          <v-flex md2 text-md-left>
            <div class="bold color-orange-price">
              {{user.volumeTotal}} {{currency}}
            </div>
            <div class="medium">
              {{user.volumeTotal}} {{currency}}
            </div>
          </v-flex>

          <v-flex md4>
            <!-- 수평: 양쪽으로 벌리고, 수직: 가운데정렬-->
            <v-layout align-center justify-space-between row fill-height>
              <!--to input-->
              <div class="p-relative">
                <input type="number" class="input userInput textRightPlaceholder"
                       name="toValue" v-model="toValue" :placeholder="currency"
                       @blur="onChecktoValue"
                       v-bind:class="{'warning-border' : warning_toValue}"
                >
                <div class="warning-text-wrapper">
                  <p class="d-none" v-bind:class="{'warning-text' : warning_toValue}">{{verify_warning_toValue}}</p>
                </div>
              </div>
              <!--가운데 아이콘-->
              <i class="material-icons color-darkgray swapIcon">swap_horiz</i>
              <!--from input-->
              <div class="p-relative">
                <input type="number" class="input userInput textRightPlaceholder"
                       name="fromValue" v-model="fromValue"
                       :placeholder="token"
                       @blur="onCheckfromValue"
                       v-bind:class="{'warning-border' : warning_fromValue}"
                >
                <div class="warning-text-wrapper">
                  <p class="d-none" v-bind:class="{'warning-text' : warning_fromValue}">
                    {{verify_warning_fromValue}}</p>
                </div>
              </div>
            </v-layout>
          </v-flex>
          <v-flex md3 text-md-left>
            <!--confirm 버튼-->
            <button class="btn-rounded-blue btn-blue-hover mr-3"
                    @click="goTrade">{{$str("confirm")}}
            </button>
            <!--cancel 버튼-->
            <button class="btn-rounded-white text-white-hover"
                    @click="drawer = !drawer">{{$str("cancel")}}
            </button>
          </v-flex>
        </v-layout>
        <v-layout row wrap tradeWebModal-secondRow>
          <v-flex md6 text-md-left>
            <div class="margin-left-74">
              <!--Bank account-->
              <div v-if="user.bank_account.length >0">
                <div class="sprite-img ic-bank mr-2 f-left"></div>
                <span class="mr-3 f-left">{{$str("bankAccountText")}}</span>
              </div>
              <!--Alipay-->
              <div v-if="user.alipay_id.length >0">
                <div class="sprite-img ic-alipay mr-2 f-left"></div>
                <span class="mr-3 f-left">{{$str("alipayText")}}</span>
              </div>
              <!--WechatPay-->
              <div v-if="user.wechat_id.length >0">
                <div class="sprite-img ic-wechatpay mr-2 f-left"></div>
                <span class="mr-3 f-left">{{$str("wechatPayText")}}</span>
              </div>
            </div>
          </v-flex>
          <v-flex md3 text-md-right>
            <div v-if="tradeType =='SELL'">
              <div class="p-relative">
                <input type="number" class="input userInput textLeftPlaceholder"
                       name="tradePW" v-model="tradePW" :placeholder="pwPlaceholder"
                       @blur="onChecktradePassword"
                       v-bind:class="{'warning-border' : warning_tradePassword}"
                >
                <div class="warning-text-wrapper">
                  <span class="d-none" v-bind:class="{'warning-text' : warning_tradePassword}">{{verify_warning_tradePassword}}</span>
                </div>
              </div>
            </div>
          </v-flex>
          <v-flex md2 text-md-right>
            <h6 class="color-darkgray">{{$str("Payment_window_is_15minutes")}}</h6>
          </v-flex>
        </v-layout>



        <!-- 판매자가 남긴 요구 메모가 있을시-->
        <v-layout >
          <v-flex md12 mt-5 mb-5 v-if="user.memo !== '' " margin-left-74 mr-4 text-md-left>
            <h6 class="color-darkgray">
              {{$str("userMemo")}}： <br>
              {{user.memo}}
            </h6>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../../vuex/MainRepository";
    import Avatar from '@/components/Avatar.vue';
    export default {
        name: "UserTradeItem",
        data: () => ({
            drawer: false,
            pwPlaceholder: 'Trade Password',
            toValue : '',
            fromValue : '',
            tradePassword : '',
            token : 'BTC',      //현재 거래하고자 하는 coin
            currency : 'CNY',   //현재 사용하고자 하는 화폐단위
            tradePW : '',       // Trade Password
            rankSrc : '',
            verify_warning_toValue: "",
            verify_warning_fromValue: "",
            verify_warning_tradePassword: "",
            warning_toValue: false,
            warning_fromValue: false,
            warning_tradePassword: false,

        }),
        components:{Avatar},
        props : {
            user: {},
            tradeType : {         //살건지 팔건지 여부.
                type: String,
                default: 'SELL',
            },

        },
        methods : {
            onChecktoValue(){
                if (this.toValue === "") {
                    this.verify_warning_toValue = Vue.prototype.$str("Please_enter_a_vaild_number");
                    this.warning_toValue = true;
                    return false;
                }
                this.warning_toValue = false;
                return true;
            },
            onCheckfromValue(){
                if (this.fromValue === "") {
                    this.verify_warning_fromValue = Vue.prototype.$str("Please_enter_a_vaild_number");
                    this.warning_fromValue = true;
                    return false;
                }
                this.warning_fromValue = false;
                return true;
            },
            onChecktradePassword(){
                if (this.tradePW === "") {
                    this.verify_warning_tradePassword = Vue.prototype.$str("warning_trade_password");
                    this.warning_tradePassword = true;
                    return false;
                }
                this.warning_tradePassword = false;
                return true;
            },
            goTrade(){
                if (this.onChecktoValue() && this.onCheckfromValue()) {
                    switch (this.tradeType) {
                        case 'BUY':
                            this.$router.push("/buy");
                            break;

                        case 'SELL':
                            //sell 모드 일때는 trade password를 추가로 검증해야함.
                            if(this.onChecktradePassword()){
                                this.$router.push("/sell");
                                break;
                            }
                    }
                }
            },

        },
        mounted(){
            switch (this.user.rank) {
                case 1:
                    this.rankSrc = require('../../../../../../assets/img/rank_crown.png');
                    break;
                case 2:
                    this.rankSrc = require('../../../../../../assets/img/rank_diamond.png');
                    break;
                default:
                    this.rankSrc = '';
            }
        },
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
        },

    }
</script>

<style scoped>
  .userWebList{
    height: 84px;
    position: relative;
    z-index: 0;
  }
  .userInput{
    border: solid 1px #b2b2b2;
    max-width: 153px;
  }
  .mobileInput{
    height: 36px;

  }
  .textRightPlaceholder::-webkit-input-placeholder{
    text-align: right;


  }
  .textLeftPlaceholder::-webkit-input-placeholder{
    text-align: left;

  }
  .userRank{
    max-width: 16px;
    height: 18px;
    margin-left: 16px;
  }

  .BankTooltip{
    width: 101px;
  }
  .tradeWebModal{
    min-height: 171px;
    background-color: #ffffff;
    width: 100%;
    border-radius: 2px;
    padding-top: 24px;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    display: block;
  }


  .tradeWebModal-secondRow{
    margin-top: 36px;
  }
  .margin-left-74{
    margin-left: 74px;
  }
  .mobileModal{
    border-radius: 2px;
    background-color: #ffffff;
    width: 100%;
    position: absolute;
    display: block;
    z-index: 1;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    padding-top: 24px;
    padding-bottom: 24px;
  }
</style>