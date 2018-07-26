<template>
  <div>

    <!-- mobile 일때-->
    <div v-if="isMobile" class="p-relative">
      <!--거래 list -->
      <div>
        <!-- name-->
        <v-layout mt-4>
          <v-flex xs2 text-xs-left>
            <avatar
              :name = user.email[0]
              :isLogin = user.isLogin
              :color = user.color>
            </avatar>
          </v-flex>

          <v-flex xs10 text-xs-left color-blue>
            {{user.email}} ( {{user.volumeTotal}} | 99%)
            <!-- user의 rank 이미지-->
            <img :src="rankSrc" class="ml-2">
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
              <a class="tooltip">
                <img class="mr-2" src="../../../../../assets/img/method_bankaccount.png">
                <span class="BankTooltip tooltip-content">Bank account</span>
              </a>
              <a class="tooltip" >
                <img class="mr-2" src="../../../../../assets/img/method_alipay.png">
                <span class="tooltip-content">Alipay</span>
              </a>
              <a class="tooltip" >
                <img class="mr-2" src="../../../../../assets/img/method_wechatpay.png">
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
        <v-layout>
          <v-flex xs2 pl-2>
            <avatar
                  :name = user.email[0]
                  :isLogin = user.isLogin
                  :color = user.color>
          </avatar>
          </v-flex>
          <v-flex xs8 text-xs-left>
            <h5 class="medium color-blue">
            {{user.email}} ( {{user.volumeTotal}} | 99%)
            </h5>
            <img :src="rankSrc" class="userRank">
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
            <img src="../../../../../assets/img/method_bankaccount.png">
            <img src="../../../../../assets/img/method_alipay.png" class="ml-2">
            <img src="../../../../../assets/img/method_wechatpay.png" class="ml-2">
          </v-flex>
        </v-layout>
        <v-layout mt-4>
          <v-flex xs9 offset-xs2 text-xs-left >
            <div >
              <input type="text" class="input textRightPlaceholder" name="toValue" v-model="toValue"
                     :placeholder="currency">
            </div>
            <div class="mt-3">
              <input type="text" class="input textRightPlaceholder" name="toValue" v-model="fromValue"
                     :placeholder="token">
            </div>
            <div class="mt-3" v-if="tradeType =='SELL'">
              <input type="text" class="input textLeftPlaceholder" name="toValue" v-model="tradePassword"
                     :placeholder="pwPlaceholder">
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
      <v-layout class="userWebList" align-center justify-center fill-height>
        <!--ㅡmerchant-->
        <v-flex  md3 text-md-left>
          <v-layout align-center>
              <avatar
              :name = user.email[0]
              :isLogin = user.isLogin
              :color = user.color>
            </avatar>
            <span class="ml-3 color-blue">
              {{user.email}} ( {{user.volumeTotal}} | {{user.tradeRate}}%)
            </span>
            <!--판매자 rank-->
            <img :src="rankSrc" class="userRank">
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
            <a class="tooltip">
              <img class="mr-2" src="../../../../../assets/img/method_bankaccount.png">
              <span class="BankTooltip tooltip-content">{{$str("bankAccountText")}}</span>
            </a>
            <a class="tooltip">
              <img class="mr-2" src="../../../../../assets/img/method_alipay.png">
              <span class="tooltip-content">{{$str("alipayText")}}</span>
            </a>
            <a class="tooltip">
              <img src="../../../../../assets/img/method_wechatpay.png">
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
      <div v-if="drawer" class="tradeWebModal">
        <v-layout row wrap>
          <v-flex md3 text-md-left >
            <v-layout pl-4>
              <!--avatar-->
              <avatar
                        :name = user.email[0]
                        :isLogin = user.isLogin
                        :color = user.color>
              </avatar>

              <!-- merchant 정보-->
              <span>
                <span class="mr-2 ml-3 color-blue medium">
                  {{user.email}} ( {{user.volumeTotal}} | {{user.tradeRate}}%)
                </span>
                <img :src="rankSrc" class="userRank">
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
              <img class="mr-2"src="../../../../../assets/img/method_bankaccount.png">
              <span class="mr-3">{{$str("bankAccountText")}}</span>
              <!--Alipay-->
              <img class="mr-2" src="../../../../../assets/img/method_alipay.png">
              <span class="mr-3">{{$str("alipayText")}}</span>
              <!--WechatPay-->
              <img class="mr-2"src="../../../../../assets/img/method_wechatpay.png">
              <span class="mr-3">{{$str("wechatPayText")}}</span>
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
    import MainRepository from "../../../../../vuex/MainRepository";
    import Avatar from '@/components/Avatar.vue';
    export default {
        name: "TradeListItem",
        data: () => ({
            drawer: false,
            pwPlaceholder: 'Trade Password',
            toValue : '',
            fromValue : '',
            tradePassword : '',
            token : 'BTC',      //현재 거래하고자 하는 coin
            currency : 'CNY',   //현재 사용하고자 하는 화폐단위
            tradeType : 'SELL',  //살건지 팔건지 여부.
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
                                console.log();
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
                  this.rankSrc = require('../../../../../assets/img/rank_crown.png');
                  break;
              case 2:
                  this.rankSrc = require('../../../../../assets/img/rank_diamond.png');
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
    position: absolute;
    border-radius: 2px;
    padding-top: 24px;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    display: block;
    z-index: 1;
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